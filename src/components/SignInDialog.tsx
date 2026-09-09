import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RobotAuthForm } from "@/components/RobotAuthForm";

type SignInDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUp?: () => void;
  redirectTo?: string;
  onAuthenticated?: () => void;
};

export function SignInDialog({ open, onOpenChange, redirectTo, onAuthenticated }: SignInDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[200] w-[calc(100vw-2rem)] max-w-[420px] max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-[#2a2f38] bg-[#0d0f17] p-4 text-white shadow-[0_24px_64px_rgba(0,0,0,0.8)]">
        <DialogTitle className="sr-only">Sign in to your account</DialogTitle>
        <DialogDescription className="sr-only">Sign in with your VISOR account</DialogDescription>
        <RobotAuthForm
          defaultMode="signin"
          redirectTo={redirectTo}
          onAuthenticated={() => {
            onOpenChange(false);
            onAuthenticated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
