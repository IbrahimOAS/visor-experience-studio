import { useLocation, useNavigate } from "react-router-dom";
import { RobotAuthForm } from "@/components/RobotAuthForm";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = new URLSearchParams(location.search).get("redirect") ?? "/account";

  return (
    <div className="min-h-screen bg-[#0d0f17] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <RobotAuthForm
          defaultMode="signin"
          redirectTo={redirectTo}
          onAuthenticated={() => navigate(redirectTo)}
        />
      </div>
    </div>
  );
};

export default Login;
