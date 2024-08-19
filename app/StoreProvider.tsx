"use client";

import { AppStore, makeStore } from "@/lib/redux/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  // PersistGate will return a blank page in Next.js
  // const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
