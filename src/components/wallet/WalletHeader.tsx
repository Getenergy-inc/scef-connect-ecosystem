import scefLogo from "@/assets/scef-logo.jpg";

export const WalletHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <img
        src={scefLogo}
        alt="GFA Wallet"
        className="w-20 h-20 rounded-xl object-contain bg-white p-2 shadow-lg"
      />
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          GFA Wallet
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
