import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { HelmetProvider } from "react-helmet-async";

// Core Pages
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
import NotFound from "./pages/NotFound";
import Vacancies from "./pages/Vacancies";
import PartnerWithUs from "./pages/PartnerWithUs";

// Legal Pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import Help from "./pages/Help";

// Division Pages
import BGEO from "./pages/divisions/BGEO";
import SOBCD from "./pages/divisions/SOBCD";
import TDSD from "./pages/divisions/TDSD";
import OMBDD from "./pages/divisions/OMBDD";
import SantosMedia from "./pages/divisions/SantosMedia";
import LCS from "./pages/divisions/LCS";

// Program Pages
import NESAAfrica from "./pages/programs/NESAAfrica";
import EduAidAfrica from "./pages/programs/EduAidAfrica";
import RebuildMySchoolAfrica from "./pages/programs/RebuildMySchoolAfrica";
import WomenGirlsEducation from "./pages/programs/WomenGirlsEducation";
import SpecialNeedsEducation from "./pages/programs/SpecialNeedsEducation";
import DigitalLearning from "./pages/programs/DigitalLearning";
import ELibraryNigeria from "./pages/programs/ELibraryNigeria";
import InclusionAccess from "./pages/programs/InclusionAccess";

// Admin Pages
import ELibraryAdminPage from "./pages/dashboard/ELibraryAdminPage";
import DigitalBoardAdminPage from "./pages/admin/DigitalBoardAdminPage";
import EndorsementsAdminPage from "./pages/admin/EndorsementsAdminPage";
import CRSPartnersAdminPage from "./pages/admin/CRSPartnersAdminPage";
import VacanciesAdminPage from "./pages/admin/VacanciesAdminPage";
import FinanceOverview from "./pages/admin/FinanceOverview";
import BankAccounts from "./pages/admin/BankAccounts";
import Disbursements from "./pages/admin/Disbursements";

// Resources
import OrganizationalProfile from "./pages/resources/OrganizationalProfile";
import Ambassador from "./pages/get-involved/Ambassador";

// Media Pages
import EduAidWebinars from "./pages/media/EduAidWebinars";
import NesaTv from "./pages/media/NesaTv";
import NesaAwardsTv from "./pages/media/NesaAwardsTv";
import NesaAwardsPlatinum from "./pages/media/NesaAwardsPlatinum";
import NesaAwardsAfricaIcon from "./pages/media/NesaAwardsAfricaIcon";
import NesaAwardsGoldCertificate from "./pages/media/NesaAwardsGoldCertificate";
import NesaAwardsBlueGarnetGala from "./pages/media/NesaAwardsBlueGarnetGala";
import ItsInMeRadio from "./pages/media/ItsInMeRadio";
import EducationTourism from "./pages/media/EducationTourism";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Dashboard Pages
import Welcome from "./pages/dashboard/Welcome";
import ChapterInbox from "./pages/chapter/Inbox";
import Profile from "./pages/dashboard/Profile";
import Activity from "./pages/dashboard/Activity";

// Messages & Decisions Pages
import MessagesIndex from "./pages/messages/Index";
import MessagesRoom from "./pages/messages/Room";
import Decisions from "./pages/Decisions";

// NESA Award Pages
import PlatinumAward from "./pages/awards/PlatinumAward";
import IconAward from "./pages/awards/IconAward";
import GoldAward from "./pages/awards/GoldAward";
import BlueGarnetAward from "./pages/awards/BlueGarnetAward";

// Vote & Nominate Pages
import Vote from "./pages/Vote";
import Nominate from "./pages/Nominate";
import Calendar from "./pages/Calendar";

// Categories Pages
import CategoriesIndex from "./pages/categories/Index";
import CategoryDetail from "./pages/categories/CategoryDetail";
import NigeriaCategories from "./pages/categories/Nigeria";

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
              {/* Core Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Programs Routes */}
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/nesa-africa" element={<NESAAfrica />} />
              <Route path="/programs/eduaid-africa" element={<EduAidAfrica />} />
              <Route path="/programs/rebuild-my-school-africa" element={<RebuildMySchoolAfrica />} />
              <Route path="/programs/women-girls-education" element={<WomenGirlsEducation />} />
              <Route path="/programs/special-needs-education" element={<SpecialNeedsEducation />} />
              <Route path="/programs/digital-learning" element={<DigitalLearning />} />
              <Route path="/programs/elibrary-nigeria" element={<ELibraryNigeria />} />
              <Route path="/programs/inclusion-access" element={<InclusionAccess />} />
              
              {/* Chapters Routes */}
              <Route path="/local-chapters" element={<LocalChapters />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/join-online" element={<JoinOnline />} />
              <Route path="/chapters/join" element={<JoinOnline />} />
              
              {/* Media Routes */}
              <Route path="/media" element={<Media />} />
              <Route path="/media/nesa-tv" element={<NesaTv />} />
              <Route path="/media/nesa-awards-tv" element={<NesaAwardsTv />} />
              <Route path="/media/nesa-awards-tv/platinum" element={<NesaAwardsPlatinum />} />
              <Route path="/media/nesa-awards-tv/africa-icon" element={<NesaAwardsAfricaIcon />} />
              <Route path="/media/nesa-awards-tv/gold-certificate" element={<NesaAwardsGoldCertificate />} />
              <Route path="/media/nesa-awards-tv/blue-garnet-gala" element={<NesaAwardsBlueGarnetGala />} />
              <Route path="/media/its-in-me-radio" element={<ItsInMeRadio />} />
              <Route path="/media/eduaid-webinars" element={<EduAidWebinars />} />
              <Route path="/media/education-tourism-show" element={<EducationTourism />} />
              
              {/* Updates & Reports */}
              <Route path="/updates" element={<Updates />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              
              {/* NESA Award Routes */}
              <Route path="/awards/platinum" element={<PlatinumAward />} />
              <Route path="/awards/icon" element={<IconAward />} />
              <Route path="/awards/gold" element={<GoldAward />} />
              <Route path="/awards/blue-garnet" element={<BlueGarnetAward />} />
              
              {/* Vote, Nominate & Calendar Routes */}
              <Route path="/vote" element={<Vote />} />
              <Route path="/nominate" element={<Nominate />} />
              <Route path="/calendar" element={<Calendar />} />
              
              {/* Categories Routes */}
              <Route path="/categories" element={<CategoriesIndex />} />
              <Route path="/categories/nigeria" element={<NigeriaCategories />} />
              <Route path="/categories/:slug" element={<CategoryDetail />} />
              
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
              
              {/* Messages & Decisions Routes */}
              <Route path="/messages" element={<MessagesIndex />} />
              <Route path="/messages/:roomId" element={<MessagesRoom />} />
              <Route path="/decisions" element={<Decisions />} />
              
              {/* Admin Routes */}
              <Route path="/admin/digital-board" element={<DigitalBoardAdminPage />} />
              <Route path="/admin/endorsements" element={<EndorsementsAdminPage />} />
              <Route path="/admin/crs-partners" element={<CRSPartnersAdminPage />} />
              <Route path="/admin/vacancies" element={<VacanciesAdminPage />} />
              <Route path="/admin/finance/overview" element={<FinanceOverview />} />
              <Route path="/admin/finance/bank-accounts" element={<BankAccounts />} />
              <Route path="/admin/finance/disbursements" element={<Disbursements />} />
              
              {/* Get Involved Routes */}
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/get-involved/membership" element={<Membership />} />
              <Route path="/get-involved/ambassador" element={<Ambassador />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/donate" element={<Donate />} />
              
              {/* Governance & Partners */}
              <Route path="/governance" element={<Governance />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              
              {/* Divisions Routes */}
              <Route path="/divisions" element={<Divisions />} />
              <Route path="/divisions/bgeo" element={<BGEO />} />
              <Route path="/divisions/sobcd" element={<SOBCD />} />
              <Route path="/divisions/tdsd" element={<TDSD />} />
              <Route path="/divisions/ombdd" element={<OMBDD />} />
              <Route path="/divisions/santos-media" element={<SantosMedia />} />
              <Route path="/divisions/lcs" element={<LCS />} />
              
              {/* Resources & Certifications */}
              <Route path="/resources/organizational-profile" element={<OrganizationalProfile />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/vacancies" element={<Vacancies />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/help" element={<Help />} />
              
              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
