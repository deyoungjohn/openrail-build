import { nearTxUrl, PROOF_CONTRACT, PROOF_ROWS } from "@/lib/proof-data";

export const dynamic = "force-static";

/** The Proof page as data, for programs and AI agents. */
export function GET() {
  return Response.json({
    contract: PROOF_CONTRACT,
    network: "near-mainnet",
    note: "Business transactions of the Openrail contract, newest first. Private-balance deposits and withdrawals are not listed.",
    transactions: PROOF_ROWS.map((r) => ({
      type: r.type,
      amount_usd: r.amount_usd,
      time: new Date(r.time * 1000).toISOString(),
      claim_account: r.claim,
      tx_hash: r.tx,
      explorer_url: nearTxUrl(r.tx),
    })),
  });
}
