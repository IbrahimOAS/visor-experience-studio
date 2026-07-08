import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Building2, Phone, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const TOPIC_OPTIONS = [
  "general",
  "billing",
  "technical",
  "account",
  "feedback",
  "other",
] as const;

export const SupportContactForm = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const schema = z.object({
    fullName: z
      .string()
      .trim()
      .min(1, { message: t("pages.support.form.validation.required") })
      .max(100, { message: t("pages.support.form.validation.maxLength", { count: 100 }) }),
    email: z
      .string()
      .trim()
      .min(1, { message: t("pages.support.form.validation.required") })
      .email({ message: t("pages.support.form.validation.email") })
      .max(255, { message: t("pages.support.form.validation.maxLength", { count: 255 }) }),
    company: z
      .string()
      .trim()
      .max(100, { message: t("pages.support.form.validation.maxLength", { count: 100 }) })
      .optional(),
    phone: z
      .string()
      .trim()
      .max(50, { message: t("pages.support.form.validation.maxLength", { count: 50 }) })
      .optional(),
    topic: z.enum(TOPIC_OPTIONS, {
      errorMap: () => ({ message: t("pages.support.form.validation.required") }),
    }),
    message: z
      .string()
      .trim()
      .min(1, { message: t("pages.support.form.validation.required") })
      .max(1000, { message: t("pages.support.form.validation.maxLength", { count: 1000 }) }),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phone: "",
      topic: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");

    const { error } = await (supabase as any)
      .from("support_submissions")
      .insert([
        {
          full_name: values.fullName,
          email: values.email,
          company: values.company || null,
          phone: values.phone || null,
          topic: values.topic,
          message: values.message,
        },
      ]);

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  };

  const inputWrap = (
    icon: React.ReactNode,
    field: React.ReactNode,
    id: string,
    error?: boolean
  ) => (
    <div className="relative">
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      >
        {icon}
      </div>
      {field}
    </div>
  );

  return (
    <section className="glass-card-strong rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-2">
        {t("pages.support.form.title")}
      </h2>
      <p className="text-muted-foreground mb-8">{t("pages.support.form.subtitle")}</p>

      {status === "success" && (
        <div
          className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-emerald-100">{t("pages.support.form.success.title")}</p>
            <p className="text-sm text-emerald-200/80">{t("pages.support.form.success.description")}</p>
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
            <p className="font-semibold text-destructive-foreground">{t("pages.support.form.error.title")}</p>
            <p className="text-sm text-destructive-foreground/80">{t("pages.support.form.error.description")}</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("pages.support.form.fullName.label")}</FormLabel>
                  <FormControl>
                    {inputWrap(
                      <User size={18} />,
                      <Input
                        {...field}
                        placeholder={t("pages.support.form.fullName.placeholder")}
                        autoComplete="name"
                        className="pl-10 h-12 rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                      />,
                      field.name,
                      !!form.formState.errors.fullName
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("pages.support.form.email.label")}</FormLabel>
                  <FormControl>
                    {inputWrap(
                      <Mail size={18} />,
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("pages.support.form.email.placeholder")}
                        autoComplete="email"
                        className="pl-10 h-12 rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                      />,
                      field.name
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("pages.support.form.company.label")}</FormLabel>
                  <FormControl>
                    {inputWrap(
                      <Building2 size={18} />,
                      <Input
                        {...field}
                        placeholder={t("pages.support.form.company.placeholder")}
                        autoComplete="organization"
                        className="pl-10 h-12 rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                      />,
                      field.name
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("pages.support.form.phone.label")}</FormLabel>
                  <FormControl>
                    {inputWrap(
                      <Phone size={18} />,
                      <Input
                        {...field}
                        type="tel"
                        placeholder={t("pages.support.form.phone.placeholder")}
                        autoComplete="tel"
                        className="pl-10 h-12 rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                      />,
                      field.name
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{t("pages.support.form.topic.label")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-background/60 border-white/10 focus:ring-primary [&>span]:text-muted-foreground/70 data-[state=open]:ring-2 data-[state=open]:ring-primary">
                      <SelectValue placeholder={t("pages.support.form.topic.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl border-white/10 bg-popover">
                    {TOPIC_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {t(`pages.support.form.topic.options.${option}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{t("pages.support.form.message.label")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute left-3 top-3.5 text-muted-foreground pointer-events-none"
                      aria-hidden="true"
                    >
                      <MessageSquare size={18} />
                    </div>
                    <Textarea
                      {...field}
                      placeholder={t("pages.support.form.message.placeholder")}
                      rows={5}
                      className="pl-10 rounded-xl bg-background/60 border-white/10 placeholder:text-muted-foreground/70 focus-visible:ring-primary resize-y min-h-[140px]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)] disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                {t("pages.support.form.submitting")}
              </>
            ) : (
              t("pages.support.form.submit")
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};
