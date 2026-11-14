/**
 * Real transactions of the Openrail contract (`openrail.near`) on NEAR mainnet, read from the chain on 13 Nov 2026.
 * Each one is checkable on the explorer. Confidential-balance deposits and withdrawals are left out. Static: the page makes
 * no call to show them.
 */
export interface ProofRow {
  type:
    | "Checkout paid"
    | "Checkout opened"
    | "Invoice payment booked"
    | "Invoice issued"
    | "Late payment refunded";
  /** US dollars, two decimals. */
  amount_usd: string;
  /** The claim's own account on NEAR (a keyless vault under the contract). */
  claim: string;
  /** The NEAR transaction hash. */
  tx: string;
  /** Unix seconds (block time). */
  time: number;
}

export const PROOF_CONTRACT = "openrail.near";

export const PROOF_ROWS: ProofRow[] = [
  {
    type: "Checkout paid",
    amount_usd: "40.50",
    claim: "iamyoungjohn-near-c2f5abdd15ea.openrail.near",
    tx: "4wFEBE6KaMVdXU1TwH8SmdC7NGDA3q5TVEK9eP6LQqSY",
    time: 1794574978,
  },
  {
    type: "Checkout opened",
    amount_usd: "40.50",
    claim: "iamyoungjohn-near-c2f5abdd15ea.openrail.near",
    tx: "DyYzUzkD1a9QdCxai1BY7dQXDLDB63C5PwvJcy1P34M3",
    time: 1794574814,
  },
  {
    type: "Checkout paid",
    amount_usd: "2.00",
    claim: "iamyoungjohn-near-92eb72df37ee.openrail.near",
    tx: "Fwdo6CjVKRdEP5XNr3FpiRBFuf3QERU1d6FafW38sNFS",
    time: 1794574684,
  },
  {
    type: "Checkout opened",
    amount_usd: "2.00",
    claim: "iamyoungjohn-near-92eb72df37ee.openrail.near",
    tx: "HSkiXctaEhf6SWopHv3KiTU3wm3V9zzc4nYVrtFsMRcf",
    time: 1794574541,
  },
  {
    type: "Checkout opened",
    amount_usd: "45.00",
    claim: "iamyoungjohn-near-ac4d311aaad5.openrail.near",
    tx: "2YvaRw3sr1nJ47HvXwiBWbwQT5jFUbLiSDgEN73cHkhG",
    time: 1794573949,
  },
  {
    type: "Checkout paid",
    amount_usd: "27.00",
    claim: "iamyoungjohn-near-f8c727809211.openrail.near",
    tx: "Eo1rLiwGmD6o4ufiLAPTHbF6vLhCvszXZJvfjmudFaSF",
    time: 1794571734,
  },
  {
    type: "Checkout opened",
    amount_usd: "27.00",
    claim: "iamyoungjohn-near-f8c727809211.openrail.near",
    tx: "BHndZeUbicCq1JvXpCj1qjQC99kWVP8VgeYJohZsQfL7",
    time: 1794571504,
  },
  {
    type: "Checkout paid",
    amount_usd: "28.00",
    claim: "iamyoungjohn-near-eea144ad04fe.openrail.near",
    tx: "1U5V144RTPyF8aATsAgzHAbg8YeZx23Y4CnuwRgU5Hv",
    time: 1794570916,
  },
  {
    type: "Checkout opened",
    amount_usd: "28.00",
    claim: "iamyoungjohn-near-eea144ad04fe.openrail.near",
    tx: "J6bGCtX1mNf5yXVXm8wWoZGYwhT6v2k9eVjHf6Zx33yd",
    time: 1794570633,
  },
  {
    type: "Checkout opened",
    amount_usd: "29.00",
    claim: "iamyoungjohn-near-70dcc3c0fb6b.openrail.near",
    tx: "GqHLmGersVHFPbmKdPMoy4zsmPZydB5Lh2S4UdCsgSKr",
    time: 1794569180,
  },
  {
    type: "Invoice payment booked",
    amount_usd: "7.00",
    claim: "iamyoungjohn-near-a8787eb70f77.openrail.near",
    tx: "5bLrANGUiNQjPzRVscgTrfxRUV9bofifoN4t7Cwgj2fa",
    time: 1794555726,
  },
  {
    type: "Checkout paid",
    amount_usd: "3.00",
    claim: "iamyoungjohn-near-7364c747ed71.openrail.near",
    tx: "CoBU42EweGMtF2SqNxPwskkpL5tiBgpsr9skNDsk8jji",
    time: 1794500692,
  },
  {
    type: "Checkout paid",
    amount_usd: "10.00",
    claim: "iamyoungjohn-near-6a3990e7bd89.openrail.near",
    tx: "BbXG1j3fL345W4RF7Wtif5yvrfxyQr9mr5rvbbhup7HT",
    time: 1794423572,
  },
  {
    type: "Checkout paid",
    amount_usd: "1.00",
    claim: "iamyoungjohn-near-fcd7e0af87dd.openrail.near",
    tx: "5Xmn3nAuPSJrXSCwbPxaax7K2e9BeYUHTXA1vbanMcRG",
    time: 1794399100,
  },
  {
    type: "Checkout paid",
    amount_usd: "2.00",
    claim: "iamyoungjohn-near-8fe6b5802dce.openrail.near",
    tx: "YqSzD3xeKnair3pLBCQceH43cFasukWz166ZKXAEGQW",
    time: 1794374591,
  },
  {
    type: "Invoice payment booked",
    amount_usd: "3.99",
    claim: "iamyoungjohn-near-89357a7d3075.openrail.near",
    tx: "4pDnqFAbJzcr7dMs72wTGuuz6NWMhXa64XTy1EpHuRVW",
    time: 1794372183,
  },
  {
    type: "Checkout paid",
    amount_usd: "2.00",
    claim: "iamyoungjohn-near-172fc5bb6df1.openrail.near",
    tx: "6vCeNkTSLNHy1eveVwfHEL5VjjjHwMGdw4MNzJGSgrNk",
    time: 1794358029,
  },
  {
    type: "Invoice payment booked",
    amount_usd: "1.99",
    claim: "iamyoungjohn-near-11fee28e91ac.openrail.near",
    tx: "DxBKfTZkRop64i8oEY9B2oUCbrsYWuj2NhxbvJbxJkLH",
    time: 1794242626,
  },
  {
    type: "Late payment refunded",
    amount_usd: "2.00",
    claim: "c-15.openrail.near",
    tx: "AjhKYLSLrFVLuDbFUjXNdAcWHz5Cg9rprQxGqkghVnpr",
    time: 1794230732,
  },
  {
    type: "Checkout paid",
    amount_usd: "2.00",
    claim: "c-15.openrail.near",
    tx: "DbxPhsmyCVr9m3hEbwFNqvUAv7bBsSi4yPg6xhXzNPGx",
    time: 1794230723,
  },
];

export const nearTxUrl = (hash: string) => `https://nearblocks.io/txns/${hash}`;
export const nearAccountUrl = (account: string) => `https://nearblocks.io/address/${account}`;
