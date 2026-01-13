"use client";

import "@/lib/amplify"; // ✅ runs Amplify.configure ONCE

import StoreProvider from "@/state/redux";
import AuthProvider from "@/app/(auth)/AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
