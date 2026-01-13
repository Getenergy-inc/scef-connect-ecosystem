import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, Smartphone, Globe, ExternalLink, Shield } from "lucide-react";
import { toast } from "sonner";
import scefLogo from "@/assets/scef-logo.jpg";
interface FundWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentProviders = [
  {
    id: "paystack",
    name: "Paystack",
    description: "Card, Bank, USSD (Africa)",
    color: "bg-[#00C3F7]",
    textColor: "text-white",
    url: "https://paystack.com/pay/gfa-wallet",
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    description: "Card, Bank, Mobile Money",
    color: "bg-[#F5A623]",
    textColor: "text-white",
    url: "https://flutterwave.com/pay/gfa-wallet",
  },
  {
    id: "bancable",
    name: "Bancable",
    description: "Direct Bank Integration",
    color: "bg-[#1A237E]",
    textColor: "text-white",
    url: "#", // TODO: Configure Bancable endpoint
  },
  {
    id: "transcertpay",
    name: "TranscertPay",
    description: "International Transfers",
    color: "bg-[#2E7D32]",
    textColor: "text-white",
    url: "#", // TODO: Configure TranscertPay endpoint
  },
];

const quickAmounts = [10, 25, 50, 100, 250, 500];

export const FundWalletModal = ({ open, onOpenChange }: FundWalletModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFund = async (providerId: string, providerUrl: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (providerUrl === "#") {
      toast.info(`${providerId} integration coming soon. Please try another payment method.`);
      return;
    }

    setLoading(true);
    setSelectedProvider(providerId);

    // Construct payment URL with amount
    const paymentUrl = `${providerUrl}?amount=${amount}&currency=USD`;
    
    // Open payment in new tab
    window.open(paymentUrl, "_blank");
    
    toast.success(`Redirecting to ${providerId}...`);
    
    setTimeout(() => {
      setLoading(false);
      setSelectedProvider(null);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={scefLogo}
              alt="GFA Wallet"
              className="w-20 h-20 rounded-xl object-contain bg-white p-2 shadow-lg"
            />
          </div>
          <DialogTitle className="font-display text-2xl">Fund Your GFA Wallet</DialogTitle>
          <DialogDescription>
            Add funds using your preferred payment method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-semibold">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl font-bold h-16 text-center"
            />
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className={`text-sm ${amount === amt.toString() ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  ${amt}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Providers */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Choose Payment Provider</Label>
            <div className="grid grid-cols-2 gap-3">
              {paymentProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleFund(provider.name, provider.url)}
                  disabled={loading}
                  className={`p-4 rounded-xl border-2 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${
                    selectedProvider === provider.name
                      ? `${provider.color} ${provider.textColor} border-transparent`
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold text-base ${selectedProvider === provider.name ? provider.textColor : 'text-foreground'}`}>
                      {provider.name}
                    </p>
                    <p className={`text-xs mt-1 ${selectedProvider === provider.name ? `${provider.textColor} opacity-80` : 'text-muted-foreground'}`}>
                      {provider.description}
                    </p>
                  </div>
                  {loading && selectedProvider === provider.name && (
                    <div className="flex justify-end mt-2">
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Secure Payment</p>
              <p>All transactions are encrypted and processed through verified payment providers. Your financial data is never stored on our servers.</p>
            </div>
          </div>

          {/* Powered by GFA Wallet */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs text-muted-foreground">Powered by</span>
            <img src={scefLogo} alt="GFA" className="w-5 h-5 rounded object-contain" />
            <span className="text-xs font-semibold text-foreground">GFA Wallet</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
