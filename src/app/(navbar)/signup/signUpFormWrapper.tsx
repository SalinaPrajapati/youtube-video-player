"use client";

import ReduxProvider from "@/store/ReduxProvider";
import UserAuthForm from "@/components/forms/SignUpForm";

export default function ClientLoginFormWrapper() {
  return (
    <ReduxProvider>
      <UserAuthForm />
    </ReduxProvider>
  );
}