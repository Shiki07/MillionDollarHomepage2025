import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
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
    logStep("Stripe key verified");

    // Use service role to bypass RLS for database writes
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { email, imageUrl, url, alt, pixels } = await req.json();
    
    if (!email || !imageUrl || !url || !alt || !pixels || pixels.length === 0) {
      throw new Error("Missing required fields: email, imageUrl, url, alt, pixels");
    }

    logStep("Request data received", { email, pixelCount: pixels.length });

    // Calculate amount (pixels are $1 each, convert to cents)
    const amount = pixels.length * 100; // $1 per pixel in cents
    
    if (amount < 1000) { // Minimum $10
      throw new Error("Minimum purchase amount is $10 (100 pixels)");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `Million Dollar Homepage - ${pixels.length} Pixels`,
              description: `Purchase ${pixels.length} pixels for your advertisement`
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        email,
        pixelCount: pixels.length.toString()
      }
    });

    logStep("Stripe session created", { sessionId: session.id });

    // Store purchase record in database
    const { data: purchase, error: insertError } = await supabase
      .from("pixel_purchases")
      .insert({
        stripe_session_id: session.id,
        email,
        image_url: imageUrl,
        website_url: url,
        alt_text: alt,
        pixels: pixels,
        amount: amount,
        status: "pending"
      })
      .select()
      .single();

    if (insertError) {
      logStep("Database insert error", insertError);
      throw new Error(`Failed to store purchase: ${insertError.message}`);
    }

    logStep("Purchase stored in database", { purchaseId: purchase.id });

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id,
      purchaseId: purchase.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});