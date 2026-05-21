import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { MyCareerMyLife } from "@/components/sections/MyCareerMyLife";
import { EduAidWebinarCalendar } from "@/components/sections/EduAidWebinarCalendar";
import { MCMLMedia } from "@/components/sections/MCMLMedia";
import { myCareerMyLifeCalendar } from "@/config/trainingCalendar";

const MyCareerMyLifePage = () => {
  return (
    <>
      <Helmet>
        <title>My Career My Life — SCEF Career Guidance for African Students</title>
        <meta
          name="description"
          content="Career guidance and life-path advocacy for JSS and SS2/SS3 students. Register your school, request a session, adopt a school, or volunteer."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/my-career-my-life" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        {/* Hero */}
        <section className="relative overflow-hidden bg-scef-blue-darker py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-scef-pattern opacity-[0.06]" />
          <div className="container relative mx-auto max-w-4xl px-6 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
              Student Advocacy · Starts August 2026
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              My Career My Life
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              SCEF&apos;s career guidance program for Junior Secondary and SS2/SS3
              students — covering subject choices, vocational pathways, digital
              skills, entrepreneurship, and life planning.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="#register-school"
                className="inline-flex h-12 items-center rounded-md bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
              >
                Register Your School
              </Link>
              <Link
                to="/get-involved/volunteer"
                className="inline-flex h-12 items-center rounded-md border border-white/40 px-7 font-semibold text-white hover:bg-white/10"
              >
                Volunteer for MCML
              </Link>
            </div>
          </div>
        </section>

        <main id="register-school">
          <MyCareerMyLife />
          <EduAidWebinarCalendar
            rows={myCareerMyLifeCalendar}
            eyebrow="Starts August 2026"
            title="My Career My Life Monthly Advocacy Calendar"
            subtitle="A 12-month advocacy and career-guidance calendar reaching JSS, SS2 and SS3 students across schools, chapters and partner networks."
          />
          <MCMLMedia />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MyCareerMyLifePage;
