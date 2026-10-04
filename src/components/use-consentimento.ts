"use client";

import { useSyncExternalStore } from "react";
import { acompanharConsentimento, consentimentoNoServidor, lerConsentimento } from "@/lib/consentimento";

export function useConsentimento() {
  return useSyncExternalStore(acompanharConsentimento, lerConsentimento, consentimentoNoServidor);
}
