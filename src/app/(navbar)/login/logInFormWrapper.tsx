"use client";

import ReduxProvider from "@/store/ReduxProvider";
import UserAuthForm from "@/components/forms/SignInForm";

export default function ClientLoginFormWrapper() {
  return (
    <ReduxProvider>
      <UserAuthForm />
    </ReduxProvider>
  );
}