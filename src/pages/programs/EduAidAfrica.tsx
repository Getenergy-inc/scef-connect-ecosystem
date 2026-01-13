import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLocale } from "@/contexts/LocaleContext";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

// EduAid Components
import EduAidMainHero from "@/components/eduaid/EduAidMainHero";
import EduAidFeatureHero from "@/components/eduaid/EduAidFeatureHero";
import EduAidObjectives from "@/components/eduaid/EduAidObjectives";
import EduAidPrograms from "@/components/eduaid/EduAidPrograms";
import EduAidTargetGroups from "@/components/eduaid/EduAidTargetGroups";
import EduAidOngoingProjects from "@/components/eduaid/EduAidOngoingProjects";
import EduAidSmartGoals from "@/components/eduaid/EduAidSmartGoals";
import EduAidEngagement from "@/components/eduaid/EduAidEngagement";
import EduAidLocalChapters from "@/components/eduaid/EduAidLocalChapters";
import EduAidPartners from "@/components/eduaid/EduAidPartners";
import EduAidWallOfAchievers from "@/components/eduaid/EduAidWallOfAchievers";
import EduAidGetInTouch from "@/components/eduaid/EduAidGetInTouch";
import EduAidFAQs from "@/components/eduaid/EduAidFAQs";
import EduAidDonationSection from "@/components/eduaid/EduAidDonationSection";

export default function EduAidAfrica() {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>EduAid Africa — Empowering Education Across Africa | SCEF</title>
        <meta name="description" content="EduAid Africa provides scholarships, school renovations, teacher training, and educational support to transform lives and communities across Africa." />
        <meta property="og:title" content="EduAid Africa — Empowering Education Across Africa" />
        <meta property="og:description" content="Join us in transforming the educational landscape through scholarships, donations, CSR initiatives, and community projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="EduAid Africa, scholarships, African education, SCEF, student funding, teacher training, school renovation" />
      </Helmet>

      <Header />

      <main className="relative overflow-hidden">
        {/* Main Hero Section - No animation, loads immediately */}
        <EduAidMainHero
          welcomeText={t('eduaid.hero.welcome') || "Welcome to EduAid Africa"}
          title={t('eduaid.hero.title') || "Empowering Education, Enabling Futures Across Africa."}
          description={t('eduaid.hero.description') || "Join us in transforming the educational landscape through scholarships, donations, CSR initiatives, community projects, and global education expos."}
          stats={[
            { value: "—", label: t('eduaid.hero.stat1.label') || "Verified reporting in progress" },
            { value: "—", label: t('eduaid.hero.stat2.label') || "Verified reporting in progress" },
            { value: "—", label: t('eduaid.hero.stat3.label') || "Verified reporting in progress" },
          ]}
          primaryButtonText={t('eduaid.hero.primaryCta') || "Start a Fundraiser"}
          primaryButtonLink="/donate"
          secondaryButtonText={t('eduaid.hero.secondaryCta') || "Donate Now"}
          secondaryButtonLink="/donate"
        />

        {/* Vision & Objectives for 2032 */}
        <ScrollAnimation animation="fadeUp" delay={0.1}>
          <EduAidFeatureHero
            title={t('eduaid.vision.title') || "Vision & Objectives for 2032"}
            description={t('eduaid.vision.description') || "We envision to achieve these SMART goals by 2032"}
            features={[
              {
                title: t('eduaid.vision.goal1.title') || "To empower 10 Million Students",
                description: t('eduaid.vision.goal1.desc') || "through scholarships, e-learning, and vocational training",
                stats: { current: t('eduaid.reporting') || "Verified reporting in progress", percentage: "—" }
              },
              {
                title: t('eduaid.vision.goal2.title') || "To Renovate or Build 10,000 Schools",
                description: t('eduaid.vision.goal2.desc') || "across the African continent",
                stats: { percentage: "—" }
              },
              {
                title: t('eduaid.vision.goal3.title') || "To Train 500,000 Teachers in ICT",
                description: t('eduaid.vision.goal3.desc') || "and modern teaching methodologies",
                stats: { current: t('eduaid.reporting') || "Verified reporting in progress", percentage: "—" }
              },
            ]}
          />
        </ScrollAnimation>

        {/* Core Objectives */}
        <ScrollAnimation animation="fadeUp" delay={0.15}>
          <EduAidObjectives />
        </ScrollAnimation>

        {/* Programs & Initiatives */}
        <ScrollAnimation animation="scale" delay={0.1}>
          <EduAidPrograms />
        </ScrollAnimation>

        {/* Target Beneficiaries */}
        <ScrollAnimation animation="fadeUp" delay={0.1}>
          <EduAidTargetGroups />
        </ScrollAnimation>

        {/* Ongoing Projects */}
        <ScrollAnimation animation="fadeRight" delay={0.15}>
          <EduAidOngoingProjects />
        </ScrollAnimation>

        {/* SMART Goals 2032 */}
        <ScrollAnimation animation="fadeUp" delay={0.1}>
          <EduAidSmartGoals />
        </ScrollAnimation>

        {/* Engagement & Partnerships */}
        <ScrollAnimation animation="scale" delay={0.15}>
          <EduAidEngagement />
        </ScrollAnimation>

        {/* Local Chapters */}
        <ScrollAnimation animation="fadeLeft" delay={0.1}>
          <EduAidLocalChapters />
        </ScrollAnimation>

        {/* Strategic Partners */}
        <ScrollAnimation animation="fadeUp" delay={0.15}>
          <EduAidPartners />
        </ScrollAnimation>

        {/* Wall of Achievers / Success Stories */}
        <ScrollAnimation animation="blur" delay={0.1}>
          <EduAidWallOfAchievers />
        </ScrollAnimation>

        {/* Contact / Get In Touch */}
        <ScrollAnimation animation="fadeUp" delay={0.15}>
          <EduAidGetInTouch />
        </ScrollAnimation>

        {/* FAQs */}
        <ScrollAnimation animation="fadeUp" delay={0.1}>
          <EduAidFAQs />
        </ScrollAnimation>

        {/* Final Donation CTA */}
        <ScrollAnimation animation="scale" delay={0.15}>
          <EduAidDonationSection />
        </ScrollAnimation>
      </main>

      <Footer />
    </>
  );
}
