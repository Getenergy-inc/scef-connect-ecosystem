import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const faqs = [
  {
    question: "How can I apply for an EduAid scholarship?",
    answer: "Applications open annually in January. Visit our scholarship portal, complete the online form, and submit required documents including academic transcripts and recommendation letters."
  },
  {
    question: "What types of scholarships are available?",
    answer: "We offer full tuition scholarships, partial grants, book allowances, and living stipends based on need and merit criteria."
  },
  {
    question: "How can my organization partner with EduAid?",
    answer: "Contact our partnerships team at partnerships@eduaid.africa or visit the Partner With Us page to explore CSR, sponsorship, and collaboration opportunities."
  },
  {
    question: "Can I volunteer with EduAid?",
    answer: "Yes! We welcome volunteers for mentorship, tutoring, event coordination, and chapter leadership. Apply through our Get Involved page."
  },
  {
    question: "How is my donation used?",
    answer: "90% of donations go directly to programs (scholarships, school renovation, teacher training). We publish annual audited reports for full transparency."
  }
];

export default function EduAidFAQs() {
  const { t, isRTL } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {t('eduaid.faq.badge') || 'FAQs'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('eduaid.faq.title') || 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
