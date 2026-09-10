import { ContentPage } from "@/components/seo/ContentPage";

const PrivacyPolicy = () => (
  <ContentPage
    title="VISOR Privacy Policy — How We Handle Your Data"
    description="How VISOR Fitness, operated by Cedra Kaddour FZ-LLC (Ras Al Khaimah, UAE), collects, uses, shares and retains your information across the mobile app, AI features and subscriptions."
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
        <br />
        <strong>
          Cedra Kaddour FZ-LLC operates the VISOR Fitness application and website. For the purposes
          of applicable data protection laws, Cedra Kaddour FZ-LLC is the controller of personal
          data collected through VISOR Fitness, except where another party is separately identified
          as a controller.
        </strong>{" "}
        We apply the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and, where
        it applies to users in the EU/EEA and UK, the GDPR.
        <br />
        <span className="text-sm opacity-70">Last updated: September 2026</span>
      </>
    }
    sections={[
      {
        heading: "Data Controller",
        body: (
          <>
            <p>
              The data controller responsible for your personal data is{" "}
              <strong>Cedra Kaddour FZ-LLC</strong> ("VISOR Fitness", "VISOR", "we", "us"), a Free
              Zone Limited Liability Company registered in Ras Al Khaimah, United Arab Emirates.
              VISOR Fitness is a product owned and operated by Cedra Kaddour FZ-LLC.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Legal entity: <strong>Cedra Kaddour FZ-LLC</strong></li>
              <li>Registration No.: <strong>0000004084353</strong></li>
              <li>Licence No.: <strong>7017101</strong></li>
              <li>
                Registered address: FDRK7137, Compass Building, Al Shohada Road, Al Hamra Industrial
                Zone-FZ, Ras Al Khaimah, United Arab Emirates
              </li>
            </ul>
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
          </>
        ),
      },
      {
        heading: "Connected Health and Wearable Data",
        body: (
          <>
            <p>VISOR may allow you to connect supported health, fitness and wearable services to your VISOR account. Current supported integrations may include Apple Health / HealthKit, Android Health Connect and Polar. Additional optional integrations may include Oura, Strava, WHOOP, Garmin, Dexcom and other compatible services as they become available.</p>
            <p>VISOR accesses data from a connected service only after you choose to connect that service and grant the required permissions or authorization.</p>
            <p>Depending on the service and the permissions you grant, connected health and fitness data may include heart rate, heart-rate variability, resting heart rate, steps, active energy, workouts, exercise history, sleep and sleep stages, blood oxygen, body temperature, recovery information, activity information and other health or fitness measurements made available by the connected provider.</p>
            <p>If you choose to connect a compatible continuous glucose monitoring service such as Dexcom, VISOR may receive glucose readings, timestamps, glucose trends and related CGM information that you authorize the provider to share with VISOR.</p>
            <p>Connected health and wearable data may be treated as health data or special category personal data under applicable law. Where required, VISOR processes this information only with your explicit consent.</p>
            <p>We use connected health and wearable data to provide and personalize features such as activity tracking, workout guidance, nutrition insights, sleep and recovery information, AI-assisted coaching and other fitness and wellness features you choose to use.</p>
            <p>VISOR does not sell connected health or wearable data and does not use this information for targeted advertising, cross-context behavioral advertising or advertising profiling.</p>
            <p>VISOR is a fitness and wellness service. Connected health and CGM information is provided for general wellness and informational purposes and is not intended to diagnose, treat, cure or prevent disease, determine insulin dosage or replace advice from a qualified healthcare professional.</p>
          </>
        ),
      },
      {
        heading: "Connecting and Disconnecting Third-Party Services",
        body: (
          <>
            <p>When you connect a supported third-party health or wearable service, authorization may be handled through the provider's application, operating system permission controls or OAuth authorization process.</p>
            <p>You can choose which permissions to grant where the connected service supports granular permissions. You may revoke permissions through VISOR, your device settings or the connected provider's account settings, depending on the integration.</p>
            <p>Disconnecting a service stops VISOR from requesting new data from that service. Information previously imported into VISOR remains subject to this Privacy Policy, including the Data Retention, Your Rights and Account Deletion sections.</p>
            <p>The third-party provider may separately process your information under its own privacy policy when you use its authentication, authorization or device services.</p>
          </>
        ),
      },
      {
        heading: "AI Model Training",
        body: (
          <p>
            We do <strong>not</strong> use your personal data, photos, health data, community content
            or AI conversations to train general-purpose AI models, and we contractually require our
            AI providers not to do so either. Your inputs are processed only to generate your own
            outputs.
          </p>
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
        heading: "Body Transformation Photos and Face Data",
        body: (
          <>
            <p>
              The body transformation feature asks you to upload a full-body photo in gym wear. These photos may
              incidentally contain your face. VISOR does <strong>not</strong> perform facial recognition, face detection, or
              biometric face analysis on any photo. Face data is <strong>not extracted, stored separately, or used for any purpose</strong>.
            </p>
            <p>
              The photo is transmitted to <strong>Google Gemini</strong> solely to generate a visual rendering of potential
              physique changes and is <strong>not used for identification or any face-specific processing</strong>. As with all
              health-related AI features, we rely on your explicit consent before processing body transformation photos.
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
            <p><strong>Connected health and wearable providers.</strong> When you choose to connect a third-party health, fitness, wearable or CGM service, VISOR may exchange the information necessary to authenticate the connection and receive the data you have authorized. Depending on the integrations available to you, these providers may include Apple Health / HealthKit, Android Health Connect, Polar, Oura, Strava, WHOOP, Garmin and Dexcom. VISOR accesses only the data permitted by the user and supported by the relevant integration.</p>
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
            Some of our providers (such as Google) may process personal data outside the United Arab Emirates and the EU/EEA, including
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
              <li><strong>Fitness, health and connected-device data.</strong> For the life of your account or for as long as needed to provide the features you have enabled. Disconnecting a connected health or wearable service stops future collection from that service but does not automatically delete information previously imported into VISOR. Previously imported information is deleted when you delete your account or when we are otherwise required to delete it under applicable law, subject to limited backup and legal-retention requirements.</li>
              <li><strong>Photos.</strong> Uploaded body and meal photos, and AI-generated transformation images, are kept until you delete them in the app or delete your account; backup copies purge within ~90 days. Photos are never used to train AI models.</li>
              <li><strong>Subscription and transaction records.</strong> Retained for as long as required by applicable UAE accounting, tax and record-keeping obligations (currently 5 years) and for billing reconciliation.</li>
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
              We respond within 30 days. You may also lodge a complaint with the UAE Data Office or,
              if you are in the EU/EEA or UK, with your local supervisory authority.
            </p>
            <p>You may also disconnect supported health and wearable integrations or revoke their permissions through VISOR, your device settings or the relevant third-party service. Revoking access stops future collection from that service.</p>
          </>
        ),
      },
      {
        heading: "Account Deletion",
        body: (
          <p>
            You can permanently delete your VISOR account at any time directly in the app, from your account settings.
            Deletion is <strong>self-service</strong> — you do not need to contact us to complete it. You can also request
            deletion from the web at <a href="/delete-account" className="text-primary hover:underline">visorfitness.com/delete-account</a>.
            When you delete your account, your profile, fitness and health data, photos and community content are removed
            from our active systems. Backup copies may persist for up to ~90 days before they are purged. Transaction
            records required by applicable UAE accounting and tax law are retained for the legally required period
            (currently 5 years) regardless of account deletion. Deletion requests are processed by Cedra Kaddour FZ-LLC.
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
        heading: "Minimum Age",
        body: (
          <>
            <p>
              VISOR is intended only for adults aged 18 and over. It is not directed to anyone under 18, and we do not
              knowingly collect personal information from anyone under 18.
            </p>
            <p>
              We rely on the date of birth provided at registration to confirm eligibility. If we learn that we have
              collected personal information from someone under 18, we will delete it. A parent or guardian who believes
              someone under 18 has provided personal data can contact us at{" "}
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
            Controller: <strong>Cedra Kaddour FZ-LLC</strong> (Registration No. 0000004084353, Licence No. 7017101)
            <br />
            Registered address: FDRK7137, Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ,
            Ras Al Khaimah, United Arab Emirates
            <br />
            Website: <a href="https://visorfitness.com" className="text-primary hover:underline">visorfitness.com</a>
            <br />
            Privacy contact: <a href="mailto:privacy@visorfitness.com" className="text-primary hover:underline">privacy@visorfitness.com</a>
            <br />
            Legal: <a href="mailto:legal@visorfitness.com" className="text-primary hover:underline">legal@visorfitness.com</a>
            <br />
            Company information: <a href="/company" className="text-primary hover:underline">visorfitness.com/company</a>
          </p>
        ),
      },
    ]}
  />
);

export default PrivacyPolicy;
