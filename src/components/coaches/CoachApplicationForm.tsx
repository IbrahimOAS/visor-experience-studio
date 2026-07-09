import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(50).optional(),
  country: z.string().trim().min(1, "Required").max(80),
  city: z.string().trim().min(1, "Required").max(80),
  specialization: z.string().trim().min(1, "Required").max(120),
  yearsExperience: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || (/^\d+$/.test(v) && Number(v) <= 80), "Enter a valid number"),
  certification: z.string().trim().max(300).optional(),
  website: z.string().trim().max(300).optional(),
  message: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "h-12 rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary";

export const CoachApplicationForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      specialization: "",
      yearsExperience: "",
      certification: "",
      website: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    const { error } = await supabase.from("coach_applications").insert([
      {
        full_name: values.fullName,
        email: values.email,
        phone: values.phone || null,
        country: values.country,
        city: values.city,
        specialization: values.specialization,
        years_experience: values.yearsExperience ? Number(values.yearsExperience) : null,
        certification: values.certification || null,
        website: values.website || null,
        message: values.message || null,
      },
    ]);
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    form.reset();
  };

  const text = <T extends keyof FormValues>(
    name: T,
    label: string,
    placeholder: string,
    opts: { type?: string; autoComplete?: string } = {},
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={opts.type ?? "text"}
              autoComplete={opts.autoComplete}
              placeholder={placeholder}
              className={fieldClass}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <section id="apply" className="glass-card-strong rounded-3xl p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-2">
        Coach Application
      </h2>
      <p className="text-muted-foreground mb-8 text-sm">
        Submit your details for manual review. Verified coaches unlock access to VISOR Elite members.
      </p>

      {status === "success" && (
        <div
          className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-emerald-100">Application received</p>
            <p className="text-sm text-emerald-200/80">
              Our team will review your application and reach out via email.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          className="mb-6 rounded-xl border border-destructive/20 bg-destructive/10 p-4 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm opacity-80">Please try again or email coaches@visorfitness.com.</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            {text("fullName", "Full name", "Jane Doe", { autoComplete: "name" })}
            {text("email", "Email", "you@example.com", { type: "email", autoComplete: "email" })}
            {text("phone", "Phone", "+1 555 000 0000", { type: "tel", autoComplete: "tel" })}
            {text("country", "Country", "United States", { autoComplete: "country-name" })}
            {text("city", "City", "Los Angeles", { autoComplete: "address-level2" })}
            {text("specialization", "Specialization", "Strength & Hypertrophy")}
            {text("yearsExperience", "Years of experience", "8")}
            {text("website", "Website or social profile", "https://instagram.com/…")}
          </div>

          <FormField
            control={form.control}
            name="certification"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  Certification details
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="NASM-CPT, CSCS, DPT, etc."
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  Short message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Tell us about your coaching style and clients."
                    className="rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary resize-y min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)] disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              "Apply to Join"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};
