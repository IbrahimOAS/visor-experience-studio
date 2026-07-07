import { ContentPage } from "@/components/seo/ContentPage";
import { Mail, MessageCircle, Clock, Trash2, CreditCard, HelpCircle } from "lucide-react";

const Support = () => (
  <ContentPage
    title="VISOR Support — Contact Us & Get Help"
    description="Get help with VISOR. Contact support, find answers to common questions, manage your subscription, delete your account, and report issues."
    path="/support"
    h1="Support Center"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Support", href: "/support" },
    ]}
    intro={
      <>
        Need help with VISOR? We're here for you. Browse the common topics below or reach out directly
        and we'll get back to you as quickly as possible.
        <br />
        <span className="text-sm opacity-70">Last updated: July 2026</span>
        <br />
        <a
          href="https://visorfitness.com/support"
          className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://visorfitness.com/support
        </a>
      </>
    }
    sections={[
      {
        heading: "Contact Us",
        body: (
          <div className="space-y-6">
            <p>
              The fastest way to get support is by email. We typically respond within 1–2 business days.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:support@visorfitness.com"
                className="glass-card-strong rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Email Support</div>
                  <div className="text-sm text-primary hover:underline">support@visorfitness.com</div>
                  <div className="text-xs text-muted-foreground mt-1">General questions, bugs, feedback</div>
                </div>
              </a>
              <a
                href="mailto:privacy@visorfitness.com"
                className="glass-card-strong rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Privacy Questions</div>
                  <div className="text-sm text-primary hover:underline">privacy@visorfitness.com</div>
                  <div className="text-xs text-muted-foreground mt-1">Data, privacy, account deletion</div>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>Support hours: Monday–Friday, 09:00–17:00 CET (Norway time)</span>
            </div>
          </div>
        ),
      },
      {
        heading: "Frequently Asked Questions",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <HelpCircle size={18} className="text-primary" />
                How do I restore my subscription or purchase?
              </h3>
              <p>
                Open VISOR, go to your account or subscription settings, and tap "Restore Purchases."
                Make sure you're signed in with the same Apple ID or Google Play account used for the original purchase.
                If the issue persists, email us with your receipt or order ID.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <CreditCard size={18} className="text-primary" />
                How do I cancel, refund, or change my subscription?
              </h3>
              <p>
                Subscriptions are managed by Apple (iOS) or Google (Android). To cancel or request a refund,
                visit your platform's subscription settings. If you need help identifying your plan or have a billing question,
                contact us at <a href="mailto:support@visorfitness.com" className="text-primary hover:underline">support@visorfitness.com</a>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <Trash2 size={18} className="text-primary" />
                How do I delete my account and data?
              </h3>
              <p>
                You can delete your account directly in the VISOR app from your account settings.
                This removes your profile, fitness data, photos and community content from active systems.
                If you can't access the app, email <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a> from the email address associated with your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <HelpCircle size={18} className="text-primary" />
                The app is crashing or not loading. What should I do?
              </h3>
              <p>
                Try these steps first: force-close the app, restart your device, and make sure you're on the latest app version and OS update.
                If the problem continues, email <a href="mailto:support@visorfitness.com" className="text-primary hover:underline">support@visorfitness.com</a> with your device model, OS version, and a description of what happens.
              </p>
            </div>
          </div>
        ),
      },
      {
        heading: "Billing & Subscriptions",
        body: (
          <>
            <p>
              VISOR subscriptions are processed through Apple App Store (iOS) and Google Play (Android).
              We do not store your payment card information.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To cancel or manage an iOS subscription: iPhone Settings → [Your Name] → Subscriptions → VISOR.</li>
              <li>To manage an Android subscription: Google Play Store → Profile → Payments & subscriptions → Subscriptions.</li>
              <li>For refund requests, use Apple's or Google's refund flow, or contact us with your order details.</li>
            </ul>
            <p>
              If you see an unexpected charge or have trouble restoring a purchase, email{" "}
              <a href="mailto:support@visorfitness.com" className="text-primary hover:underline">support@visorfitness.com</a>{" "}
              and include your platform, order ID, and a screenshot if possible.
            </p>
          </>
        ),
      },
      {
        heading: "Report a Problem or Safety Concern",
        body: (
          <>
            <p>
              If you encounter harmful, inaccurate, or inappropriate AI output, community content, or app behavior,
              please report it in-app where available, or email us directly.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>General issues & feedback: <a href="mailto:support@visorfitness.com" className="text-primary hover:underline">support@visorfitness.com</a></li>
              <li>Privacy, data, or account deletion: <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a></li>
            </ul>
            <p>
              We review reports as soon as possible and aim to respond within 5 business days for safety or abuse reports.
            </p>
          </>
        ),
      },
      {
        heading: "Mailing Address",
        body: (
          <p>
            Drakkar Mahmed Harun
            <br />
            Bjørnegårdsvingen 17
            <br />
            1338 Sandvika
            <br />
            Norway
            <br />
            Organisation number: 935 975 530
          </p>
        ),
      },
    ]}
  />
);

export default Support;
