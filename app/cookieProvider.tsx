// src/providers/cookie-provider.tsx
"use client";

import { CookiesProvider } from "react-cookie";
import React from "react";

export default function NextCookiesProvider({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      {children}
    </CookiesProvider>
  );
}
