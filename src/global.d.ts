declare interface Window {
  okxwallet?: any;
  unisat?: any;
}

interface WalletContext {
  account: string;
  isConnect: boolean;
  errorMessage: string;
  chain: ChainType;
  connect(WalletType): Promise<void>;
  disconnect(WalletType): void;
}
