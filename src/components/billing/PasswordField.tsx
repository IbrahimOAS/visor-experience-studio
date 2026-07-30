import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  minLength?: number;
  autoComplete?: string;
}

const PasswordField = ({ id, value, onChange, minLength, autoComplete }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        minLength={minLength}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="pr-11"
        required
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default PasswordField;
