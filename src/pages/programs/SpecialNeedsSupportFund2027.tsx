import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const steps = [
  ["Identify", "eligible special-needs and inclusive schools."],
  ["Nominate", "a school through an authorised form."],
  ["Verify", "its identity, learners, needs and safeguarding arrangements."],
  ["Classify", "the school by its principal services and intervention needs."],
  ["Publish", "only approved school profiles."],
  ["Vote", "for an eligible school within the appropriate African region."],
  ["Select", "the highest-voted eligible school from each region."],
  ["Complete due diligence", "and confirm the appropriate intervention."],
  ["Fund, advise or support", "the approved regional school."],
  ["Monitor and report", "the intervention and educational impact."],
];

const categories = [
  ["Visual Support Education", "Schools supporting learners who are blind or have low vision."],
  ["Deaf and Hearing Support Education", "Schools supporting Deaf and hard-of-hearing learners."],
  ["Physical and Mobility Support Education", "Schools supporting learners with physical disabilities, mobility challenges or cerebral palsy."],
  ["Intellectual and Developmental Support Education", "Schools supporting learners with intellectual or developmental disabilities, including Down syndrome."],
  ["Autism and Communication Support Education", "Schools supporting autistic learners and learners with speech, language or communication needs."],
  ["Learning, Emotional and Behavioural Support Education", "Schools supporting learners with dyslexia, dyscalculia, ADHD and significant emotional, behavioural or psychosocial needs."],
  ["Multiple and Complex Disabilities", "Schools serving learners with more than one disability or substantial multidisciplinary support needs."],
  ["Inclusive, Early-Intervention and Vocational Education", "Inclusive mainstream schools, specialist units, early-intervention centres, resource centres and vocational or transition programmes."],
];

const interventions = ["Building construction","Classroom renovation","Ramps and physical accessibility","Accessible toilets and water systems","Braille and large-print resources","Sign-language and captioning facilities","Assistive technology","Communication devices","Mobility equipment","Adapted furniture","Sensory or therapy rooms","School transportation","Teacher and caregiver training","Digital-learning facilities","Internet connectivity","Solar and backup electricity","Vocational-training workshops","Learning materials","Safeguarding and psychosocial support","Technical or operational advice"];

const support = ["an education-support grant","renovation or accessibility assistance","equipment or learning materials","assistive technology","professional and technical advisory services","volunteer support","corporate or institutional sponsorship","a combination of approved interventions"];

const conditions = ["identity and registration verification","safeguarding approval","evidence of educational need","accurate project costing","school-management consent","site or remote assessment","funding availability","absence of voting manipulation","written programme approval"];

const timetable = [
  ["February–March 2027", "Programme preparation, partner mobilisation, fundraising controls and regional coordination"],
  ["April 2027", "School nominations open"],
  ["April–August 2027", "Verification, safeguarding, needs assessment and regional classification"],
  ["August 2027", "Approved school profiles prepared and voting system tested"],
  ["September 2027", "Voting for verified schools"],
  ["October 2027", "Due diligence, regional selection and approved interventions begin"],
  ["November 2027", "Implementation monitoring, documentation and quality assurance"],
  ["December 2027", "Regional beneficiaries and verified impact presented through the approved NESA-Africa programme"],
  ["2028 onward", "Intervention completion, monitoring and public impact reporting where required"],
];

const dashboard = ["Schools nominated","Unique schools after duplicate review","Schools under verification","Schools approved for voting","Verified regional vote totals","Funds pledged","Funds received and reconciled","Interventions approved","Interventions started","Interventions completed"];

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="container mx-auto px-4 py-10 md:py-14 border-b border-border">
    <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-6">{title}</h2>
    {children}
  </section>
);

const Notice = ({ children }: { children: React.ReactNode }) => (
  <p className="border-l-4 border-scef-gold bg-muted/50 p-4 text-sm text-foreground leading-relaxed">{children}</p>
);

const SpecialNeedsSupportFund2027 = () => (
  <PageShell
    title="Africa Special Needs Education Support Fund 2027"
    description="Jointly presented by NESA-Africa and EduAid-Africa: supporting one verified special-needs school in each of eight African regions in 2027."
    eyebrow="Jointly presented by NESA-Africa and EduAid-Africa · Planned 2027"
    heading="Africa Special Needs Education Support Fund 2027"
    intro="Eight African Regions. Eight Supported Schools. One Inclusive Future. An education-support service of Santos Creations Educational Foundation, supported by Friends of EduAid-Africa and the Africa's Education Enablers Network."
  >
    <Section title="Support One Special-Needs School in Each African Region">
      <div className="mb-4 flex flex-wrap gap-2"><Badge variant="outline">Status: Planned</Badge><Badge variant="outline">Nominate. Verify. Vote. Fund. Volunteer. Transform.</Badge></div>
      <p className="text-muted-foreground mb-4 max-w-3xl">In 2027, the Fund will identify, verify and present eligible special-needs and inclusive schools across Africa. Following verification and approved public participation, one eligible school will be selected from each of the eight approved African programme regions — up to eight regional beneficiary schools in 2027.</p>
      <p className="font-semibold mb-2">Subject to due diligence, available funds and written approval, each selected school may receive:</p>
      <ul className="list-disc pl-6 grid md:grid-cols-2 gap-1 text-muted-foreground mb-6">{support.map((s) => <li key={s}>{s}</li>)}</ul>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button disabled aria-describedby="nom-note">Nominate a Special-Needs School — opens April 2027</Button>
        <Button variant="outline" disabled>View Verified Schools — none published yet</Button>
        <Button variant="outline" disabled>Voting Opens in September 2027, Subject to Verification and Approval</Button>
        <Button asChild variant="secondary"><Link to="/wallet/donate">Donate to the Support Fund</Link></Button>
        <Button asChild variant="outline"><Link to="/partner-with-us">Sponsor a Regional School</Link></Button>
        <Button asChild variant="outline"><Link to="/partner-with-us">Become a Programme Partner</Link></Button>
        <Button asChild variant="outline"><Link to="/get-involved/volunteer">Volunteer Your Skills</Link></Button>
      </div>
      <div id="nom-note"><Notice>A nomination begins a verification process. It does not guarantee publication, voting eligibility, funding, sponsorship, a grant or an intervention.</Notice></div>
    </Section>

    <Section title="How the programme works">
      <ol className="grid md:grid-cols-2 gap-3">
        {steps.map(([t, d], i) => (
          <li key={t} className="rounded-lg border border-border bg-card p-4"><span className="font-semibold text-scef-blue-darker">{i + 1}. {t}</span> <span className="text-muted-foreground">{d}</span></li>
        ))}
      </ol>
    </Section>

    <Section title="2027 regional selection">
      <p className="text-muted-foreground mb-4 max-w-3xl">The 2027 objective is one approved beneficiary school from each of the eight African programme regions, regardless of disability category. The country-to-region mapping will be published once it has received written programme approval. The highest-voted eligible school in each region proceeds to final due diligence; a voting result is not, by itself, an automatic grant award.</p>
      <p className="font-semibold mb-2">Final support remains subject to:</p>
      <ul className="list-disc pl-6 grid md:grid-cols-2 gap-1 text-muted-foreground mb-4">{conditions.map((c) => <li key={c}>{c}</li>)}</ul>
      <p className="text-sm text-muted-foreground">If the highest-voted school fails due diligence, the programme may assess the next eligible school in that region. This decision and its reasons will be documented.</p>
    </Section>

    <Section title="Eligible school categories">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(([t, d], i) => (
          <div key={t} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-semibold text-scef-gold mb-1">Category {i + 1}</p>
            <h3 className="font-semibold text-scef-blue-darker mb-2">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-4">Schools may select more than one support category but must state their principal service category.</p>
    </Section>

    <Section title="Intervention needs">
      <ul className="flex flex-wrap gap-2">{interventions.map((x) => <li key={x}><Badge variant="secondary">{x}</Badge></li>)}</ul>
    </Section>

    <Section title="Voting rules">
      <p className="text-muted-foreground mb-4 max-w-3xl">Public participation applies only to this Fund and is not voting for the NESA-Africa 2026 awards. Voting may begin in September 2027 only after all participating schools pass verification, publication consent is obtained, safeguarding reviews are complete, regional classifications and voting rules are approved and published, fraud controls are tested, and technical and governance approval is recorded.</p>
      <p className="text-muted-foreground mb-4 max-w-3xl">Controls: verified email or telephone confirmation, one voting entitlement per verified participant, anti-bot protection, duplicate detection, audit logs, regional eligibility, published opening and closing times, and documented recount and dispute procedures.</p>
      <Notice>Votes are never sold. Donations and sponsorships cannot purchase additional votes or influence vote totals.</Notice>
    </Section>

    <Section title="Sponsor or Partner With the Programme">
      <p className="text-muted-foreground mb-4 max-w-3xl">Open to individuals, companies, foundations, development organisations, professional associations, educational institutions, technology, construction and engineering companies, media organisations, healthcare and rehabilitation providers, Diaspora organisations, and faith-based and community organisations.</p>
      <p className="text-muted-foreground mb-4 max-w-3xl">Support may cover a verified school, an approved region, renovation, accessible classrooms, assistive technology, transport, learning materials, teacher training, renewable energy, water and sanitation, vocational training, connectivity, verification and monitoring, or approved impact reporting.</p>
      <div className="flex flex-wrap gap-3 mb-6">
        {["Sponsor a Verified School","Support an African Region","Fund an Intervention","Donate Equipment","Offer Professional Services","Become a Corporate Partner","Request a Partnership Discussion"].map((l) => (
          <Button key={l} asChild variant="outline"><Link to="/partner-with-us">{l}</Link></Button>
        ))}
      </div>
      <Notice>Sponsorship, donations and partnerships support approved education interventions. They do not influence school verification, voting totals, NESA-Africa award judging or recognition decisions.</Notice>
      <p className="text-sm text-muted-foreground mt-4">No organisation is listed as a confirmed partner until a written agreement or verified contribution has been received and approved.</p>
    </Section>

    <Section title="Donations">
      <p className="text-muted-foreground mb-4 max-w-3xl">Funds are received by Santos Creations Educational Foundation (SCEF), Nigeria. Support moves through: expression of interest → pledge received → payment instruction issued → payment received → reconciled → receipt issued → intervention allocated → utilisation reported. We never ask for card numbers, PINs, passwords or verification codes on a form.</p>
      <Notice>Completing a donation or sponsorship form does not confirm that payment has been received. Support is confirmed only after successful reconciliation and an official acknowledgement or receipt.</Notice>
    </Section>

    <Section title="2027 timetable">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border">
          <thead className="bg-muted"><tr><th scope="col" className="text-left p-3">Period</th><th scope="col" className="text-left p-3">Activity</th></tr></thead>
          <tbody>{timetable.map(([p, a]) => <tr key={p} className="border-t border-border"><td className="p-3 font-medium whitespace-nowrap">{p}</td><td className="p-3 text-muted-foreground">{a}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground mt-4">The timetable is subject to governance approval, funding availability, school verification, safeguarding requirements and operational readiness.</p>
    </Section>

    <Section title="Public accountability">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        {dashboard.map((d) => (
          <div key={d} className="rounded-lg border border-border bg-card p-4"><p className="text-sm font-medium text-scef-blue-darker">{d}</p><p className="text-xs text-muted-foreground mt-1">Reporting in progress</p></div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Figures appear only once approved. Children's names, diagnoses, identity documents, personal contacts and unapproved school information are never published.</p>
    </Section>
  </PageShell>
);

export default SpecialNeedsSupportFund2027;
