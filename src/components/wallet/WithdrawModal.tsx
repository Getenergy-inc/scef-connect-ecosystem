import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  hasBankAccount: boolean;
}

export const WithdrawModal = ({ open, onOpenChange, balance, hasBankAccount }: WithdrawModalProps) => {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }

    setLoading(true);
    // TODO: Create disbursement request in database
    // This is a stub implementation
    setTimeout(() => {
      toast.success("Withdrawal request submitted for review");
      setLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Request Withdrawal</DialogTitle>
          <DialogDescription>
            Submit a disbursement request to your verified bank account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!hasBankAccount ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You must configure and verify a bank account before requesting withdrawals.
                Please contact support or visit Settings → Bank Accounts.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Available Balance */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold font-display">${balance.toFixed(2)}</p>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Withdrawal Amount (USD)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={balance}
                />
              </div>

              {/* Bank Account Display */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Verified Bank Account</p>
                  <p className="text-xs text-muted-foreground">****1234 (Primary)</p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Purpose / Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="e.g., Chapter operations, project funding"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Action Button */}
              <Button
                onClick={handleWithdraw}
                disabled={loading || !amount || parseFloat(amount) > balance}
                className="w-full"
              >
                {loading ? "Submitting..." : "Submit Withdrawal Request"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                All disbursement requests require manual review and KYC verification.
                Processing time: 2-5 business days.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
