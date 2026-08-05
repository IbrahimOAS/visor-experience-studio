import { ContentPage } from "@/components/seo/ContentPage";
import { COMPANY, OPERATOR_STATEMENT } from "@/components/legal/CompanyLegalInfo";

const Contact = () => (
  <ContentPage
    title="Contact VISOR Fitness — Support, Privacy & Legal"
    description="Contact VISOR Fitness, operated by Cedra Kaddour FZ-LLC in Ras Al Khaimah, UAE. Support, privacy, developer verification and legal contacts."
    path="/contact"
    h1="Contact VISOR Fitness"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ]}
    intro={
      <>
        <strong>{OPERATOR_STATEMENT}</strong> Use the contact addresses below and we will route
        your request to the right team.
        <br />
        <span className="text-sm opacity-70">Last updated: August 2026</span>
      </>
    }
    sections={[
      {
        heading: "Company details",
        body: (
          <ul className="space-y-2">
            <li><strong>VISOR Fitness</strong></li>
            <li>Operated by {COMPANY.legalName}</li>
            <li>Registration No. {COMPANY.registrationNo}</li>
            <li>Licence No. {COMPANY.licenceNo}</li>
            <li>{COMPANY.jurisdiction}</li>
            <li>Registered address: {COMPANY.address}</li>
          </ul>
        ),
      },
      {
        heading: "Email contacts",
        body: (
          <ul className="space-y-2">
            <li>
              General support:{" "}
              <a href={`mailto:${COMPANY.emails.support}`} className="text-primary hover:underline">{COMPANY.emails.support}</a>
            </li>
            <li>
              Privacy and data requests:{" "}
              <a href={`mailto:${COMPANY.emails.privacy}`} className="text-primary hover:underline">{COMPANY.emails.privacy}</a>
            </li>
            <li>
              Developer and platform verification:{" "}
              <a href={`mailto:${COMPANY.emails.developer}`} className="text-primary hover:underline">{COMPANY.emails.developer}</a>
            </li>
            <li>
              Legal:{" "}
              <a href={`mailto:${COMPANY.emails.legal}`} className="text-primary hover:underline">{COMPANY.emails.legal}</a>
            </li>
          </ul>
        ),
      },
      {
        heading: "Response times",
        body: (
          <p>
            We aim to reply to support requests within 5 business days and to privacy requests
            within 30 days. Account deletion requests are handled as described on our{" "}
            <a href="/delete-account" className="text-primary hover:underline">account deletion page</a>.
          </p>
        ),
      },
    ]}
  />
);

export default Contact;
