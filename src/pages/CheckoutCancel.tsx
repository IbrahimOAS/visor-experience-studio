import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CheckoutCancel = () => (
  <main className="flex min-h-screen items-center justify-center bg-background px-5">
    <section className="glass-card-strong max-w-lg rounded-2xl p-8 text-center">
      <h1 className="text-3xl font-bold">Checkout canceled</h1>
      <p className="mt-3 text-muted-foreground">No charge was made. You can choose a plan whenever you are ready.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link to="/pricing">View plans</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Home</Link>
        </Button>
      </div>
    </section>
  </main>
);

export default CheckoutCancel;
