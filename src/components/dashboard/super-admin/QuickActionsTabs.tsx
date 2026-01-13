import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

interface QuickActionsTabsProps {
  activeTab?: string;
}

const tabs = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "chapters", label: "Local Chapters", href: "/dashboard/chapters" },
  { id: "projects", label: "Projects", href: "/dashboard/programs" },
  { id: "scholarships", label: "Scholarships & Grants", href: "/dashboard/scholarships" },
  { id: "wallet", label: "Wallet & Transactions", href: "/dashboard/wallets" },
  { id: "users", label: "Users & Profiles", href: "/dashboard/users" }
];

export function QuickActionsTabs({ activeTab = "dashboard" }: QuickActionsTabsProps) {
  const location = useLocation();
  
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const matchingTab = tabs.find(tab => currentPath === tab.href || currentPath.startsWith(tab.href + "/"));
    return matchingTab?.id || "dashboard";
  };

  return (
    <div className="border-b border-border bg-card rounded-t-lg">
      <Tabs value={getCurrentTab()} className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              asChild
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 text-sm font-medium"
            >
              <Link to={tab.href}>{tab.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
