import { Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";

const CheckoutSuccess = () => (
  <>
    <SeoHead title="Order received — VISOR" description="Your VISOR order was received." canonical="https://visorfitness.com/checkout/success" noindex />
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <div className="max-w-lg text-center glass-card-strong rounded-2xl p-10">
        <h1 className="text-3xl font-bold mb-3">Thanks — we received your request</h1>
        <p className="text-muted-foreground mb-6">
          Payment confirmation is verified securely on our servers, not from this page.
          Your account will update automatically once confirmation is complete.
        </p>
        <Link to="/account" className="text-primary hover:underline">Go to your account →</Link>
      </div>
    </main>
  </>
);

export default CheckoutSuccess;
