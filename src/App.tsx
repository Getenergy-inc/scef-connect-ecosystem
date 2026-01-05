import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import LocalChapters from "./pages/LocalChapters";
import Chapters from "./pages/Chapters";
import Media from "./pages/Media";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import DonationSuccess from "./pages/DonationSuccess";
import Wallet from "./pages/Wallet";
import GetInvolved from "./pages/GetInvolved";
import Membership from "./pages/Membership";
import Governance from "./pages/Governance";
import Certifications from "./pages/Certifications";
import Partners from "./pages/Partners";
import Divisions from "./pages/Divisions";
import Updates from "./pages/Updates";
import BGEO from "./pages/divisions/BGEO";
import SOBCD from "./pages/divisions/SOBCD";
import TDSD from "./pages/divisions/TDSD";
import OMBDD from "./pages/divisions/OMBDD";
import SantosMedia from "./pages/divisions/SantosMedia";
import LCS from "./pages/divisions/LCS";
import NESAAfrica from "./pages/programs/NESAAfrica";
import EduAidAfrica from "./pages/programs/EduAidAfrica";
import RebuildMySchoolAfrica from "./pages/programs/RebuildMySchoolAfrica";
import WomenGirlsEducation from "./pages/programs/WomenGirlsEducation";
import SpecialNeedsEducation from "./pages/programs/SpecialNeedsEducation";
import DigitalLearning from "./pages/programs/DigitalLearning";
import ELibraryNigeria from "./pages/programs/ELibraryNigeria";
import ELibraryAdminPage from "./pages/dashboard/ELibraryAdminPage";
import DigitalBoardAdminPage from "./pages/admin/DigitalBoardAdminPage";
import NotFound from "./pages/NotFound";

// Static pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/nesa-africa" element={<NESAAfrica />} />
              <Route path="/programs/eduaid-africa" element={<EduAidAfrica />} />
              <Route path="/programs/rebuild-my-school-africa" element={<RebuildMySchoolAfrica />} />
              <Route path="/programs/women-girls-education" element={<WomenGirlsEducation />} />
              <Route path="/programs/special-needs-education" element={<SpecialNeedsEducation />} />
              <Route path="/programs/digital-learning" element={<DigitalLearning />} />
              <Route path="/programs/elibrary-nigeria" element={<ELibraryNigeria />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/local-chapters" element={<LocalChapters />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/media" element={<Media />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/signin" element={<Auth />} />
              <Route path="/auth/signup" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/member" element={<Dashboard />} />
              <Route path="/dashboard/ambassador" element={<Dashboard />} />
              <Route path="/dashboard/volunteer" element={<Dashboard />} />
              <Route path="/dashboard/partner" element={<Dashboard />} />
              <Route path="/dashboard/staff" element={<Dashboard />} />
              <Route path="/dashboard/elibrary" element={<ELibraryAdminPage />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/digital-board" element={<DigitalBoardAdminPage />} />
              <Route path="/super-admin" element={<Dashboard />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/membership/join" element={<Membership />} />
              <Route path="/membership/ambassador" element={<Membership />} />
              <Route path="/volunteer/apply" element={<GetInvolved />} />
              <Route path="/volunteer/media" element={<GetInvolved />} />
              <Route path="/scholarships/apply" element={<EduAidAfrica />} />
              <Route path="/partnerships/csr" element={<Partners />} />
              <Route path="/partnerships/request" element={<Contact />} />
              <Route path="/partnerships/endorse" element={<Partners />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/governance/bot" element={<Governance />} />
              <Route path="/governance/boa" element={<Governance />} />
              <Route path="/governance/bod" element={<Governance />} />
              <Route path="/governance/lcps" element={<Governance />} />
              <Route path="/governance/management" element={<Governance />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/divisions" element={<Divisions />} />
              <Route path="/divisions/bgeo" element={<BGEO />} />
              <Route path="/divisions/governance-executive" element={<BGEO />} />
              <Route path="/divisions/sobcd" element={<SOBCD />} />
              <Route path="/divisions/tdsd" element={<TDSD />} />
              <Route path="/divisions/ombdd" element={<OMBDD />} />
              <Route path="/divisions/santos-media" element={<SantosMedia />} />
              <Route path="/divisions/lcs" element={<LCS />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
