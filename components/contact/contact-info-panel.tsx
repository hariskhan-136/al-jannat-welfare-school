import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/constants";

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        {children}
      </div>
    </div>
  );
}

export function ContactInfoPanel() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {/* Address */}
        <InfoCard icon={MapPin} label="Address">
          <a
            href={SITE.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 block text-sm font-medium text-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            {SITE.address}
          </a>
        </InfoCard>

        {/* Phone */}
        <InfoCard icon={Phone} label="Phone">
          <div className="mt-0.5 flex flex-col gap-1">
            {SITE.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-sm font-medium text-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                {phone}
              </a>
            ))}
          </div>
        </InfoCard>

        {/* Email */}
        <InfoCard icon={Mail} label="Email">
          <a
            href={`mailto:${SITE.email}`}
            className="mt-0.5 block text-sm font-medium text-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            {SITE.email}
          </a>
        </InfoCard>

        {/* Office Timing */}
        <InfoCard icon={Clock} label="Office Timing">
          <dl className="mt-1 space-y-0.5">
            {SITE.officeTimings.map((slot) => (
              <div key={slot.days} className="flex justify-between gap-3 text-sm">
                <dt className="text-muted-foreground">{slot.days}</dt>
                <dd className="font-medium text-foreground">{slot.hours}</dd>
              </div>
            ))}
          </dl>
        </InfoCard>
      </div>

      {/* Google Maps */}
      <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
        <iframe
          src={SITE.mapsEmbedUrl}
          title="Al Jannat Welfare School Nowshera — location map"
          width="100%"
          height="280"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Maps showing the school's location in Nowshera"
        />

        <a
          href={SITE.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border-t border-border bg-muted/50 py-2.5 text-xs font-semibold text-emerald-700 hover:bg-muted dark:text-emerald-400"
        >
          Open in Google Maps
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
