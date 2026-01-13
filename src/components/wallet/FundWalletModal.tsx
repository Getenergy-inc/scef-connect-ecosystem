import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, Smartphone, Globe } from "lucide-react";
import { toast } from "sonner";

interface FundWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentMethods = [
  {
    id: "card",
    label: "Debit/Credit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, Verve",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    icon: Building2,
    description: "Direct bank transfer",
  },
  {
    id: "mobile",
    label: "Mobile Money",
    icon: Smartphone,
    description: "M-Pesa, MTN, Airtel Money",
  },
  {
    id: "international",
    label: "International Transfer",
    icon: Globe,
    description: "Wire transfer, SWIFT",
  },
];

export const FundWalletModal = ({ open, onOpenChange }: FundWalletModalProps) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleFund = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    // TODO: Integrate with actual payment providers (Paystack, Flutterwave, etc.)
    // This is a stub implementation
    setTimeout(() => {
      toast.info("Payment provider integration coming soon. This is a demo.");
      setLoading(false);
    }, 1500);
  };

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Fund Your Wallet</DialogTitle>
          <DialogDescription>
            Add funds to your GFA Wallet to support education initiatives
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold h-14"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="text-xs"
                >
                  ${amt}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <method.icon className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor={method.id} className="cursor-pointer font-medium">
                      {method.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleFund}
            disabled={loading || !amount}
            className="w-full"
          >
            {loading ? "Processing..." : `Fund Wallet $${amount || "0.00"}`}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment processed by verified payment providers.
            All transactions are logged for audit compliance.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
