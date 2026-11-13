/** Where the landing page's menus lead. One place, so the nav and the footer never disagree. */

const REPO = "https://github.com/deyoungjohn/openrail";
const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface MenuItem {
  label: string;
  href: string;
  note: string;
  external?: boolean;
}

export const MENUS: { label: string; items: MenuItem[] }[] = [
  {
    label: "Products",
    items: [
      { label: "Invoices", href: "/#invoices", note: "Bill a client; they pay from any chain" },
      { label: "Checkout", href: "/#checkout", note: "A hosted stablecoin checkout for stores" },
      { label: "Agent MCP", href: "/#agents", note: "Let an AI agent issue and track payments" },
    ],
  },
  {
    label: "Use cases",
    items: [
      {
        label: "Shopify",
        href: `${REPO}/tree/main/docs/src/modules/shopify`,
        note: "Pay with stablecoins on your Shopify store",
        external: true,
      },
      {
        label: "WooCommerce",
        href: `${REPO}/tree/main/docs/src/modules/checkout`,
        note: "A plugin for WordPress stores",
        external: true,
      },
      { label: "Add more", href: "/#any-store", note: "Any other store: one API call" },
    ],
  },
  {
    label: "Developers",
    items: [
      { label: "Developer hub", href: "/app/developers", note: "API keys and webhooks" },
      {
        label: "Documentation",
        href: `${REPO}/tree/main/docs`,
        note: "Everything, in the repo",
        external: true,
      },
      {
        label: "Quickstart",
        href: `${REPO}/blob/main/docs/src/core/api.md`,
        note: "Your first invoice in minutes",
        external: true,
      },
      {
        label: "API reference",
        href: API === "" ? `${REPO}/blob/main/services/api/openapi.json` : `${API}/v1/openapi.json`,
        note: "OpenAPI 3.1",
        external: true,
      },
      { label: "llms.txt", href: "/llms.txt", note: "Openrail for language models" },
      { label: "GitHub", href: REPO, note: "Open source", external: true },
    ],
  },
];

export const REPO_URL = REPO;
