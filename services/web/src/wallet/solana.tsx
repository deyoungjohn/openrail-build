"use client";

/**
 * The browser's own Solana wallet (Phantom, Solflare, Backpack): no WalletConnect, nothing loaded until the person
 * connects. The transfer is built with @solana/web3.js, imported only when a payment is sent.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface InjectedSolana {
  isConnected?: boolean;
  publicKey?: { toString(): string } | null;
  connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toString(): string } }>;
  disconnect?(): Promise<void>;
  signAndSendTransaction(transaction: unknown): Promise<{ signature: string } | string>;
}

/** The first Solana wallet the browser has, in the order people most often use them. */
export function injectedSolana(): InjectedSolana | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    phantom?: { solana?: InjectedSolana };
    solflare?: InjectedSolana;
    backpack?: InjectedSolana;
    solana?: InjectedSolana;
  };
  return w.phantom?.solana ?? w.solflare ?? w.backpack ?? w.solana ?? null;
}

interface SolanaState {
  address: string | null;
  available: boolean;
  error: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  /** A token transfer to `to`, signed and sent by the wallet; returns the signature. */
  pay: (request: { to: string; mint: string; amount: bigint; decimals: number }) => Promise<string>;
}

const Ctx = createContext<SolanaState | null>(null);

export function useSolana(): SolanaState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSolana must be used inside <SolanaProvider>");
  return ctx;
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const wallet = injectedSolana();
    setAvailable(wallet !== null);
    // A site the wallet already trusts reconnects without a pop-up.
    wallet
      ?.connect({ onlyIfTrusted: true })
      .then((r) => setAddress(r.publicKey.toString()))
      .catch(() => undefined);
  }, []);

  const connect = useCallback(async () => {
    const wallet = injectedSolana();
    if (wallet === null) return;
    setError(false);
    try {
      const r = await wallet.connect();
      setAddress(r.publicKey.toString());
    } catch {
      setError(true);
    }
  }, []);

  const disconnect = useCallback(() => {
    void injectedSolana()
      ?.disconnect?.()
      .catch(() => undefined);
    setAddress(null);
  }, []);

  const pay = useCallback<SolanaState["pay"]>(
    async ({ to, mint, amount, decimals }) => {
      const wallet = injectedSolana();
      if (wallet === null || address === null) throw new Error("wallet_not_connected");
      const { buildSolanaUsdcTransfer } = await import("./solana-pay");
      const { transaction } = await buildSolanaUsdcTransfer({
        from: address,
        to,
        mint,
        amount,
        decimals,
      });
      const sent = await wallet.signAndSendTransaction(transaction);
      return typeof sent === "string" ? sent : sent.signature;
    },
    [address],
  );

  const value = useMemo(
    () => ({ address, available, error, connect, disconnect, pay }),
    [address, available, error, connect, disconnect, pay],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
