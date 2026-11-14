import { verifyMessage } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { describe, expect, it } from "vitest";
import { AuthError, AuthStore } from "./auth";

const recovers = (message: string, signature: string, address: string) =>
  verifyMessage({
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  });

describe("sign-in with an EVM wallet (EIP-191)", () => {
  it("opens a session for the lower-case address that signed the challenge", async () => {
    const account = privateKeyToAccount(generatePrivateKey());
    const id = account.address.toLowerCase();
    const store = new AuthStore();
    const c = store.challenge(id, "openrail.near");
    expect(c.message).toContain("Ethereum account");
    const signature = await account.signMessage({ message: c.message });
    const s = await store.verifyEvm({ accountId: id, signature, nonce: c.nonce }, recovers);
    expect(s.accountId).toBe(id);
  });

  it("refuses a signature from another key", async () => {
    const owner = privateKeyToAccount(generatePrivateKey());
    const other = privateKeyToAccount(generatePrivateKey());
    const id = owner.address.toLowerCase();
    const store = new AuthStore();
    const c = store.challenge(id, "openrail.near");
    const signature = await other.signMessage({ message: c.message });
    await expect(
      store.verifyEvm({ accountId: id, signature, nonce: c.nonce }, recovers),
    ).rejects.toBeInstanceOf(AuthError);
  });

  it("refuses an account that is not an EVM address", async () => {
    const account = privateKeyToAccount(generatePrivateKey());
    const store = new AuthStore();
    const c = store.challenge("alice.near", "openrail.near");
    const signature = await account.signMessage({ message: c.message });
    await expect(
      store.verifyEvm({ accountId: "alice.near", signature, nonce: c.nonce }, recovers),
    ).rejects.toBeInstanceOf(AuthError);
  });
});
