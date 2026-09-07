import VisorApp from "@/visor/App";
import { LanguageProvider } from "@/visor/i18n";

const Index = () => (
  <LanguageProvider>
    <VisorApp />
  </LanguageProvider>
);

export default Index;
