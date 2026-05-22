import { LucideIcon, HeartHandshake, ShieldCheck, BarChart3 } from "lucide-react";
import {
  Section,
  Safeguarding,
  PartnershipBlock,
  CardGrid,
  FinalCTA,
} from "./ProgramSections";

/**
 * Reusable appendix block that brings every programme page up to the
 * EduAid Africa Teacher Corps standard without altering original content.
 * Adds: Safeguarding · Partnerships · Impact indicators · Final CTA.
 */
export type ProgramTemplateAppendixProps = {
  programName: string;
  safeguardingIntro?: string;
  safeguardingRules?: string[];
  partnershipIntro?: string;
  partnerCategories?: string[];
  partnerSupport?: string[];
  impact?: Array<{ icon?: LucideIcon; title: string; body?: string }>;
  ctaTitle?: string;
  ctaBody?: string;
  ctaButtons?: Array<{ label: string; to: string; variant?: "default" | "secondary" | "outline" }>;
};

const defaultRules = [
  "Verified institutional partners and trainers",
  "Child-protection compliance for all school engagement",
  "Data privacy for beneficiaries and participants",
  "Independent quality assurance per cycle",
  "Transparent grievance and feedback channel",
  "No paid endorsements or sponsor-driven content",
];

const defaultCategories = [
  "Education ministries & agencies",
  "Foundations & CSR partners",
  "Universities & research bodies",
  "EdTech & media partners",
  "NGOs and community networks",
  "Diaspora professional networks",
];

const defaultSupport = [
  "Sponsor a cohort or chapter cycle",
  "Fund infrastructure or learning kits",
  "Provide content, curriculum or mentorship",
  "Underwrite certifications and stipends",
  "Donate devices or connectivity",
  "Host a regional mission or convening",
];

export const ProgramTemplateAppendix = ({
  programName,
  safeguardingIntro,
  safeguardingRules = defaultRules,
  partnershipIntro,
  partnerCategories = defaultCategories,
  partnerSupport = defaultSupport,
  impact,
  ctaTitle,
  ctaBody,
  ctaButtons,
}: ProgramTemplateAppendixProps) => {
  const impactItems =
    impact?.map((i) => ({
      icon: i.icon ?? BarChart3,
      title: i.title,
      body: i.body ?? "Reporting in progress.",
    })) ?? [
      { icon: BarChart3, title: "Beneficiaries Reached", body: "Reporting in progress." },
      { icon: BarChart3, title: "Partner Institutions", body: "Reporting in progress." },
      { icon: BarChart3, title: "Communities Served", body: "Reporting in progress." },
    ];

  return (
    <>
      <Section kicker="Safeguarding" title={`${programName} — Safeguarding Commitment`}>
        <Safeguarding
          intro={
            safeguardingIntro ??
            `${programName} operates under SCEF's institutional safeguarding, ethics and quality assurance rules.`
          }
          rules={safeguardingRules}
        />
      </Section>

      <Section kicker="Partnerships" title={`Partner With ${programName}`}>
        <PartnershipBlock
          intro={
            partnershipIntro ??
            `We work with institutions, CSR partners and community networks to scale ${programName} across Africa.`
          }
          categories={partnerCategories}
          support={partnerSupport}
        />
      </Section>

      <Section kicker="Impact" title="What We Measure">
        <CardGrid items={impactItems} />
      </Section>

      <FinalCTA
        title={ctaTitle ?? `Join Us in Advancing ${programName}.`}
        body={
          ctaBody ??
          "Support, partner, volunteer, or donate to extend this programme to more learners and communities across Africa."
        }
        buttons={
          ctaButtons ?? [
            { label: "Donate", to: "/donate" },
            { label: "Partner With Us", to: "/partner-with-us", variant: "secondary" },
            { label: "Volunteer", to: "/get-involved/volunteer", variant: "outline" },
          ]
        }
      />
    </>
  );
};

export default ProgramTemplateAppendix;
