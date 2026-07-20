import { Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";

const CheckoutCancel = () => (
  <>
    <SeoHead title="Checkout cancelled — VISOR" description="Your checkout was cancelled." canonical="https://visorfitness.com/checkout/cancel" noindex />
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <div className="max-w-lg text-center glass-card-strong rounded-2xl p-10">
        <h1 className="text-3xl font-bold mb-3">Checkout cancelled</h1>
        <p className="text-muted-foreground mb-6">No charge was made. You can head back and try again whenever you're ready.</p>
        <Link to="/" className="text-primary hover:underline">Back to home →</Link>
      </div>
    </main>
  </>
);

export default CheckoutCancel;
