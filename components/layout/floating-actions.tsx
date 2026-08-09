"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";
import { SITE } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft-lg transition-colors hover:bg-muted"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={buildWhatsAppLink(
          SITE.whatsapp,
          "Assalam-o-Alaikum, I have a question about Al Jannat Welfare School."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-30" />
      </motion.a>
    </div>
  );
}
