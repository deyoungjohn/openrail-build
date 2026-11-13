"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { dashClient } from "@/lib/client";
import { copy } from "@/copy";
import { Button } from "../ui/button";
import { PageSkeleton } from "../ui/page-skeleton";
import { ErrorState } from "../ui/state";
import { useAuth } from "./auth-provider";
import { ErrorNote } from "@/components/ui/error-note";

/** Dashboard content only renders for a signed-in business. */
export function AuthGate({ children }: { children: ReactNode }) {
  const { state, signIn, hint, cancelSignIn, retry } = useAuth();
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  // Right after signing in (not on a reload of a signed-in page): a new business starts at onboarding, an existing
  // one at the dashboard, whatever page the sign-in started from.
  const justSignedIn = useRef(false);
  useEffect(() => {
    if (state.status !== "signedIn" || !justSignedIn.current) return;
    justSignedIn.current = false;
    void dashClient.business
      .get()
      .then((b) => {
        const isNew = b.legal_name.trim() === "" || b.payout_account.trim() === "";
        router.replace(isNew ? "/app/onboarding" : "/app");
      })
      .catch(() => router.replace("/app/onboarding"));
  }, [state.status, router]);

  if (state.status === "loading") return <PageSkeleton />;
  if (state.status === "error")
    return (
      <div className="surface-card">
        <ErrorState title={copy.auth.errorTitle} body={copy.auth.errorBody} onRetry={retry} />
      </div>
    );
  if (state.status === "signedOut")
    return (
      <div className="surface-card mx-auto max-w-md space-y-4 p-8">
        <h1 className="text-[24px] leading-8 font-bold">{copy.auth.title}</h1>
        <p className="text-[15px]">{copy.auth.body}</p>
        {state.failed ? (
          <ErrorNote>
            {state.detail ? `${copy.auth.walletSaid}: ${state.detail}. ` : ""}
            {state.failed === "unsupported"
              ? copy.auth.unsupported
              : state.failed === "timeout"
                ? copy.auth.timeout
                : copy.auth.failed}
          </ErrorNote>
        ) : null}
        {busy && hint ? <p className="caption">{hint}</p> : null}
        <div className="flex items-center gap-3">
          <Button
            loading={busy}
            onClick={async () => {
              setBusy(true);
              justSignedIn.current = true;
              try {
                await signIn();
              } finally {
                setBusy(false);
              }
            }}
          >
            {copy.wallet.signIn}
          </Button>
          {busy ? (
            <Button variant="secondary" onClick={cancelSignIn}>
              {copy.auth.cancel}
            </Button>
          ) : null}
        </div>
      </div>
    );
  return <>{children}</>;
}
