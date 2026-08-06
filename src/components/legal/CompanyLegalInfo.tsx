export const COMPANY = {
  legalName: "Cedra Kaddour FZ-LLC",
  legalType: "Free Zone Limited Liability Company",
  registrationNo: "0000004084353",
  licenceNo: "7017101",
  jurisdiction: "Ras Al Khaimah Economic Zone, United Arab Emirates",
  address:
    "FDRK7137, Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
  emails: {
    support: "support@visorfitness.com",
    privacy: "privacy@visorfitness.com",
    developer: "developer@visorfitness.com",
    legal: "legal@visorfitness.com",
  },
} as const;

export const OPERATOR_STATEMENT =
  "VISOR Fitness is a product owned and operated by Cedra Kaddour FZ-LLC.";

export const AI_TRANSFORMATION_DISCLAIMER =
  "AI-generated transformation images are illustrative estimates based on user-provided information. They are not guaranteed outcomes, medical predictions or promises of specific physical results. Actual results vary based on training, nutrition, health, genetics, consistency and other factors.";

export const HEALTH_DISCLAIMER =
  "VISOR Fitness provides fitness, nutrition and wellness information for general informational purposes. It is not a medical service and does not provide medical diagnosis, treatment or emergency advice.";

export const AiTransformationDisclaimer = ({ className = "" }: { className?: string }) => (
  <aside
    className={`glass-card rounded-2xl border border-white/10 p-5 text-sm text-muted-foreground leading-relaxed ${className}`}
  >
    <p className="mb-2 font-semibold text-foreground">AI transformation disclaimer</p>
    <p>{AI_TRANSFORMATION_DISCLAIMER}</p>
    <p className="mt-3">
      Photos you upload are processed by our AI provider solely to generate your transformation
      preview. Original and generated images are stored with your account until you delete them or
      delete your account, and are then removed from active systems (backup copies purge within
      ~90 days). Your photos are <strong>not</strong> used to train AI models.
    </p>
  </aside>
);
