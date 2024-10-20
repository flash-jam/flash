import { useUser } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl">Welcom to Flash Cards</h1>
        <h2 className="text-2xl">
          {isLoaded && isSignedIn && user ? user?.fullName : "Welcome"}
        </h2>
      </div>
    </div>
  );
}
