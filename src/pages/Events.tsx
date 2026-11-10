import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Palette,
  Music,
  Users,
  CheckCircle2,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { SPLIFF_AND_PAINT_EVENT, getEventWhatsAppUrl } from '../data/events';

export default function Events() {
  const event = SPLIFF_AND_PAINT_EVENT;

  const generalInquiryUrl = getEventWhatsAppUrl({
    eventTitle: 'Spliff & Paint',
    packageName: 'The Vibe Starter',
    packagePriceDisplay: 'R150',
    eventDate: event.dateDisplay,
    attendees: 1
  });

  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <Helmet>
        <title>Events | Sativa Yard — Spliff & Paint Johannesburg</title>
        <meta
          name="description"
          content="Explore curated cultural and creative lifestyle events by Sativa Yard in Johannesburg. Featured event: Spliff & Paint (From Clouds to Canvas) on 28 November 2026 at Common Grounds, Maboneng."
        />
        <meta
          name="keywords"
          content="Sativa Yard Events, Spliff and Paint, Maboneng Events, Common Grounds Johannesburg, Sip and Paint Johannesburg, Creative Lifestyle Events SA"
        />
        <meta property="og:title" content="Events | Sativa Yard Presents: Spliff & Paint" />
        <meta
          property="og:description"
          content="From Clouds to Canvas — 28 November 2026 at Common Grounds, Maboneng, Johannesburg. Explore curated experience packages from R150 to R450."
        />
        <meta property="og:image" content={event.heroImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Editorial Header Banner */}
      <section className="relative bg-forest text-cream py-16 md:py-24 overflow-hidden border-b border-brass/20">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-lime-300/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-accent text-[11px] font-black uppercase tracking-[0.22em] mb-6 border border-white/15">
              <Sparkles className="h-3.5 w-3.5 text-brass" />
              Sativa Yard Cultural Experiences
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-black tracking-tight text-cream leading-[1.05] mb-6">
              Curated Lifestyle &amp; Creative Events.
            </h1>
            <p className="text-base sm:text-lg text-cream/80 leading-relaxed font-medium max-w-2xl">
              Step into Sativa Yard’s live experiences in Johannesburg—where expressive art, music, and community connection come together in thoughtfully hosted spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event Showcase */}
      <section className="py-14 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700 mb-2">
              Featured Upcoming Experience
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-forest tracking-tight">
              2026 Flagship Showcase
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-full bg-emerald-900/5 border border-forest/15 text-forest text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Bookings Open via WhatsApp
          </span>
        </div>

        {/* Featured Event Card */}
        <article className="bg-forest text-cream rounded-[36px] overflow-hidden shadow-2xl border border-forest/15 grid lg:grid-cols-12 items-center">
          {/* Poster Column — fits the entire vertical poster */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex items-center justify-center bg-emerald-950/60">
            <div className="w-full max-w-[420px] rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-forest">
              <img
                src={event.heroImage}
                alt="Sativa Yard Presents Spliff & Paint — From Clouds to Canvas Official Poster"
                fetchPriority="high"
                width={682}
                height={1024}
                className="w-full h-auto block object-contain"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-accent mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brass" />
                  {event.dateDisplay}
                </span>
                <span className="text-cream/30">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brass" />
                  {event.venue}
                </span>
              </div>

              <h3 className="font-serif text-4xl sm:text-5xl font-black text-cream tracking-tight leading-none mb-3">
                {event.title}
              </h3>
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.25em] text-brass mb-6">
                {event.tagline}
              </p>

              <p className="text-cream/80 text-sm sm:text-base leading-relaxed mb-8">
                {event.aboutParagraphs[0]}
              </p>

              {/* Quick Package Tier Summary */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">
                    4 Experience Packages Available
                  </span>
                  <span className="text-xs font-bold text-cream/80">
                    From R150 – R450
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                  {event.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-xl bg-forest/70 border border-white/10 p-3 flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-bold text-cream/90 leading-snug mb-1">
                        {pkg.name}
                      </span>
                      <span className="text-sm font-black text-accent">
                        {pkg.priceDisplay}
                        {pkg.priceSuffix ? (
                          <span className="block text-[10px] font-semibold text-cream/60">
                            {pkg.priceSuffix}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events/spliff-and-paint"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-lime-300 text-forest font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-[0.18em] transition-all shadow-lg"
              >
                Explore Event &amp; Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/events/spliff-and-paint#packages"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-cream border border-white/20 font-bold px-7 py-4 rounded-2xl text-xs uppercase tracking-[0.18em] transition-all"
              >
                Book Your Experience
              </Link>
            </div>
          </div>
        </article>

        {/* Experience Highlights Strip */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-3xl p-7 border border-forest/10 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-forest text-accent flex items-center justify-center mb-4">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-black text-forest mb-2">
              All Painting Supplies Included
            </h3>
            <p className="text-sm text-forest/75 leading-relaxed">
              Every package includes your canvas and complete painting kit so you can focus entirely on expressing your creativity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-forest/10 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-forest text-accent flex items-center justify-center mb-4">
              <Music className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-black text-forest mb-2">
              Music, Art &amp; Social Flow
            </h3>
            <p className="text-sm text-forest/75 leading-relaxed">
              Set at Common Grounds in Maboneng, Johannesburg, combining painting, curated soundscapes, snacks, and community interaction.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-forest/10 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-forest text-accent flex items-center justify-center mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-black text-forest mb-2">
              Direct WhatsApp Booking
            </h3>
            <p className="text-sm text-forest/75 leading-relaxed mb-3">
              Select your solo or couples package and connect straight with the Sativa Yard team on WhatsApp to confirm your spot.
            </p>
            <a
              href={generalInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-800 hover:text-forest"
            >
              Enquire on WhatsApp <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Compliance Note */}
        <div className="mt-10 rounded-2xl bg-amber-50/90 border border-amber-200/80 p-5 flex items-start gap-3.5 text-amber-950">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed font-medium">
            <strong className="font-bold uppercase tracking-wider">18+ &amp; Compliance Notice: </strong>
            {event.complianceNotice}
          </p>
        </div>
      </section>
    </div>
  );
}
