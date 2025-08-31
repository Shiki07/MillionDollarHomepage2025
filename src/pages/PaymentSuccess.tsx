import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PurchaseDetails {
  id: string;
  email: string;
  image_url: string;
  website_url: string;
  alt_text: string;
  pixels: any[];
  amount: number;
  status: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerifying, setIsVerifying] = useState(true);
  const [purchase, setPurchase] = useState<PurchaseDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError("No session ID provided");
        setIsVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });

        if (error) throw error;

        if (data?.success && data?.purchase) {
          setPurchase(data.purchase);
        } else {
          setError("Payment verification failed");
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || "Failed to verify payment");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold">Verifying your payment...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Payment Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>{error}</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <p className="text-muted-foreground">
            Your pixels have been purchased and are now live on the Million Dollar Homepage!
          </p>
        </CardHeader>
        
        {purchase && (
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Purchase Details</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Email:</strong> {purchase.email}</div>
                <div><strong>Pixels purchased:</strong> {purchase.pixels.length}</div>
                <div><strong>Total paid:</strong> ${(purchase.amount / 100).toFixed(2)}</div>
                <div><strong>Website:</strong> 
                  <a 
                    href={purchase.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-1 text-primary hover:underline inline-flex items-center"
                  >
                    {purchase.website_url}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <div><strong>Alt text:</strong> {purchase.alt_text}</div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Your Advertisement Image</h3>
              <img 
                src={purchase.image_url} 
                alt={purchase.alt_text}
                className="max-w-full h-auto max-h-32 object-contain bg-white border rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View Your Pixels
                </Link>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;