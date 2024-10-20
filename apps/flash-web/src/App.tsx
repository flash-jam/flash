import { ThemeProvider } from "@/components/ui/theme-provider/theme-provider";
import { clerk } from "@/lib/auth";
import { queryClient } from "@/query-client";
import { routeTree } from "@/routeTree.gen";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({ routeTree });

export function App() {
  return (
    <ClerkProvider publishableKey={clerk.PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
