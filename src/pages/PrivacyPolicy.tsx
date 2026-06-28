import { ContentPage } from "@/components/seo/ContentPage";

const PrivacyPolicy = () => (
  <ContentPage
    title="VISOR Privacy Policy — How We Handle Your Data"
    description="How VISOR (operated by Drakkar, Norway) collects, uses, shares and retains your information across the mobile app, AI features and subscriptions."
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
        community tools, and subscriptions. VISOR is operated by Drakkar Mahmed Harun, a sole
        proprietorship registered in Norway, and is governed by the EU/EEA General Data Protection
        Regulation (GDPR) and the Norwegian Personal Data Act (<em>personopplysningsloven</em>).
        <br />
        <span className="text-sm opacity-70">Last updated: June 2026</span>
      </>
    }
    sections={[
      {
        heading: "Data Controller",
        body: (
          <>
            <p>
              The data controller responsible for your personal data is{" "}
              <strong>Drakkar Mahmed Harun</strong> ("Drakkar", "VISOR", "we", "us"),
              a sole proprietorship (<em>enkeltpersonforetak</em>) registered in Norway under organisation number{" "}
              <strong>935 975 530</strong>, with registered address{" "}
              <strong>Bjørnegårdsvingen 17, 1338 Sandvika, Norway</strong>.
            </p>
            <p>
              For privacy questions or to exercise your rights, contact us at{" "}
              <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a>.
            </p>
          </>
        ),
      },
      {
        heading: "Information We Collect",
        body: (
          <>
            <p><strong>Account and profile information.</strong> Name, email, authentication identifiers, profile photo, date of birth or age, gender, country and preferences.</p>
            <p><strong>Fitness, wellness, and nutrition data.</strong> Goals, workout plans, exercise history, activity sessions, calorie logs, meals, body measurements, weight, sleep, routines and related preferences. Some of this is treated as <strong>special category (health) data</strong> under GDPR Art. 9 and is processed only with your explicit consent.</p>
            <p><strong>Photos and media.</strong> Images you upload for profile, meal scanning, or transformation analysis. Body and meal images may reveal health-related information and are also treated as special category data.</p>
            <p><strong>Community and communications.</strong> Posts, messages, moderation reports and related records.</p>
            <p><strong>Subscription and transaction information.</strong> Subscription status, entitlements, product identifiers, renewal dates and receipt identifiers from Apple, Google, RevenueCat or similar billing partners. We do not receive or store your full payment card number.</p>
            <p><strong>Device, diagnostics, and usage.</strong> IP address, device type, OS, app version, push token, crash data, diagnostics and usage events.</p>
            <p><strong>Apple Health / HealthKit.</strong> VISOR does not access, read from, or write to Apple Health or HealthKit.</p>
          </>
        ),
      },
      {
        heading: "Legal Bases for Processing",
        body: (
          <>
            <p>We process personal data only where we have a legal basis under GDPR Art. 6 (and Art. 9 for health data):</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contract (Art. 6(1)(b)).</strong> Creating and managing your account, delivering core features and processing subscriptions.</li>
              <li><strong>Explicit consent (Art. 6(1)(a) and Art. 9(2)(a)).</strong> Processing your fitness, body, sleep and other health data, AI processing of that data, and optional analytics or marketing.</li>
              <li><strong>Legitimate interests (Art. 6(1)(f)).</strong> Securing the service, preventing fraud and abuse, and improving features — balanced against your rights.</li>
              <li><strong>Legal obligation (Art. 6(1)(c)).</strong> Accounting, tax and responding to lawful requests.</li>
            </ul>
            <p>You can withdraw consent at any time. Withdrawal does not affect processing that already took place before withdrawal.</p>
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
          <>
            <p>
              VISOR includes AI-assisted features such as chat, workout and nutrition guidance, meal image analysis,
              and body transformation tools. Relevant prompts, profile context, photos or inputs — which may include
              health-related data — are transmitted to <strong>Google (Gemini)</strong> as our AI processor to generate outputs.
              We rely on your <strong>explicit consent</strong>, obtained through in-app consent screens during onboarding
              and before you enable health-related AI features.
            </p>
            <p>
              We contractually require our AI processor to use your inputs only to generate your outputs and{" "}
              <strong>not to use your data to train its general models</strong>. Health and fitness data transmitted to
              Google Gemini is <strong>not used for advertising, cross-app tracking, or sold</strong> to any third party,
              and is retained only as long as needed to provide the feature, then deleted or anonymized in line with the
              retention periods below.
            </p>
            <p>
              AI-generated outputs can be incomplete or inaccurate and should be used as general fitness or wellness
              guidance only — not as medical advice or a guarantee of results. We do not make decisions that produce
              legal or similarly significant effects about you based solely on automated processing; where automated
              processing is used, you can request human review.
            </p>
          </>
        ),
      },
      {
        heading: "How We Share Information",
        body: (
          <>
            <p><strong>We do not sell your personal data</strong>, including your health and fitness data, and we do not share your health or fitness data with any third party for advertising, marketing or cross-context behavioral tracking.</p>
            <p><strong>Service providers.</strong> Vendors that help us run VISOR — cloud hosting, storage, CDN, authentication, notifications, analytics, support and subscription management — acting as processors on our instructions.</p>
            <p><strong>Examples.</strong> Firebase / Google services for authentication and messaging; Google Gemini for AI features (including health-related inputs); RevenueCat for subscription and entitlement management — it receives your app user ID, subscription product identifiers, purchase timestamps and device platform to manage and restore your subscription status, and does not receive your health or fitness data; and Apple App Store and Google Play for billing.</p>
            <p><strong>Legal and safety.</strong> When reasonably necessary to comply with law, respond to valid requests, protect users, investigate fraud or enforce our Terms.</p>
            <p><strong>Business transfers.</strong> Information may transfer as part of a merger, acquisition, financing or asset sale, subject to applicable law.</p>
          </>
        ),
      },
      {
        heading: "International Data Transfers",
        body: (
          <p>
            Some of our providers (such as Google) may process personal data outside Norway and the EU/EEA, including
            in the United States. Where data is transferred outside the EEA, we rely on appropriate safeguards under
            GDPR Chapter V — including the European Commission's <strong>Standard Contractual Clauses</strong> and, where
            applicable, certification under the <strong>EU–US Data Privacy Framework</strong>. You can request more
            information about these safeguards using the contact details below.
          </p>
        ),
      },
      {
        heading: "Data Retention",
        body: (
          <>
            <p>We keep personal information only as long as necessary for the purposes it was collected:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account and profile.</strong> For the life of your account; deleted on account deletion (limited copies may persist in backups for up to ~90 days).</li>
              <li><strong>Fitness and health data.</strong> For the life of your account and deleted when you delete your account, unless retention is legally required.</li>
              <li><strong>Subscription and transaction records.</strong> Retained for as long as required by Norwegian accounting law (currently 5 years) and for billing reconciliation.</li>
              <li><strong>Diagnostic logs and security records.</strong> Kept for limited periods, then deleted or anonymized.</li>
            </ul>
            <p>After a deletion request, limited information may be retained for fraud prevention, billing reconciliation or legal compliance, for no longer than the applicable legal or accounting obligation requires.</p>
          </>
        ),
      },
      {
        heading: "Your Rights",
        body: (
          <>
            <p>Subject to applicable law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access a copy of your personal data and information about how it is processed (Art. 15).</li>
              <li>Rectify inaccurate or incomplete data (Art. 16).</li>
              <li>Erase your data (Art. 17), including via in-app account deletion (see "Account Deletion" below).</li>
              <li>Restrict processing (Art. 18) or object to processing based on legitimate interests (Art. 21).</li>
              <li>Receive your data in a portable, machine-readable format (Art. 20).</li>
              <li>Withdraw consent at any time (Art. 7), without affecting prior processing.</li>
              <li>Not be subject to decisions based solely on automated processing with legal or similarly significant effects (Art. 22).</li>
            </ul>
            <p>
              You can withdraw consent for health-data processing or AI features, and delete your account, directly in
              the app from your account settings. You can also email{" "}
              <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a>.
              We respond within 30 days. You also have the right to lodge a complaint with the Norwegian Data Protection
              Authority (<a href="https://www.datatilsynet.no" className="text-primary hover:underline">Datatilsynet</a>) or your
              local EU/EEA supervisory authority.
            </p>
          </>
        ),
      },
      {
        heading: "Account Deletion",
        body: (
          <p>
            You can permanently delete your VISOR account at any time directly in the app, from your account settings.
            Deletion is <strong>self-service</strong> — you do not need to contact us to complete it. When you delete your
            account, your profile, fitness and health data, photos and community content are removed from our active
            systems. Backup copies may persist for up to ~90 days before they are purged. Transaction records required by
            Norwegian accounting law are retained for the legally required period (currently 5 years) regardless of account
            deletion.
          </p>
        ),
      },
      {
        heading: "Cookies and Similar Technologies",
        body: (
          <p>
            Our website and app use technologies that are strictly necessary to operate the service, and optional
            analytics technologies that are used only with your consent. You can manage optional technologies through
            the consent controls or your device and browser settings.
          </p>
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
        body: (
          <>
            <p>
              VISOR is not directed to children under 13, and we do not knowingly collect personal information from
              children under 13. The minimum age to use VISOR is 13; in some EU/EEA countries the minimum age for
              consenting to online services is higher (for example, 16 in Germany), and where a higher age applies we
              rely on appropriate consent from a parent or guardian.
            </p>
            <p>
              Users between 13 and 17 may use VISOR where permitted by law. We do not use age-verification technology
              and rely on the date of birth provided at registration; we recommend that minors use VISOR under parental
              supervision. A parent or guardian who believes a child has provided personal data without appropriate
              consent can contact us at{" "}
              <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a>{" "}
              to request deletion.
            </p>
          </>
        ),
      },
      {
        heading: "Changes to This Policy",
        body: <p>We may update this Privacy Policy from time to time. If we make material changes, we may notify you in-app, by email or by other appropriate means.</p>,
      },
      {
        heading: "Contact Us",
        body: (
          <p>
            Controller: <strong>Drakkar Mahmed Harun</strong> (org. no. 935 975 530), Bjørnegårdsvingen 17, 1338 Sandvika, Norway
            <br />
            Website: <a href="https://visorfitness.com" className="text-primary hover:underline">visorfitness.com</a>
            <br />
            Email: <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a>
            <br />
            Supervisory authority: <a href="https://www.datatilsynet.no" className="text-primary hover:underline">Datatilsynet</a> (Norway)
          </p>
        ),
      },
    ]}
  />
);

export default PrivacyPolicy;
