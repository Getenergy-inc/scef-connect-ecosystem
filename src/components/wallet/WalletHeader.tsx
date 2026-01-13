import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";

export const WalletHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <img
        src={gfaWalletLogo}
        alt="GFA Wallet"
        className="w-20 h-20 rounded-xl object-contain shadow-lg"
      />
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          GFA Wzip
        </h1>
        <p className="text-lg text-primary font-medium">
          GetFinance Africa
        </p>
        <p className="text-muted-foreground text-sm">
          Manage your funds and support education initiatives
        </p>
      </div>
    </div>
  );
};
