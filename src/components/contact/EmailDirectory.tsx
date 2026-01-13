import { Mail, ExternalLink } from "lucide-react";
import { emailCategories, getMailtoLink } from "@/config/emailDirectory";

interface EmailDirectoryProps {
  variant?: "full" | "condensed";
  showCategories?: string[];
}

export const EmailDirectory = ({ 
  variant = "full",
  showCategories 
}: EmailDirectoryProps) => {
  const categoriesToShow = showCategories 
    ? Object.entries(emailCategories).filter(([key]) => showCategories.includes(key))
    : Object.entries(emailCategories);

  if (variant === "condensed") {
    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-primary" />
          Contact Us
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <a 
            href={getMailtoLink("info@santoscreations.org")}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            info@santoscreations.org
          </a>
          <a 
            href={getMailtoLink("partnership@santoscreations.org")}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            partnership@santoscreations.org
          </a>
          <a 
            href={getMailtoLink("membership@santoscreations.org")}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            membership@santoscreations.org
          </a>
          <a 
            href={getMailtoLink("hr@santoscreations.org")}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            hr@santoscreations.org
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground">Email Directory</h3>
          <p className="text-sm text-muted-foreground">Contact the right department</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesToShow.map(([categoryKey, emails]) => (
          <div key={categoryKey} className="space-y-3">
            <h4 className="font-semibold text-foreground capitalize text-sm border-b border-border pb-2">
              {categoryKey === "getInvolved" ? "Get Involved" : 
               categoryKey === "partnerships" ? "Partnerships & CSR" :
               categoryKey === "programs" ? "Programs" :
               categoryKey === "hr" ? "HR & Leadership" : "General"}
            </h4>
            <ul className="space-y-2">
              {emails.map((item) => (
                <li key={item.email}>
                  <a
                    href={getMailtoLink(item.email)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Mail className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                    <span className="flex-1">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <br />
                      <span className="text-xs">{item.email}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline email link component for use anywhere
interface EmailLinkProps {
  email: string;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

export const EmailLink = ({ email, label, showIcon = true, className = "" }: EmailLinkProps) => {
  return (
    <a
      href={getMailtoLink(email)}
      className={`inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors ${className}`}
    >
      {showIcon && <Mail className="w-3.5 h-3.5" />}
      <span>{label || email}</span>
    </a>
  );
};
