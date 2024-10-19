const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) throw new Error("Invalid auth config");

export const clerk = {
  PUBLISHABLE_KEY,
};
