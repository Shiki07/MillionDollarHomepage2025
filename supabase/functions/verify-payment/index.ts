import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    // Use service role to bypass RLS for database writes
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    logStep("Verifying session", { sessionId });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      throw new Error("Session not found");
    }

    logStep("Stripe session retrieved", { 
      sessionId, 
      paymentStatus: session.payment_status,
      status: session.status 
    });

    // Check if payment was successful
    const isPaymentSuccessful = session.payment_status === "paid" && session.status === "complete";
    
    // Update the purchase record
    const { data: updatedPurchase, error: updateError } = await supabase
      .from("pixel_purchases")
      .update({
        status: isPaymentSuccessful ? "paid" : "failed",
        updated_at: new Date().toISOString()
      })
      .eq("stripe_session_id", sessionId)
      .select()
      .single();

    if (updateError) {
      logStep("Database update error", updateError);
      throw new Error(`Failed to update purchase: ${updateError.message}`);
    }

    logStep("Purchase updated in database", { 
      purchaseId: updatedPurchase.id, 
      status: updatedPurchase.status 
    });

    return new Response(JSON.stringify({ 
      success: isPaymentSuccessful,
      purchase: updatedPurchase,
      sessionDetails: {
        payment_status: session.payment_status,
        status: session.status
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});