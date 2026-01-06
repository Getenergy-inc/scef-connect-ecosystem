import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Mail, 
  Phone, 
  FileCheck, 
  Shield 
} from "lucide-react";

interface VerificationItem {
  label: string;
  status: 'verified' | 'pending' | 'unverified';
  icon: React.ElementType;
}

interface VerificationStatusProps {
  emailVerified?: boolean;
  phoneVerified?: boolean;
  idVerified?: boolean;
  profileComplete?: boolean;
}

export const VerificationStatus = ({
  emailVerified = false,
  phoneVerified = false,
  idVerified = false,
  profileComplete = false,
}: VerificationStatusProps) => {
  const verificationItems: VerificationItem[] = [
    { label: 'Email', status: emailVerified ? 'verified' : 'unverified', icon: Mail },
    { label: 'Phone', status: phoneVerified ? 'verified' : 'unverified', icon: Phone },
    { label: 'ID Document', status: idVerified ? 'verified' : 'pending', icon: FileCheck },
    { label: 'Profile', status: profileComplete ? 'verified' : 'unverified', icon: Shield },
  ];

  const verifiedCount = verificationItems.filter(item => item.status === 'verified').length;
  const totalCount = verificationItems.length;
  const percentage = Math.round((verifiedCount / totalCount) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-forest" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-scef-gold" />;
      default:
        return <AlertCircle className="w-4 h-4 text-terracotta" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-forest';
      case 'pending':
        return 'text-scef-gold';
      default:
        return 'text-terracotta';
    }
  };

  return (
    <Card className="border-2 border-black">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Verification Status</h3>
            <p className="text-sm text-muted-foreground">
              {verifiedCount} of {totalCount} verified
            </p>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted stroke-current"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${percentage === 100 ? 'text-forest' : 'text-scef-gold'} stroke-current`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {verificationItems.map((item) => (
            <div 
              key={item.label} 
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(item.status)}
                <span className={`text-xs capitalize ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {percentage < 100 && (
          <Button variant="outline" className="w-full mt-4" size="sm">
            Complete Verification
          </Button>
        )}
      </CardContent>
    </Card>
  );
};