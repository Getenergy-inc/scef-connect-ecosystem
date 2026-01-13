-- Enable realtime for wallet_transactions table
ALTER PUBLICATION supabase_realtime ADD TABLE public.wallet_transactions;

-- Also enable for wallets table to track balance changes
ALTER PUBLICATION supabase_realtime ADD TABLE public.wallets;