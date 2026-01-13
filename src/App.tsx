import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import LocalChapters from "./pages/LocalChapters";
import JoinOnline from "./pages/chapters/JoinOnline";
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
import Reports from "./pages/Reports";
import CaseStudies from "./pages/CaseStudies";
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
import InclusionAccess from "./pages/programs/InclusionAccess";
import ELibraryAdminPage from "./pages/dashboard/ELibraryAdminPage";
import DigitalBoardAdminPage from "./pages/admin/DigitalBoardAdminPage";
import NotFound from "./pages/NotFound";
import Vacancies from "./pages/Vacancies";
import VacanciesAdminPage from "./pages/admin/VacanciesAdminPage";
import PartnerWithUs from "./pages/PartnerWithUs";
import OrganizationalProfile from "./pages/resources/OrganizationalProfile";
import Ambassador from "./pages/get-involved/Ambassador";

// New Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// New Dashboard Pages
import Welcome from "./pages/dashboard/Welcome";
import ChapterInbox from "./pages/chapter/Inbox";
import Profile from "./pages/dashboard/Profile";
import Activity from "./pages/dashboard/Activity";

// Admin Finance Pages
import FinanceOverview from "./pages/admin/FinanceOverview";
import BankAccounts from "./pages/admin/BankAccounts";
import Disbursements from "./pages/admin/Disbursements";

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
              <Route path="/programs/inclusion-access" element={<InclusionAccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/local-chapters" element={<LocalChapters />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/join-online" element={<JoinOnline />} />
              <Route path="/chapters/join" element={<JoinOnline />} />
              <Route path="/media" element={<Media />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/welcome" element={<Welcome />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/activity" element={<Activity />} />
              <Route path="/dashboard/elibrary" element={<ELibraryAdminPage />} />
              
              {/* Chapter Routes */}
              <Route path="/chapter/inbox" element={<ChapterInbox />} />
              
              {/* Admin Routes */}
              <Route path="/admin/digital-board" element={<DigitalBoardAdminPage />} />
              <Route path="/admin/vacancies" element={<VacanciesAdminPage />} />
              <Route path="/admin/finance/overview" element={<FinanceOverview />} />
              <Route path="/admin/finance/bank-accounts" element={<BankAccounts />} />
              <Route path="/admin/finance/disbursements" element={<Disbursements />} />
              
              {/* Other Routes */}
              <Route path="/donate" element={<Donate />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/get-involved/membership" element={<Membership />} />
              <Route path="/get-involved/ambassador" element={<Ambassador />} />
              <Route path="/resources/organizational-profile" element={<OrganizationalProfile />} />
              <Route path="/vacancies" element={<Vacancies />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/divisions" element={<Divisions />} />
              <Route path="/divisions/sobcd" element={<SOBCD />} />
              <Route path="/divisions/tdsd" element={<TDSD />} />
              <Route path="/divisions/ombdd" element={<OMBDD />} />
              <Route path="/divisions/santos-media" element={<SantosMedia />} />
              <Route path="/divisions/lcs" element={<LCS />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
