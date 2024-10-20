import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { useState } from "react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <div className="h-screen w-full flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <TopNav />
      <NavSheet />
      <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <UserMenu />
      </div>
    </header>
  );
}

function TopNav() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {isSignedIn && (
        <>
          <Link
            to="/flash"
            className="transition-colors hover:text-foreground"
            activeProps={() => ({ className: cn("text-foreground") })}
            inactiveProps={() => ({ className: cn("text-muted-foreground") })}
          >
            Flash
          </Link>
          <Link
            to="/stats"
            className="transition-colors hover:text-foreground"
            activeProps={() => ({ className: cn("text-foreground") })}
            inactiveProps={() => ({ className: cn("text-muted-foreground") })}
          >
            Stats
          </Link>
        </>
      )}
    </nav>
  );
}

function NavSheet() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {isSignedIn && (
            <>
              <Link
                to="/flash"
                className="hover:text-foreground"
                inactiveProps={() => ({ className: "text-muted-foreground" })}
                onClick={() => setOpen(false)}
              >
                Flash
              </Link>
              <Link
                to="/stats"
                className="hover:text-foreground"
                inactiveProps={() => ({ className: "text-muted-foreground" })}
                onClick={() => setOpen(false)}
              >
                Stats
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function UserMenu() {
  const { signOut } = useAuth();
  const { isLoaded, user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{isLoaded && user?.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
