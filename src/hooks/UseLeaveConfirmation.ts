// src/hooks/UseLeaveConfirmation.ts
"use client";

import { useEffect } from "react";

export function useLeaveConfirmation(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Required for Chrome
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeRouteChange = (e: any) => {
      const confirmed = confirm("Do you really want to leave this page?");
      if (!confirmed) {
        e.preventDefault();
        throw new Error("Route change aborted.");
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("routeChangeStart", handleBeforeRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("routeChangeStart", handleBeforeRouteChange);
    };
  }, [enabled]);
}
