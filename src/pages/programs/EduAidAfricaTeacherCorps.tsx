import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Globe2, ShieldCheck, Heart, Laptop, Briefcase, BookOpen, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/PageShell";

const tracks = [
  {
    icon: BookOpen,
    title: "1. Classroom Volunteer Support",
    body: "Literacy, numeracy, science, languages, reading clubs, remedial learning, homework support and holiday classes.",
  },
  {
    icon: GraduationCap,
    title: "2. Teacher Training and School Support",
    body: "Lesson planning, classroom management, low-cost teaching aids, gender-responsive teaching, inclusive classroom methods, digital teaching tools and school improvement.",
  },
  {
    icon: Heart,
    title: "3. Girls' Education Mentorship",
    body: "Confidence building, leadership circles, career guidance, STEM/TVET exposure, school retention motivation and life skills.",
  },
  {
    icon: HandHeart,
    title: "4. Special Needs Volunteer Trainer Service",
    body: "Support for special needs teachers, caregivers, handlers, inclusive education teachers, classroom assistants and school counsellors.",
  },
  {
    icon: ShieldCheck,
    title: "5. Safeguarding and Counselling Support",
    body: "Child protection awareness, safe reporting, anti-bullying, learner wellbeing, online safety, referral awareness and teacher conduct. Note: Counselling-related work must be supervised and age-appropriate. Volunteers must not conduct private unsupervised counselling sessions with minors.",
  },
  {
    icon: Briefcase,
    title: "6. My Career My Life Services",
    body: "Career talks, life skills, subject-choice guidance, school-to-work transition support, entrepreneurship awareness, TVET pathways, digital career clubs and online career mentorship.",
  },
  {
    icon: Laptop,
    title: "7. Digital Learning and Online Impact",
    body: "Virtual teaching, online tutoring, reading clubs, STEM clubs, coding clubs, teacher webinars, recorded lessons and digital resource development.",
  },
  {
    icon: Globe2,
    title: "8. Crisis and Displacement Education Support",
    body: "Support through approved humanitarian, government or education partners working with IDP, refugee, emergency-affected or conflict-affected learning spaces. Note: EduAid Africa does not operate independently inside IDP or refugee settings — all crisis and displacement education support must be delivered through approved partners.",
  },
];

const whoCanJoin = [
  "Africans living in Africa",
  "Africans in the diaspora",
  "Friends of Africa worldwide",
  "Professional teachers",
  "Retired teachers",
  "Student teachers",
  "Non-teachers willing to train",
  "Career mentors",
  "Special needs education professionals",
  "Safeguarding experts",
  "Counsellors and psychosocial support professionals",
  "Digital learning experts",
  "STEM professionals",
  "University students and graduates",
  "CSR and corporate volunteers",
  "NGO and community education workers",
  "Faith / community education volunteers",
];

const journey = [
  ["Apply", "Complete the EduAid Africa Teacher Corps form."],
  ["Select Service Area", "Choose physical service, online service, career mentorship, special needs support, safeguarding, digital learning or edu-tourism missions."],
  ["Complete Training", "Non-teachers complete the compulsory EduAid Africa Online Teaching Training Programme."],
  ["Get Verified", "Identity review, reference check, safeguarding declaration and code of conduct agreement."],
  ["Receive Approval Status", "Approved, conditional, online-only, specialist or not yet approved."],
  ["Get Matched", "Matched to approved online or physical opportunities."],
  ["Report Impact", "Submit activity reports after service."],
];

const verification = [
  "Identity verification",
  "CV or professional profile review",
  "Reference check",
  "Interview or screening call",
  "Safeguarding declaration",
  "Code of conduct agreement",
  "Police / background check where required",
  "Specialist credentials where applicable",
];

const safeguardingRules = [
  "Avoid unsupervised one-on-one contact with minors",
  "Use approved communication channels only",
  "Respect learner privacy and dignity",
  "Avoid sharing photos or videos without consent",
  "Follow school and partner rules",
  "Report concerns through approved channels",
  "Respect disability inclusion and cultural sensitivity",
  "Serve only in approved assignments",
];

const fees: Array<[string, string]> = [
  ["African Teacher Volunteer", "USD 10"],
  ["Africa-Based Non-Teacher Volunteer", "USD 15"],
  ["Special Needs Volunteer Trainer", "Free or USD 10"],
  ["Online Impact Volunteer", "USD 10"],
  ["My Career My Life Mentor", "USD 15"],
  ["African Diaspora Volunteer", "USD 25"],
  ["Friends of Africa International Volunteer", "USD 30"],
  ["Edu-Tourism Mission Volunteer", "USD 60"],
  ["CSR / Corporate Volunteer", "USD 50–100"],
  ["Volunteer Leadership Applicant", "USD 40"],
];

const packages = [
  {
    title: "Online Volunteer Impact Service",
    body: "For remote volunteers supporting virtual teaching, online mentoring, teacher webinars, career talks and digital learning.",
  },
  {
    title: "School Support Mission",
    body: "For physical volunteers supporting approved schools through teaching, mentoring, safeguarding awareness and school exchange activities.",
  },
  {
    title: "Special Needs Teacher Training Mission",
    body: "For specialists supporting inclusive education, special needs teacher training, caregiver support and handler training.",
  },
  {
    title: "My Career My Life School Programme",
    body: "For schools and youth groups receiving career talks, life skills sessions, mentorship, school career clubs and digital career resources.",
  },
  {
    title: "Edu-Tourism Volunteer Mission",
    body: "For volunteers joining regional education travel programmes that combine school exchange, volunteer service, cultural learning, tourism and impact reporting.",
  },
];

const partnerCategories = [
  "Technical partners",
  "Technology partners",
  "Funding partners",
  "Institutional partners",
  "CSR partners",
  "Schools and universities",
  "Diaspora organisations",
  "Humanitarian and development partners",
];

const partnerSupport = [
  "Online training",
  "Teacher grants",
  "Volunteer deployment",
  "Digital learning tools",
  "Safeguarding training",
  "Special needs teacher training",
  "My Career My Life Services",
  "Edu-tourism volunteer missions",
];

const impactIndicators = [
  "Number of volunteers registered",
  "Number of volunteers trained",
  "Number of volunteers verified",
  "Number of volunteers posted",
  "Number of online sessions delivered",
  "Number of schools supported",
  "Number of teachers trained",
  "Number of learners reached",
  "Number of girls mentored",
  "Number of career talks delivered",
  "Number of special needs teachers supported",
  "Number of volunteer hours delivered",
  "Number of partner organisations",
  "Number of countries covered",
];

const Section = ({ kicker, title, children }: { kicker?: string; title: string; children: React.ReactNode }) => (
  <section className="container mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-16 border-t border-border">
    {kicker && (
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-2">{kicker}</p>
    )}
    <h2 className="font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker mb-6">
      {title}
    </h2>
    {children}
  </section>
);

export const EduAidAfricaTeacherCorps = () => {
  return (
    <PageShell
      title="EduAid Africa Teacher Corps"
      description="Volunteer Teachers for Education for All in Africa — a continental volunteer movement mobilising teachers, mentors, special needs experts, digital volunteers, diaspora professionals and friends of Africa."
      eyebrow="EduAid Africa · Volunteer Movement"
      heading="EduAid Africa Teacher Corps"
      intro="Volunteer Teachers for Education for All in Africa. Join a continental volunteer movement supporting schools, teachers and learners across Africa through safe, verified and structured physical and online education service."
    >
      {/* Hero CTAs */}
      <section className="container mx-auto max-w-6xl px-6 md:px-8 py-10">
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/get-involved/volunteer">Apply to Volunteer</Link></Button>
          <Button asChild size="lg" variant="secondary"><Link to="/get-involved/volunteer?track=online">Join Online Impact Service</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/partner-with-us">Partner With Us</Link></Button>
        </div>
        <p className="mt-4 text-sm font-semibold text-scef-gold uppercase tracking-wider">Serve. Teach. Mentor. Transform Africa.</p>
      </section>

      {/* About */}
      <Section kicker="About the Programme" title="A structured volunteer teacher and education support service">
        <div className="prose prose-slate max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          <p>
            EduAid Africa Teacher Corps is a structured volunteer teacher and education support
            service created by EduAid Africa to support Education for All in Africa.
          </p>
          <p>
            The programme connects qualified teachers, trained volunteers, career mentors, special
            needs experts, counsellors, digital learning professionals, diaspora professionals and
            friends of Africa with schools, communities and education programmes across the
            continent.
          </p>
          <p>It operates through two major service models:</p>
          <ul>
            <li>Real-Time / Physical Volunteer Service</li>
            <li>Online Impact Service</li>
          </ul>
        </div>
      </Section>

      {/* Service Tracks */}
      <Section kicker="What We Do" title="Service Tracks">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-[16px] font-bold text-scef-blue-darker leading-tight">{t.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Who Can Join */}
      <Section kicker="Who Can Join" title="EduAid Africa Teacher Corps accepts volunteers from:">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-[14px] text-muted-foreground">
          {whoCanJoin.map((w) => (
            <li key={w} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
              {w}
            </li>
          ))}
        </ul>
      </Section>

      {/* Volunteer Journey */}
      <Section kicker="Volunteer Journey" title="From application to impact">
        <ol className="space-y-4 max-w-3xl">
          {journey.map(([step, body], i) => (
            <li key={step} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-scef-blue-darker text-white font-bold text-sm">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display font-bold text-scef-blue-darker">{step}</h3>
                <p className="text-[14px] text-muted-foreground mt-1">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Training & Verification */}
      <Section kicker="Training & Verification" title="Trained, verified, approved — then posted">
        <div className="max-w-3xl space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            Applicants without teaching experience may still apply, but they must complete the
            compulsory EduAid Africa Online Teaching Training Programme before being considered for
            service. Training is free after submission of the volunteer form. Only trained,
            verified and approved volunteers will be posted.
          </p>
          <p className="font-semibold text-scef-blue-darker">Verification may include:</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {verification.map((v) => (
              <li key={v} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Safeguarding */}
      <Section kicker="Safeguarding Commitment" title="Learner safety first">
        <div className="max-w-3xl space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            EduAid Africa Teacher Corps places learner safety first. All volunteers must complete
            safeguarding orientation and follow strict rules.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {safeguardingRules.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Form Fees */}
      <Section kicker="Volunteer Form Fees" title="Application fees by volunteer category">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-[14px]">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-scef-blue-darker">Volunteer Category</th>
                <th className="px-4 py-3 font-semibold text-scef-blue-darker">Form Fee</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(([cat, fee]) => (
                <tr key={cat} className="border-t border-border">
                  <td className="px-4 py-3 text-muted-foreground">{cat}</td>
                  <td className="px-4 py-3 font-semibold text-scef-blue-darker">{fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] text-muted-foreground max-w-3xl">
          Payment of a form fee does not guarantee volunteer posting. All volunteers must complete
          the required training, safeguarding orientation, verification and assessment process.
          Only trained, verified and approved volunteers will be posted for online or real-time
          service.
        </p>
      </Section>

      {/* Service Packages */}
      <Section kicker="Service Packages" title="Five ways volunteers serve">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-display text-[16px] font-bold text-scef-blue-darker">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partner */}
      <Section kicker="Partner With Teacher Corps" title="Support EduAid Africa Teacher Corps">
        <div className="max-w-3xl space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            EduAid Africa invites technical, technology, institutional, funding, CSR and
            development partners to support EduAid Africa Teacher Corps.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-scef-blue-darker mb-2">Partner categories</h3>
              <ul className="space-y-1">
                {partnerCategories.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />{c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-scef-blue-darker mb-2">Partners may support</h3>
              <ul className="space-y-1">
                {partnerSupport.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Button asChild className="mt-2"><Link to="/partner-with-us">Partner With Teacher Corps</Link></Button>
        </div>
      </Section>

      {/* Impact Indicators */}
      <Section kicker="What We Track" title="Impact indicators">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-[14px] text-muted-foreground">
          {impactIndicators.map((i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />{i}
            </li>
          ))}
        </ul>
      </Section>

      {/* Final CTA */}
      <section className="bg-scef-pattern border-t border-border">
        <div className="container mx-auto max-w-5xl px-6 md:px-8 py-14 md:py-20 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker">
            Lend Your Skills. Use Your Voice. Help Achieve Education for All in Africa.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Africa's education future needs people who are willing to teach, mentor, guide,
            advocate, volunteer, sponsor and speak up for every learner. Join EduAid Africa
            Teacher Corps and help transform learning across Africa.
          </p>
          <p className="mt-4 text-sm font-semibold text-scef-gold uppercase tracking-wider">
            Serve. Teach. Mentor. Transform Africa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/get-involved/volunteer">Apply to Volunteer</Link></Button>
            <Button asChild size="lg" variant="secondary"><Link to="/get-involved/volunteer?track=online">Join Online Impact Service</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/get-involved/volunteer?track=career-mentor">Become a Career Mentor</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/partner-with-us">Partner With Us</Link></Button>
          </div>
        </div>
      </section>

      {/* Santos Creations CTA */}
      <section className="container mx-auto max-w-5xl px-6 md:px-8 py-14 md:py-20 border-t border-border">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Santos Creations</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-scef-blue-darker">
          Create Impact Beyond Imagination
        </h2>
        <div className="mt-4 max-w-3xl space-y-3 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            Santos Creations invites creatives, professionals, educators, mentors, partners and
            friends of Africa to use their skills, platforms and voices to promote Education for
            All in Africa.
          </p>
          <p>
            Through EduAid Africa initiatives, your creativity, expertise, network and influence
            can help support teacher training, career mentorship, girls' education, safeguarding,
            inclusive education, digital learning and volunteer service.
          </p>
          <p className="font-medium text-scef-blue-darker">
            Your voice can inspire. Your skills can empower. Your support can change lives.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link to="/partner-with-us">Partner With Us</Link></Button>
          <Button asChild variant="secondary"><Link to="/get-involved/volunteer">Volunteer Your Skills</Link></Button>
          <Button asChild variant="outline"><Link to="/programs/eduaid-africa">Support EduAid Africa</Link></Button>
          <Button asChild variant="outline"><Link to="/programs/eduaid-africa-teacher-corps">Join the Teacher Corps</Link></Button>
          <Button asChild variant="outline">
            <Link to="/get-involved/volunteer?waitlist=1" className="inline-flex items-center gap-1">
              Join the Waiting List <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
};

export default EduAidAfricaTeacherCorps;
