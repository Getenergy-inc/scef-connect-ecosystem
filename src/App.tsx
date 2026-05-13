import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteIndicator from "@/components/dev/RouteIndicator";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { HelmetProvider } from "react-helmet-async";

// Core Pages
import Index from "./pages/Index";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
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
import SupportUs from "./pages/SupportUs";
import Join from "./pages/Join";
import Membership from "./pages/Membership";
import Governance from "./pages/Governance";
import Certifications from "./pages/Certifications";
import Partners from "./pages/Partners";
import Divisions from "./pages/Divisions";
import Updates from "./pages/Updates";
import Reports from "./pages/Reports";
import CaseStudies from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import Vacancies from "./pages/Vacancies";
import PartnerWithUs from "./pages/PartnerWithUs";
import CsrFundManagement from "./pages/CsrFundManagement";
import CsrFundingIntake from "./pages/CsrFundingIntake";
import FundingFunnel from "./pages/admin/FundingFunnel";
import EduAidScholarship2026 from "./pages/scholarship/EduAidScholarship2026";
import ScholarshipApply from "./pages/scholarship/Apply";
import ScholarshipMyApplication from "./pages/scholarship/MyApplication";
import ScholarshipExamRegister from "./pages/scholarship/ExamRegister";
import ScholarshipExamRunner from "./pages/scholarship/ExamRunner";
import ScholarshipExamResult from "./pages/scholarship/ExamResult";

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
import NesaMasterTimeline from "./pages/programs/NesaMasterTimeline";
import NesaTimeline2026 from "./pages/programs/NesaTimeline2026";
import EduAidAfrica from "./pages/programs/EduAidAfrica";
import EduAidMasterTimeline from "./pages/programs/EduAidMasterTimeline";
import RebuildMySchoolAfrica from "./pages/programs/RebuildMySchoolAfrica";
import WomenGirlsEducation from "./pages/programs/WomenGirlsEducation";
import SpecialNeedsEducation from "./pages/programs/SpecialNeedsEducation";
import DigitalLearning from "./pages/programs/DigitalLearning";
import ELibraryNigeria from "./pages/programs/ELibraryNigeria";
import InclusionAccess from "./pages/programs/InclusionAccess";
import TrainingDevelopment from "./pages/programs/TrainingDevelopment";
import MyCareerMyLifePage from "./pages/programs/MyCareerMyLife";
import MonthlyProgramPage from "./pages/calendar/MonthlyProgram";

// Admin Pages
import ELibraryAdminPage from "./pages/dashboard/ELibraryAdminPage";
import DigitalBoardAdminPage from "./pages/admin/DigitalBoardAdminPage";
import EndorsementsAdminPage from "./pages/admin/EndorsementsAdminPage";
import CRSPartnersAdminPage from "./pages/admin/CRSPartnersAdminPage";
import VacanciesAdminPage from "./pages/admin/VacanciesAdminPage";
import FinanceOverview from "./pages/admin/FinanceOverview";
import BankAccounts from "./pages/admin/BankAccounts";
import Disbursements from "./pages/admin/Disbursements";
import StaffApprovals from "./pages/admin/StaffApprovals";

// Resources
import OrganizationalProfile from "./pages/resources/OrganizationalProfile";
import Ambassador from "./pages/get-involved/Ambassador";
import NRC from "./pages/get-involved/NRC";
import Judge from "./pages/get-involved/Judge";
import Volunteer from "./pages/get-involved/Volunteer";

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
import DashboardWelcome from "./pages/dashboard/Welcome";
import ChapterInbox from "./pages/chapter/Inbox";
import Profile from "./pages/dashboard/Profile";
import Activity from "./pages/dashboard/Activity";
import SettingsPage from "./pages/dashboard/Settings";

// Messages & Decisions Pages
import MessagesIndex from "./pages/messages/Index";
import MessagesRoom from "./pages/messages/Room";
import Decisions from "./pages/Decisions";

// Portal Pages
import JuryPortal from "./pages/portal/Jury";
import NRCPortal from "./pages/portal/NRCPortal";
import AmbassadorPortal from "./pages/portal/AmbassadorPortal";
import ChapterAdminPortal from "./pages/portal/ChapterAdmin";
import SponsorPortal from "./pages/portal/Sponsor";
import AdminIndex from "./pages/admin/Index";
import ScholarshipExamsAdmin from "./pages/admin/ScholarshipExamsAdmin";
import ScholarshipExamQuestionsAdmin from "./pages/admin/ScholarshipExamQuestionsAdmin";

// NESA Award Pages
import PlatinumAward from "./pages/awards/PlatinumAward";
import IconAward from "./pages/awards/IconAward";
import GoldAward from "./pages/awards/GoldAward";
import BlueGarnetAward from "./pages/awards/BlueGarnetAward";
import Awards from "./pages/Awards";
import StartChapter from "./pages/chapters/StartChapter";

// Staff Office
import StaffDashboard from "./pages/staff/Index";
import StaffTasks from "./pages/staff/Tasks";
import StaffWeekly from "./pages/staff/Weekly";
import StaffMonthly from "./pages/staff/Monthly";
import StaffReports from "./pages/staff/Reports";
import StaffAI from "./pages/staff/AI";
import StaffReview from "./pages/staff/Review";

// Vote & Nominate Pages
import Vote from "./pages/Vote";
import Nominate from "./pages/Nominate";
import Calendar from "./pages/Calendar";

// Categories Pages
import CategoriesIndex from "./pages/categories/Index";
import CategoryDetail from "./pages/categories/CategoryDetail";
import NigeriaCategories from "./pages/categories/Nigeria";

// Contributors (formerly Hall of Fame)
import HallOfFame from "./pages/HallOfFame";
import HallOfFameProfile from "./pages/HallOfFameProfile";
import HallOfFameSubmit from "./pages/HallOfFameSubmit";
import HallOfFameAdmin from "./pages/admin/HallOfFameAdmin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminReceipts from "./pages/admin/AdminReceipts";
import AdminChapters from "./pages/admin/AdminChapters";
import AdminContributors from "./pages/admin/AdminContributors";
import AdminSchoolNominations from "./pages/admin/AdminSchoolNominations";
import AdminCsrPartners from "./pages/admin/AdminCsrPartners";
import AdminReports from "./pages/admin/AdminReports";
import VerifyCertificate from "./pages/VerifyCertificate";

// School WASH
import SchoolWash from "./pages/programs/SchoolWash";

// Coming Soon stub for new pages in the 2026–2037 work plan
import ComingSoon from "./pages/ComingSoon";

// Phase 3 pages
import Vision2037 from "./pages/about/Vision2037";
import History from "./pages/about/History";
import SendAChildToSchool from "./pages/programs/SendAChildToSchool";
import MonthlyAdvocacy from "./pages/advocacy/MonthlyAdvocacy";
import Volunteers from "./pages/Volunteers";
import MediaArchive from "./pages/media/MediaArchive";
import MediaSubmit from "./pages/media/MediaSubmit";
import MyMediaSubmissions from "./pages/media/MyMediaSubmissions";
import AdminMediaSubmissions from "./pages/admin/AdminMediaSubmissions";
import MasterTimelinesAdminPage from "./pages/admin/MasterTimelinesAdminPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteIndicator />
            <Routes>
              {/* Core Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/welcome-classic" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Programs Routes */}
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/nesa-africa" element={<NESAAfrica />} />
              <Route path="/programs/nesa-africa/master-timeline" element={<NesaMasterTimeline />} />
              <Route path="/nesa-africa/master-timeline" element={<NesaMasterTimeline />} />
              <Route path="/programs/eduaid-africa" element={<EduAidAfrica />} />
              <Route path="/programs/eduaid-africa/master-timeline" element={<EduAidMasterTimeline />} />
              <Route path="/eduaid-africa/master-timeline" element={<EduAidMasterTimeline />} />
              <Route path="/programs/rebuild-my-school-africa" element={<RebuildMySchoolAfrica />} />
              <Route path="/programs/women-girls-education" element={<WomenGirlsEducation />} />
              <Route path="/programs/special-needs-education" element={<SpecialNeedsEducation />} />
              <Route path="/programs/digital-learning" element={<DigitalLearning />} />
              <Route path="/programs/elibrary-nigeria" element={<ELibraryNigeria />} />
              <Route path="/programs/inclusion-access" element={<InclusionAccess />} />
              <Route path="/programs/training-development" element={<TrainingDevelopment />} />
              <Route path="/programs/my-career-my-life" element={<MyCareerMyLifePage />} />
              <Route path="/programs/school-wash" element={<SchoolWash />} />

              {/* Monthly Advocacy & Training Calendar */}
              <Route path="/calendar/:slug" element={<MonthlyProgramPage />} />
              
              {/* Chapters Routes */}
              <Route path="/local-chapters" element={<LocalChapters />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/join-online" element={<JoinOnline />} />
              <Route path="/chapters/join" element={<JoinOnline />} />
              <Route path="/chapters/start" element={<StartChapter />} />
              
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
              <Route path="/awards" element={<Awards />} />
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

              {/* Contributors (formerly Hall of Fame) */}
              <Route path="/contributors" element={<HallOfFame />} />
              <Route path="/contributors/submit" element={<HallOfFameSubmit />} />
              <Route path="/contributors/:slug" element={<HallOfFameProfile />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
              {/* Legacy redirects (keep mounted under old paths so external links don't break) */}
              <Route path="/hall-of-fame" element={<HallOfFame />} />
              <Route path="/hall-of-fame/submit" element={<HallOfFameSubmit />} />
              <Route path="/hall-of-fame/:slug" element={<HallOfFameProfile />} />
              <Route path="/admin/hall-of-fame" element={<HallOfFameAdmin />} />
              <Route path="/admin/contributors" element={<AdminContributors />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/donations" element={<AdminDonations />} />
              <Route path="/admin/receipts" element={<AdminReceipts />} />
              <Route path="/admin/chapters" element={<AdminChapters />} />
              <Route path="/admin/school-nominations" element={<AdminSchoolNominations />} />
              <Route path="/admin/csr" element={<AdminCsrPartners />} />
              <Route path="/admin/reports" element={<AdminReports />} />

              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/welcome" element={<DashboardWelcome />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/activity" element={<Activity />} />
              <Route path="/dashboard/elibrary" element={<ELibraryAdminPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
              
              {/* Chapter Routes */}
              <Route path="/chapter/inbox" element={<ChapterInbox />} />
              
              {/* Messages & Decisions Routes */}
              <Route path="/messages" element={<MessagesIndex />} />
              <Route path="/messages/:roomId" element={<MessagesRoom />} />
              <Route path="/decisions" element={<Decisions />} />
              
              {/* Portal Routes (Role-based) */}
              <Route path="/portal/jury" element={<JuryPortal />} />
              <Route path="/portal/nrc" element={<NRCPortal />} />
              <Route path="/portal/ambassador" element={<AmbassadorPortal />} />
              <Route path="/portal/chapter-admin" element={<ChapterAdminPortal />} />
              <Route path="/portal/sponsor" element={<SponsorPortal />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminIndex />} />
              <Route path="/admin/digital-board" element={<DigitalBoardAdminPage />} />
              <Route path="/admin/endorsements" element={<EndorsementsAdminPage />} />
              <Route path="/admin/crs-partners" element={<CRSPartnersAdminPage />} />
              <Route path="/admin/vacancies" element={<VacanciesAdminPage />} />
              <Route path="/admin/finance/overview" element={<FinanceOverview />} />
              <Route path="/admin/finance/bank-accounts" element={<BankAccounts />} />
              <Route path="/admin/finance/disbursements" element={<Disbursements />} />
              <Route path="/admin/csr-funding-funnel" element={<FundingFunnel />} />
              <Route path="/admin/staff-approvals" element={<StaffApprovals />} />
              <Route path="/admin/scholarship/exams" element={<ScholarshipExamsAdmin />} />
              <Route path="/admin/scholarship/exams/:examId/questions" element={<ScholarshipExamQuestionsAdmin />} />
              <Route path="/admin/media-submissions" element={<AdminMediaSubmissions />} />
              <Route path="/admin/master-timelines" element={<MasterTimelinesAdminPage />} />
              
              {/* Get Involved Routes */}
              <Route path="/join" element={<Join />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/get-involved/membership" element={<Membership />} />
              <Route path="/get-involved/ambassador" element={<Ambassador />} />
              <Route path="/get-involved/nrc" element={<NRC />} />
              <Route path="/get-involved/judge" element={<Judge />} />
              <Route path="/get-involved/volunteer" element={<Volunteer />} />
              <Route path="/get-involved/join-chapter" element={<JoinOnline />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/ambassador" element={<Ambassador />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/donate" element={<Donate />} />
              <Route path="/support-us" element={<SupportUs />} />
              <Route path="/donate-and-payments" element={<SupportUs />} />
              <Route path="/get-involved/support" element={<SupportUs />} />

              {/* Scholarship */}
              <Route path="/scholarship/eduaid-2026" element={<EduAidScholarship2026 />} />
              <Route path="/scholarship/apply" element={<ScholarshipApply />} />
              <Route path="/scholarship/my-application" element={<ScholarshipMyApplication />} />
              <Route path="/scholarship/exam" element={<ScholarshipExamRegister />} />
              <Route path="/scholarship/exam/:attemptId" element={<ScholarshipExamRunner />} />
              <Route path="/scholarship/exam/:attemptId/result" element={<ScholarshipExamResult />} />
              
              {/* Governance & Partners */}
              <Route path="/governance" element={<Governance />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/csr-fund-management" element={<CsrFundManagement />} />
              <Route path="/csr-funding-intake" element={<CsrFundingIntake />} />
              
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
              <Route path="/sitemap" element={<Sitemap />} />
              
              {/* Staff Office Routes */}
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/tasks" element={<StaffTasks />} />
              <Route path="/staff/weekly" element={<StaffWeekly />} />
              <Route path="/staff/monthly" element={<StaffMonthly />} />
              <Route path="/staff/reports" element={<StaffReports />} />
              <Route path="/staff/ai" element={<StaffAI />} />
              <Route path="/staff/review" element={<StaffReview />} />

              {/* New IA placeholder routes (2026–2037 work plan) */}
              <Route path="/about/vision-2037" element={<Vision2037 />} />
              <Route path="/about/history" element={<History />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/programs/send-a-child-to-school" element={<SendAChildToSchool />} />
              <Route path="/advocacy" element={<ComingSoon title="Advocacy & Training" description="SCEF's monthly advocacy, training and capacity-building programs across Africa." />} />
              <Route path="/advocacy/monthly" element={<MonthlyAdvocacy />} />
              <Route path="/advocacy/walks" element={<ComingSoon title="Advocacy Walks" description="Community mobilisation walks for education, health and inclusion." />} />
              <Route path="/advocacy/school-leadership" element={<ComingSoon title="School Leadership Training" description="Leadership development for school heads, principals and administrators." />} />
              <Route path="/advocacy/teacher-wellbeing" element={<ComingSoon title="Teacher Wellbeing & Mental Health" description="Care, supervision and mental-health support for African educators." />} />
              <Route path="/advocacy/health-education" element={<ComingSoon title="Health Education Advocacy" description="Schools as health hubs — adolescent health, hygiene, mental health." />} />
              <Route path="/advocacy/esg" element={<ComingSoon title="ESG & Environmental Education" description="Sustainability, climate literacy and green schools across Africa." />} />
              <Route path="/get-involved/internships" element={<ComingSoon title="Internship Opportunities" description="Structured internships across SCEF programs, divisions and chapters." />} />
              <Route path="/get-involved/referral-rewards" element={<ComingSoon title="Referral & Rewards" description="Grow the SCEF network — earn recognition and member benefits." />} />
              <Route path="/support-us/bid-to-host" element={<ComingSoon title="Bid to Host Next Event" description="Host an SCEF gala, summit or training week in your city or country." />} />
              <Route path="/support-us/bank-accounts" element={<ComingSoon title="Official Bank Accounts" description="Verified SCEF payment channels for donations, sponsorships and fees." />} />
              <Route path="/support-us/merchandise" element={<ComingSoon title="Buy Merchandise" description="Branded SCEF apparel and education-positive merchandise." />} />
              <Route path="/support-us/gala-tickets" element={<ComingSoon title="Award Gala Tickets" description="Reserve your seat at the next NESA-Africa awards gala." />} />
              <Route path="/media/archive" element={<MediaArchive />} />
              <Route path="/media/gallery" element={<MediaArchive />} />
              <Route path="/media/submit" element={<MediaSubmit />} />
              <Route path="/media/my-submissions" element={<MyMediaSubmissions />} />

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
