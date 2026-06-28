import { ContentPage } from "@/components/seo/ContentPage";

const TermsOfUse = () => (
  <ContentPage
    title="VISOR Terms of Use"
    description="The terms that govern your access to and use of the VISOR mobile app, AI features, community features and subscriptions, operated by Drakkar in Norway."
    path="/terms"
    h1="Terms of Use"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Terms of Use", href: "/terms" },
    ]}
    intro={
      <>
        These Terms of Use govern your access to and use of the VISOR mobile application and related services,
        including fitness planning, nutrition tools, AI features, community features and subscriptions. VISOR is
        operated by Drakkar Mahmed Harun, a sole proprietorship registered in Norway.
        By downloading, creating an account for, or using VISOR, you agree to these Terms. If you do not agree, do not use the service.
        <br />
        <span className="text-sm opacity-70">Last updated: June 2026</span>
      </>
    }
    sections={[
      {
        heading: "Who We Are",
        body: (
          <p>
            VISOR is operated by <strong>Drakkar Mahmed Harun</strong>, a sole proprietorship
            (<em>enkeltpersonforetak</em>) registered in Norway under organisation number{" "}
            <strong>935 975 530</strong>, with registered address Bjørnegårdsvingen 17, 1338 Sandvika, Norway
            ("Drakkar", "VISOR", "we", "us"). "Drakkar" is used as the operating umbrella for the VISOR app.
          </p>
        ),
      },
      {
        heading: "Eligibility and Accounts",
        body: (
          <ul className="list-disc pl-5 space-y-2">
            <li>You must be at least 13 years old to use VISOR, or older if required by the laws where you live (for example, 16 in some EU/EEA countries). Where a higher age applies, you may use VISOR only with consent from a parent or guardian.</li>
            <li>You agree to provide accurate account information and keep it reasonably up to date.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials and for activity that occurs through your account.</li>
          </ul>
        ),
      },
      {
        heading: "Health, Wellness, and AI Disclaimer",
        body: (
          <>
            <p>VISOR provides fitness, nutrition, wellness and motivational tools for general informational purposes only. VISOR is not a medical service and does not provide medical diagnosis or treatment.</p>
            <p>You should consult a qualified healthcare professional before starting or changing any exercise, nutrition, recovery or supplementation program, especially if you have an injury, medical condition or other health concern.</p>
            <p>AI-generated outputs — including chat guidance, meal analysis, workout suggestions and transformation visuals — may be incomplete or inaccurate. They should not be treated as medical advice, safety clearance or guaranteed results.</p>
          </>
        ),
      },
      {
        heading: "Subscriptions, Trials, and Billing",
        body: (
          <ul className="list-disc pl-5 space-y-2">
            <li>VISOR may offer free and paid tiers, including subscriptions that unlock premium features.</li>
            <li>Subscriptions on iPhone are billed by Apple. Subscriptions on Android are billed by Google Play. Purchases are also managed through our subscription infrastructure, including RevenueCat.</li>
            <li>Unless canceled at least 24 hours before the end of the current period, subscriptions renew automatically and your account is charged at the then-current price through the relevant app store.</li>
            <li>You can manage, change or cancel your subscription, and view pricing and renewal dates, through the Apple App Store or Google Play subscription settings.</li>
            <li>Any free trial converts to a paid subscription at the end of the trial unless canceled beforehand.</li>
            <li>Refunds are handled under the rules of the applicable app store unless otherwise required by law.</li>
          </ul>
        ),
      },
      {
        heading: "Right of Withdrawal (EU/EEA Consumers)",
        body: (
          <>
            <p>
              If you are a consumer in the EU/EEA, you normally have a 14-day right to withdraw from a purchase of digital
              services. By starting a subscription or accessing premium digital content immediately, you expressly request
              that performance begin during the withdrawal period and acknowledge that you lose the right of withdrawal once
              the service has been fully performed.
            </p>
            <p>
              Where billing is handled by Apple or Google, refunds and cancellations follow the applicable app store's
              rules, in addition to any mandatory consumer rights you have under Norwegian and EU/EEA law.
            </p>
          </>
        ),
      },
      {
        heading: "Community and User Content",
        body: (
          <>
            <p>If you post content, join groups, send messages or otherwise submit user content in VISOR, you are responsible for that content and for ensuring that you have the rights needed to share it.</p>
            <p>You grant VISOR a limited, non-exclusive, worldwide license to host, store, reproduce, display and process your user content only as reasonably necessary to operate, secure, moderate and improve the service.</p>
            <p>You can report illegal or infringing content or other violations to us at veyntatech@gmail.com, and we may remove content or restrict accounts that breach these Terms or applicable law.</p>
          </>
        ),
      },
      {
        heading: "Acceptable Use",
        body: (
          <>
            <p>You must not use VISOR to break the law, harass others, impersonate another person, upload harmful or infringing content, or interfere with the security or operation of the service.</p>
            <p>You must not attempt to scrape, reverse engineer, decompile or misuse VISOR, its APIs, AI features or subscription systems except where a restriction is prohibited by applicable law.</p>
          </>
        ),
      },
      {
        heading: "Intellectual Property",
        body: <p>VISOR and its content, software, branding, workout media, designs and materials are owned by Drakkar or its licensors and are protected by applicable intellectual property laws.</p>,
      },
      {
        heading: "Service Availability and Changes",
        body: (
          <>
            <p>We may add, modify, suspend or remove features, content, pricing or parts of the service at any time.</p>
            <p>We work to keep VISOR available and functional, but we do not guarantee uninterrupted availability, perfect accuracy or that every feature will always remain available.</p>
          </>
        ),
      },
      {
        heading: "Suspension, Termination, and Deletion",
        body: (
          <>
            <p>We may suspend or terminate access to VISOR if we reasonably believe you violated these Terms, created risk for users or the platform, or used the service in a fraudulent or abusive way.</p>
            <p>You may stop using VISOR at any time and may request account deletion through the app.</p>
          </>
        ),
      },
      {
        heading: "Disclaimers and Liability Limits",
        body: (
          <p>
            To the fullest extent permitted by applicable law, VISOR is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.
            To the fullest extent permitted by applicable law, VISOR will not be liable for indirect, incidental, special, consequential, exemplary or punitive damages, or for loss of data, profits, goodwill or business opportunities arising from your use of the service.
            Nothing in these Terms limits rights that cannot be waived under applicable consumer protection law, including mandatory Norwegian and EU/EEA consumer rights.
          </p>
        ),
      },
      {
        heading: "Changes to These Terms",
        body: <p>We may update these Terms from time to time. If we make material changes, we will notify you in-app, by email or by other appropriate means. Your continued use of VISOR after changes take effect means you accept the updated Terms.</p>,
      },
      {
        heading: "Governing Law and Disputes",
        body: (
          <>
            <p>
              These Terms are governed by the laws of Norway, without regard to conflict-of-law rules. Disputes are subject
              to the jurisdiction of the Norwegian courts.
            </p>
            <p>
              If you are a consumer, this does not deprive you of the protection of mandatory consumer law in your country of
              residence, and you may bring proceedings in your local courts where required by law. EU/EEA consumers may also
              use the European Commission's Online Dispute Resolution platform at{" "}
              <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline">ec.europa.eu/consumers/odr</a>.
            </p>
          </>
        ),
      },
      {
        heading: "Severability",
        body: <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</p>,
      },
      {
        heading: "Contact Us",
        body: (
          <p>
            Operator: <strong>Drakkar Mahmed Harun</strong> (org. no. 935 975 530), Bjørnegårdsvingen 17, 1338 Sandvika, Norway
            <br />
            Website: <a href="https://visorfitness.com" className="text-primary hover:underline">visorfitness.com</a>
            <br />
            Email: <a href="mailto:veyntatech@gmail.com" className="text-primary hover:underline">veyntatech@gmail.com</a>
          </p>
        ),
      },
    ]}
  />
);

export default TermsOfUse;
