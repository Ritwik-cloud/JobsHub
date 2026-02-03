"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store/store";
import { Toaster } from "react-hot-toast"; 

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use a ref to ensure the store is only created once on the client
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    // This creates the store the first time the provider renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      {children}
      <Toaster position="top-center" /> 
    </Provider>
  );
}