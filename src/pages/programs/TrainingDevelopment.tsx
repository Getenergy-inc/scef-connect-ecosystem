import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { EduAidWebinarCalendar } from "@/components/sections/EduAidWebinarCalendar";
import { SchoolRegistration } from "@/components/sections/SchoolRegistration";

const TrainingDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Training, Development & Career Pathways — SCEF</title>
        <meta
          name="description"
          content="EduAid-Africa monthly training calendar for teachers, school leaders, NGOs and chapter leaders. Register your school, sponsor a training, or attend a webinar."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/training-development" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        {/* Hero */}
        <section className="relative overflow-hidden bg-scef-blue-darker py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-scef-pattern opacity-[0.06]" />
          <div className="container relative mx-auto max-w-4xl px-6 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
              Capacity Building · Starts July 2026
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Training, Development & Career Pathways
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Structured monthly training and capacity development for teachers,
              school leaders, students, volunteers and education stakeholders —
              powered by EduAid-Africa, Education Online Africa, and the GFA Wallet.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="#register"
                className="inline-flex h-12 items-center rounded-md bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
              >
                Register for a Webinar
              </Link>
              <Link
                to="/partner-with-us"
                className="inline-flex h-12 items-center rounded-md border border-white/40 px-7 font-semibold text-white hover:bg-white/10"
              >
                Sponsor a Training
              </Link>
            </div>
          </div>
        </section>

        <main id="register">
          <EduAidWebinarCalendar />
          <SchoolRegistration />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TrainingDevelopment;
