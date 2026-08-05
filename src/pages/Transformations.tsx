import TransformationTemplate from "@/templates/TransformationTemplate";
import { AiTransformationDisclaimer } from "@/components/legal/CompanyLegalInfo";

export default function Transformations() {
  return (
    <>
      <TransformationTemplate state="coming-soon" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <AiTransformationDisclaimer />
      </div>
    </>
  );
}
