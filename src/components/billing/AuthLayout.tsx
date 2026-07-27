import { Link } from "react-router-dom";
import visorLogo from "@/assets/visor-logo.png";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => (
  <main className="min-h-screen bg-background px-5 py-8">
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
      <Link to="/" className="mb-8 flex items-center gap-3">
        <img src={visorLogo} alt="VISOR" className="h-11 w-11 rounded-full" />
        <span className="font-['Space_Grotesk'] text-xl font-bold">VISOR</span>
      </Link>
      <div className="glass-card-strong rounded-2xl p-6 sm:p-8">
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
        <p className="mb-8 text-sm leading-6 text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </div>
  </main>
);

export default AuthLayout;
