import { ContentPage } from "@/components/seo/ContentPage";
import { COMPANY, OPERATOR_STATEMENT } from "@/components/legal/CompanyLegalInfo";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cedra Kaddour FZ-LLC",
  alternateName: "VISOR Fitness",
  url: "https://visorfitness.com",
  email: COMPANY.emails.developer,
  address: {
    "@type": "PostalAddress",
    streetAddress: "FDRK7137, Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ",
    addressLocality: "Ras Al Khaimah",
    addressCountry: "AE",
  },
};

const Company = () => (
  <ContentPage
    title="Company Information — VISOR Fitness | Cedra Kaddour FZ-LLC"
    description="VISOR Fitness is a product owned and operated by Cedra Kaddour FZ-LLC, a Free Zone LLC registered in Ras Al Khaimah, United Arab Emirates."
    path="/company"
    h1="Company Information"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Company", href: "/company" },
    ]}
    jsonLd={orgLd}
    intro={
      <>
        <strong>{OPERATOR_STATEMENT}</strong>
        <br />
        <span className="text-sm opacity-70">Last updated: August 2026</span>
      </>
    }
    sections={[
      {
        heading: "Legal entity",
        body: (
          <ul className="space-y-2">
            <li>Legal name: <strong>{COMPANY.legalName}</strong></li>
            <li>Legal type: {COMPANY.legalType}</li>
            <li>Registration No.: {COMPANY.registrationNo}</li>
            <li>Licence No.: {COMPANY.licenceNo}</li>
            <li>Jurisdiction: {COMPANY.jurisdiction}</li>
            <li>Registered address: {COMPANY.address}</li>
            <li>Website: <a href="https://visorfitness.com" className="text-primary hover:underline">visorfitness.com</a></li>
            <li>
              Developer contact:{" "}
              <a href={`mailto:${COMPANY.emails.developer}`} className="text-primary hover:underline">
                {COMPANY.emails.developer}
              </a>
            </li>
          </ul>
        ),
      },
      {
        heading: "Brand and operator relationship",
        body: (
          <>
            <p>
              “VISOR”, “VISOR Fitness” and the VISOR app are product and brand names. They are not
              separate legal entities. The legal operator, publisher and contracting party for the
              VISOR Fitness app and this website is {COMPANY.legalName}.
            </p>
            <p>
              Cedra Kaddour FZ-LLC is incorporated as a Free Zone Limited Liability Company in
              Ras Al Khaimah, United Arab Emirates.
            </p>
          </>
        ),
      },
      {
        heading: "Platform verification",
        body: (
          <p>
            For Apple and Google organization verification, D-U-N-S matching or any developer
            account enquiry, contact{" "}
            <a href={`mailto:${COMPANY.emails.developer}`} className="text-primary hover:underline">
              {COMPANY.emails.developer}
            </a>
            .
          </p>
        ),
      },
    ]}
  />
);

export default Company;
