import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";

export const WalletHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <img
        src={gfaWalletLogo}
        alt="GFA Wallet"
        className="w-16 h-16 rounded-xl object-cover shadow-md"
      />
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          GFA Wallet
        </h1>
        <p className="text-muted-foreground">
          Manage your funds and support education initiatives
        </p>
      </div>
    </div>
  );
};
