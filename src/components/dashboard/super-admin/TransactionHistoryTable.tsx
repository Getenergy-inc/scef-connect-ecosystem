import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: string;
  type: "donation" | "disbursement" | "dues" | "purchase" | "contribution";
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  maxRows?: number;
}

const typeColors: Record<string, string> = {
  donation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  disbursement: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  dues: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  purchase: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  contribution: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
};

export function TransactionHistoryTable({ transactions, maxRows = 5 }: TransactionHistoryTableProps) {
  const displayedTransactions = transactions.slice(0, maxRows);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right w-[120px]">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.length > 0 ? (
              displayedTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(tx.date, "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={typeColors[tx.type]}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                      <span className="text-sm text-foreground">{tx.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{tx.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  No transactions yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
