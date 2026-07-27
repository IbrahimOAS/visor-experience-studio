import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckoutSuccess = () => (
  <main className="flex min-h-screen items-center justify-center bg-background px-5">
    <section className="glass-card-strong max-w-lg rounded-2xl p-8 text-center">
      <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-primary" />
      <h1 className="text-3xl font-bold">Subscription confirmed</h1>
      <p className="mt-3 text-muted-foreground">
        Stripe is syncing your subscription to VISOR. Your account page will show the latest status.
      </p>
      <Button asChild className="mt-8">
        <Link to="/account">Go to account</Link>
      </Button>
    </section>
  </main>
);

export default CheckoutSuccess;
