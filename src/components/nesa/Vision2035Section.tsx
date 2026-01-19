import { useState } from "react";
import { 
  ChevronDown, ChevronUp, Target, Shield, Globe, 
  Award, Users, Radio, School, CheckCircle, Calendar,
  BookOpen, Eye, Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nesaColors = {
  dark: "#1A1A1A",
  darkAlt: "#0D0D0D",
  gold: "#C4A052",
  goldLight: "#D4B46A",
  goldDark: "#A38642",
  text: "#FFFFFF",
  textMuted: "#9CA3AF",
};

interface VisionSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const VisionSection = ({ title, icon: Icon, children, defaultOpen = false }: VisionSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div 
      className="border rounded-xl overflow-hidden transition-all"
      style={{ borderColor: `${nesaColors.gold}30` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
        style={{ backgroundColor: isOpen ? `${nesaColors.gold}10` : 'transparent' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${nesaColors.gold}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: nesaColors.gold }} />
          </div>
          <h3 className="font-display font-bold text-lg text-white">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" style={{ color: nesaColors.gold }} />
        ) : (
          <ChevronDown className="w-5 h-5" style={{ color: nesaColors.gold }} />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="px-5 pb-5 pt-2 border-t"
          style={{ 
            borderColor: `${nesaColors.gold}20`,
            color: nesaColors.textMuted 
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const Vision2035Section = () => {
  const [expandAll, setExpandAll] = useState(false);

  const toggleAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <section id="vision-2035" className="py-20" style={{ backgroundColor: nesaColors.dark }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ 
              backgroundColor: `${nesaColors.gold}20`,
              color: nesaColors.gold
            }}
          >
            <Target className="w-4 h-4" />
            Strategic Vision Document
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            NESA-AFRICA <span style={{ color: nesaColors.gold }}>VISION 2035</span>
          </h2>
          
          <p className="text-xl mb-2" style={{ color: nesaColors.gold }}>
            Setting Africa's Education Standards. Recognising Impact. Delivering Legacy.
          </p>
          
          <p className="max-w-3xl mx-auto mb-8" style={{ color: nesaColors.textMuted }}>
            Vision 2035 defines NESA-Africa's 10-year strategic direction — moving from an awards-led 
            initiative into a continent-wide education standards and impact institution that connects 
            recognition with lasting social transformation.
          </p>

          <Button
            onClick={toggleAll}
            variant="outline"
            className="mb-8"
            style={{ 
              borderColor: nesaColors.gold,
              color: nesaColors.gold
            }}
          >
            {expandAll ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
            {expandAll ? "Collapse All Sections" : "Expand All Sections"}
          </Button>
        </div>

        {/* Collapsible Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Section 1: Introduction */}
          <VisionSection title="1. Introduction" icon={BookOpen} defaultOpen={!expandAll ? true : expandAll}>
            <p className="mb-4">
              The New Education Standards Awards Africa (NESA-Africa) is a continental education standards, 
              recognition, and accountability platform established to elevate education impact, public trust, 
              and measurable outcomes across Africa.
            </p>
            <p className="mb-4">
              Vision 2035 defines NESA-Africa's 10-year strategic direction — moving from an awards-led 
              initiative into a continent-wide education standards and impact institution that connects 
              recognition with lasting social transformation.
            </p>
            <p className="font-medium" style={{ color: nesaColors.gold }}>
              This vision aligns with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>SDG 4 — Quality Education</li>
              <li>African Union Agenda 2063</li>
              <li>National education reform agendas</li>
              <li>CSR and philanthropic accountability frameworks</li>
            </ul>
          </VisionSection>

          {/* Section 2: The Problem */}
          <VisionSection title="2. The Problem NESA-Africa Addresses" icon={Eye} defaultOpen={expandAll}>
            <p className="mb-4">Across Africa, education efforts face four systemic challenges:</p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <h4 className="font-semibold text-white mb-1">Lack of Standardised Recognition</h4>
                <p className="text-sm">Education contributors are recognised inconsistently, without clear benchmarks or verification.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <h4 className="font-semibold text-white mb-1">Low Public Trust in Awards Systems</h4>
                <p className="text-sm">Many awards lack transparency, regional balance, and long-term credibility.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <h4 className="font-semibold text-white mb-1">Disconnected Impact</h4>
                <p className="text-sm">Recognition rarely translates into post-award social or infrastructure impact.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <h4 className="font-semibold text-white mb-1">Weak Regional Integration</h4>
                <p className="text-sm">National initiatives operate in isolation, limiting continental learning and collaboration.</p>
              </div>
            </div>
            <p className="mt-4 font-medium" style={{ color: nesaColors.gold }}>NESA-Africa exists to close these gaps.</p>
          </VisionSection>

          {/* Section 3: Vision Statement */}
          <VisionSection title="3. Vision Statement" icon={Target} defaultOpen={expandAll}>
            <div 
              className="p-6 rounded-xl border-l-4 text-lg italic"
              style={{ 
                backgroundColor: `${nesaColors.gold}10`,
                borderColor: nesaColors.gold,
                color: nesaColors.text
              }}
            >
              "By 2035, NESA-Africa will be Africa's most trusted continental education standards and 
              recognition institution — linking verified contribution, public participation, regional equity, 
              and measurable legacy impact."
            </div>
          </VisionSection>

          {/* Section 4: Mission Statement */}
          <VisionSection title="4. Mission Statement" icon={Award} defaultOpen={expandAll}>
            <p className="mb-4">To set, validate, and promote education standards across Africa by:</p>
            <ul className="space-y-2">
              {[
                "Recognising verified education contributors",
                "Enabling transparent public participation",
                "Elevating regional equity",
                "Converting recognition into tangible social impact"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </VisionSection>

          {/* Section 5: Core Pillars */}
          <VisionSection title="5. Core Pillars of Vision 2035" icon={Landmark} defaultOpen={expandAll}>
            <div className="space-y-6">
              {/* Pillar 1 */}
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>1</span>
                  Education Standards & Verification
                </h4>
                <p className="mb-2">By 2035, NESA-Africa will operate as a continental reference point for education contribution standards.</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Verified nomination and research systems</li>
                  <li>Independent evaluation frameworks</li>
                  <li>Transparent criteria for recognition at all levels</li>
                  <li>Publicly auditable processes</li>
                </ul>
                <p className="mt-2 text-sm" style={{ color: nesaColors.gold }}>Platinum Certificates serve as the baseline verification entry point for all contributors.</p>
              </div>

              {/* Pillar 2 */}
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>2</span>
                  Regional-First Africa Logic
                </h4>
                <p className="mb-2">NESA-Africa adopts a region-first structure, ensuring that:</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 my-3">
                  {["North Africa", "West Africa", "East Africa", "Central Africa", "Southern Africa"].map((region) => (
                    <div key={region} className="text-center p-2 rounded-lg text-xs font-medium" style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}>
                      {region}
                    </div>
                  ))}
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>National dominance is reduced</li>
                  <li>Regional excellence is elevated</li>
                  <li>Continental winners emerge through regional qualification</li>
                </ul>
                <p className="mt-2 text-sm" style={{ color: nesaColors.gold }}>By 2035, regional recognition systems will be as strong as national ones.</p>
              </div>

              {/* Pillar 3 */}
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>3</span>
                  Transparent Public Participation
                </h4>
                <p className="mb-2">NESA-Africa integrates structured public participation through:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Public voting systems</li>
                  <li>Clear voting windows</li>
                  <li>Digital verification</li>
                  <li>Distinction between public vote and jury assessment</li>
                </ul>
                <p className="mt-2 mb-2">Public trust is maintained through:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Published voting rules</li>
                  <li>Real-time verification</li>
                  <li>Clear weighting models (e.g., 40% public, 60% jury)</li>
                </ul>
              </div>

              {/* Pillar 4 */}
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>4</span>
                  Multi-Platform Education Media
                </h4>
                <p className="mb-2">By 2035, NESA-Africa TV will be a pan-African multilingual education media platform, delivering:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Online recognition shows</li>
                  <li>Live award galas</li>
                  <li>Hybrid webinars</li>
                  <li>Education tourism documentaries</li>
                  <li>Correspondent reports from African countries</li>
                </ul>
                <p className="mt-2 text-sm" style={{ color: nesaColors.gold }}>Languages will expand progressively to reflect Africa's linguistic diversity.</p>
              </div>

              {/* Pillar 5 */}
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>5</span>
                  Legacy Impact & Social Return
                </h4>
                <p className="mb-2 font-medium" style={{ color: nesaColors.gold }}>Recognition without impact is incomplete.</p>
                <p className="mb-2">Through EduAid-Africa and Rebuild My School Africa, NESA-Africa commits to:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Translating awards into infrastructure development</li>
                  <li>Supporting inclusive and special needs education</li>
                  <li>Delivering measurable post-award outcomes</li>
                </ul>
                <p className="mt-3 font-medium">By 2035:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Every award cycle will fund real education projects</li>
                  <li>Impact will be tracked, published, and audited</li>
                </ul>
              </div>
            </div>
          </VisionSection>

          {/* Section 6: Strategic Milestones */}
          <VisionSection title="6. Strategic Milestones (2025–2035)" icon={Calendar} defaultOpen={expandAll}>
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>2025–2027</span>
                  <h4 className="font-bold text-white">Foundation Phase</h4>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Regional-first competition logic implemented</li>
                  <li>Platinum Certificates established as baseline</li>
                  <li>Transparent Gold → Blue Garnet pipeline</li>
                  <li>Rebuild My School Africa launched (1 school per region)</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>2028–2030</span>
                  <h4 className="font-bold text-white">Expansion Phase</h4>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Strong local chapter competitions</li>
                  <li>Regional hosting rotation established</li>
                  <li>Increased multilingual broadcasting</li>
                  <li>Expanded donor and CSR partnerships</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}>2031–2035</span>
                  <h4 className="font-bold text-white">Institutional Phase</h4>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>NESA-Africa recognised as continental education reference</li>
                  <li>Cross-border education benchmarking</li>
                  <li>Policy engagement with AU, ECOWAS, SADC, EAC, ECCAS</li>
                  <li>Long-term infrastructure and inclusion programmes scaled</li>
                </ul>
              </div>
            </div>
          </VisionSection>

          {/* Section 7: Role of Platinum */}
          <VisionSection title="7. Role of Platinum Certification" icon={Award} defaultOpen={expandAll}>
            <p className="mb-4">By design, all cleared Platinum nominees receive:</p>
            <div 
              className="p-4 rounded-xl border-l-4 mb-4 italic"
              style={{ 
                backgroundColor: `${nesaColors.gold}10`,
                borderColor: nesaColors.gold,
                color: nesaColors.text
              }}
            >
              "Platinum Certificate of Recognition of Service for Contributions to Achieving Education for All in Africa"
            </div>
            <p className="mb-2">This ensures:</p>
            <ul className="space-y-2">
              {["Inclusion", "Validation", "Entry into the NESA-Africa ecosystem", "A credible starting point for future competitive progression"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-medium" style={{ color: nesaColors.gold }}>
              Platinum is not competitive — it is foundational.
            </p>
          </VisionSection>

          {/* Section 8: Governance */}
          <VisionSection title="8. Governance & Integrity" icon={Shield} defaultOpen={expandAll}>
            <p className="mb-4">Vision 2035 is governed by:</p>
            <ul className="space-y-2">
              {[
                "Clear separation of roles (research, voting, judging, production)",
                "Independent oversight",
                "Regional advisory structures",
                "Public accountability mechanisms"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-medium" style={{ color: nesaColors.gold }}>
              This protects credibility and long-term trust.
            </p>
          </VisionSection>

          {/* Section 9: Success by 2035 */}
          <VisionSection title="9. What Success Looks Like by 2035" icon={Globe} defaultOpen={expandAll}>
            <p className="mb-4">By 2035, NESA-Africa will have:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "A continent-wide verified education recognition framework",
                "Strong regional competition systems",
                "Trusted public participation mechanisms",
                "A respected multilingual education media network",
                "Measurable post-award education infrastructure impact",
                "Enduring institutional credibility"
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 p-3 rounded-lg"
                  style={{ backgroundColor: `${nesaColors.gold}10` }}
                >
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </VisionSection>

          {/* Section 10: Conclusion */}
          <VisionSection title="10. Conclusion" icon={Target} defaultOpen={expandAll}>
            <div 
              className="p-6 rounded-xl text-center"
              style={{ backgroundColor: `${nesaColors.gold}10` }}
            >
              <p className="text-lg mb-4" style={{ color: nesaColors.text }}>
                NESA-Africa Vision 2035 is not about trophies or ceremonies.
              </p>
              <p className="text-2xl font-bold" style={{ color: nesaColors.gold }}>
                It is about standards, trust, equity, and legacy.
              </p>
            </div>
          </VisionSection>
        </div>

        {/* Alignment Footer */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: nesaColors.textMuted }}>
            Vision 2035 aligns with continental and global frameworks:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["SDG 4", "AU Agenda 2063", "ECOWAS", "SADC", "EAC", "ECCAS"].map((item) => (
              <span 
                key={item}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: `${nesaColors.gold}20`,
                  color: nesaColors.gold
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
