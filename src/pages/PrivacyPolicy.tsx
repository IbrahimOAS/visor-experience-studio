import { ContentPage } from "@/components/seo/ContentPage";

const PrivacyPolicy = () => (
  <ContentPage
    title="VISOR Privacy Policy — How We Handle Your Data"
    description="How VISOR collects, uses, shares and retains your information across the mobile app, AI features and subscriptions."
    path="/privacy"
    h1="Privacy Policy"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Privacy Policy", href: "/privacy" },
    ]}
    intro={
      <>
        This Privacy Policy explains how VISOR collects, uses, shares, and retains information
        when you use the VISOR mobile app and related services — including workout planning,
        nutrition logging, calorie tracking, AI-powered coaching, body transformation features,
        community tools, and subscriptions.
        <br />
        <span className="text-sm opacity-70">Last updated: June 2026</span>
      </>
    }
    sections={[
      {
        heading: "Information We Collect",
        body: (
          <>
            <p><strong>Account and profile information.</strong> Name, email, authentication identifiers, profile photo, date of birth or age, gender, country and preferences.</p>
            <p><strong>Fitness, wellness, and nutrition data.</strong> Goals, workout plans, exercise history, activity sessions, calorie logs, meals, body measurements, weight, sleep, routines and related preferences.</p>
            <p><strong>Photos and media.</strong> Images you upload for profile, meal scanning, or transformation analysis.</p>
            <p><strong>Community and communications.</strong> Posts, messages, moderation reports and related records.</p>
            <p><strong>Subscription and transaction information.</strong> Subscription status, entitlements, product identifiers, renewal dates and receipt identifiers from Apple, Google, RevenueCat or similar billing partners. We do not receive or store your full payment card number.</p>
            <p><strong>Device, diagnostics, and usage.</strong> IP address, device type, OS, app version, push token, crash data, diagnostics and usage events.</p>
          </>
        ),
      },
      {
        heading: "How We Use Information",
        body: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Create and manage your account and sync your profile.</li>
            <li>Provide and personalize workouts, nutrition tools, calorie tracking and recovery guidance.</li>
            <li>Operate AI features such as coaching chat, food analysis, plan generation and transformation outputs.</li>
            <li>Process subscriptions, restore purchases, detect billing issues and manage premium access.</li>
            <li>Send service notifications subject to your device and app settings.</li>
            <li>Monitor performance, prevent fraud or abuse, enforce our rules and comply with legal obligations.</li>
          </ul>
        ),
      },
      {
        heading: "AI Features and Automated Processing",
        body: (
          <p>
            VISOR includes AI-assisted features such as chat, workout and nutrition guidance, meal image analysis,
            and body transformation tools. Relevant prompts, profile context, photos or inputs may be transmitted
            to AI service providers selected by our backend. AI-generated outputs can be incomplete or inaccurate
            and should be used as general fitness or wellness guidance only — not as medical advice or a guarantee of results.
          </p>
        ),
      },
      {
        heading: "How We Share Information",
        body: (
          <>
            <p><strong>Service providers.</strong> Vendors that help us run VISOR — cloud hosting, storage, CDN, authentication, notifications, analytics, support and subscription management.</p>
            <p><strong>Examples.</strong> Firebase / Google services for auth and messaging, RevenueCat for subscriptions, Apple App Store and Google Play billing, and AI providers such as DeepSeek and Google Gemini.</p>
            <p><strong>Legal and safety.</strong> When reasonably necessary to comply with law, respond to valid requests, protect users, investigate fraud or enforce our Terms.</p>
            <p><strong>Business transfers.</strong> Information may transfer as part of a merger, acquisition, financing or asset sale, subject to applicable law.</p>
          </>
        ),
      },
      {
        heading: "Data Retention",
        body: (
          <p>
            We keep personal information for as long as reasonably necessary to provide VISOR, maintain your account,
            fulfill subscriptions, resolve disputes and meet security, accounting or legal requirements. After deletion
            requests, limited information may be retained for fraud prevention, billing reconciliation, legal compliance
            or legitimate recordkeeping. Diagnostic logs, backups and security records may persist for limited periods
            before deletion or anonymization.
          </p>
        ),
      },
      {
        heading: "Your Choices and Rights",
        body: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Review and update your account and profile information inside the app.</li>
            <li>Control camera, photo and notification permissions through your device settings.</li>
            <li>Initiate account deletion from within the app, or contact us for access, correction, export or deletion requests.</li>
          </ul>
        ),
      },
      {
        heading: "Security",
        body: (
          <p>
            We use reasonable technical and organizational safeguards designed to protect personal information,
            including encryption in transit, access controls and secure handling of authentication data.
            No system is completely secure, so we cannot guarantee absolute security.
          </p>
        ),
      },
      {
        heading: "Children",
        body: <p>VISOR is not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>,
      },
      {
        heading: "Changes to This Policy",
        body: <p>We may update this Privacy Policy from time to time. If we make material changes, we may notify you in-app, by email or by other appropriate means.</p>,
      },
      {
        heading: "Contact Us",
        body: (
          <p>
            Website: <a href="https://visorfitness.com" className="text-primary hover:underline">visorfitness.com</a>
            <br />
            Email: <a href="mailto:support@visorfitness.com" className="text-primary hover:underline">support@visorfitness.com</a>
          </p>
        ),
      },
    ]}
  />
);

export default PrivacyPolicy;
