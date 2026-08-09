import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteNotFound() {
  return (
    <div className="section-padding">
      <div className="container flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
          <SearchX className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-sm font-semibold text-emerald-600">404</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          We couldn't find that page
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          The page you're looking for may have been moved or no longer exists.
          Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
