import { ContentPage } from "@/components/seo/ContentPage";
import { COMPANY, AI_TRANSFORMATION_DISCLAIMER } from "@/components/legal/CompanyLegalInfo";

const About = () => (
  <ContentPage
    title="About VISOR Fitness — AI Fitness Platform by Cedra Kaddour FZ-LLC"
    description="VISOR Fitness is an AI-powered fitness and wellness platform operated by Cedra Kaddour FZ-LLC, registered in Ras Al Khaimah, United Arab Emirates."
    path="/about"
    h1="About VISOR Fitness"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ]}
    intro={
      <>
        <strong>
          VISOR Fitness is an AI-powered fitness and wellness platform operated by Cedra Kaddour
          FZ-LLC. VISOR combines fitness planning, nutrition tracking, sleep and recovery tools,
          activity monitoring, AI coaching and transformation visualisation in one platform.
        </strong>
        <br />
        <span className="text-sm opacity-70">Last updated: August 2026</span>
      </>
    }
    sections={[
      {
        heading: "About the company",
        body: (
          <>
            <p>
              {COMPANY.legalName} is incorporated as a {COMPANY.legalType} in Ras Al Khaimah,
              United Arab Emirates.
            </p>
            <ul className="space-y-2">
              <li>Registration No.: {COMPANY.registrationNo}</li>
              <li>Licence No.: {COMPANY.licenceNo}</li>
              <li>Registered address: {COMPANY.address}</li>
            </ul>
            <p>
              Full legal details are published on our{" "}
              <a href="/company" className="text-primary hover:underline">company information page</a>.
            </p>
          </>
        ),
      },
      {
        heading: "What VISOR does",
        body: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Personalised training plans and workout tracking.</li>
            <li>Nutrition logging, calorie targets and AI food analysis.</li>
            <li>Sleep, recovery and activity monitoring.</li>
            <li>Emotionally adaptive AI coaching.</li>
            <li>AI body transformation visualisation.</li>
          </ul>
        ),
      },
      {
        heading: "Important limitations",
        body: (
          <>
            <p>
              VISOR Fitness provides fitness, nutrition and wellness information for general
              informational purposes. It is not a medical service and does not provide medical
              diagnosis, treatment or emergency advice.
            </p>
            <p>{AI_TRANSFORMATION_DISCLAIMER}</p>
          </>
        ),
      },
      {
        heading: "Contact",
        body: (
          <p>
            General enquiries:{" "}
            <a href={`mailto:${COMPANY.emails.support}`} className="text-primary hover:underline">
              {COMPANY.emails.support}
            </a>
            . More options on our{" "}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        ),
      },
    ]}
  />
);

export default About;
