import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
});

function Authenticated() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Outlet /> : <RedirectToSignIn />;
}
