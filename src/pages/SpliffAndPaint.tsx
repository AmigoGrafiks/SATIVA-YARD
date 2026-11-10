import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Phone,
  Mail,
  ShieldAlert,
  ChevronDown,
  Users,
  User,
  Minus,
  Plus,
  Crown,
  Palette,
  Music,
  HeartHandshake,
  Copy,
  Check,
  X,
  Info,
  ArrowLeft
} from 'lucide-react';
import {
  SPLIFF_AND_PAINT_EVENT,
  EventPackage,
  formatEventBookingMessage,
  getEventWhatsAppUrl
} from '../data/events';
import { WHATSAPP_NUMBER } from '../data';
import { cn } from '../lib/utils';

export default function SpliffAndPaint() {
  const event = SPLIFF_AND_PAINT_EVENT;

  // Customer name & per-package attendee counts
  const [customerName, setCustomerName] = useState('');
  const [attendeesByPackage, setAttendeesByPackage] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    event.packages.forEach((pkg) => {
      initial[pkg.id] = pkg.defaultAttendees;
    });
    return initial;
  });

  // Active package in the native <dialog closedby="any"> booking customizer modal
  const [activePackage, setActivePackage] = useState<EventPackage>(event.packages[0]);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Modern Web Guidance: light-dismiss-a-dialog fallback for browsers without native closedBy support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (e: MouseEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        if (e.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;

        if (isDialogContent) return;
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => dialog.removeEventListener('click', handleBackdropClick);
  }, []);

  const updatePackageAttendees = (packageId: string, nextCount: number) => {
    setAttendeesByPackage((prev) => ({
      ...prev,
      [packageId]: Math.max(1, Math.min(20, nextCount))
    }));
  };

  const getPriceLabelForBooking = (pkg: EventPackage) => {
    return pkg.priceSuffix ? `${pkg.priceDisplay} ${pkg.priceSuffix}` : pkg.priceDisplay;
  };

  const handleBookPackage = (pkg: EventPackage, openWhatsAppImmediately = true) => {
    setActivePackage(pkg);
    const attendees = attendeesByPackage[pkg.id] ?? pkg.defaultAttendees;
    const whatsappUrl = getEventWhatsAppUrl({
      eventTitle: 'Spliff & Paint',
      packageName: pkg.name,
      packagePriceDisplay: getPriceLabelForBooking(pkg),
      eventDate: event.dateDisplay,
      attendees,
      customerName
    });

    if (openWhatsAppImmediately) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    if (dialogRef.current && typeof dialogRef.current.showModal === 'function' && !dialogRef.current.open) {
      try {
        dialogRef.current.showModal();
      } catch {
        // Fallback in test environments where showModal may not be fully implemented
      }
    }
  };

  const handleOpenBookingModal = (pkg?: EventPackage) => {
    if (pkg) {
      setActivePackage(pkg);
    }
    if (dialogRef.current && typeof dialogRef.current.showModal === 'function' && !dialogRef.current.open) {
      try {
        dialogRef.current.showModal();
      } catch {
        // Ignore in non-browser test runners
      }
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current && typeof dialogRef.current.close === 'function') {
      dialogRef.current.close();
    }
  };

  const activeAttendees = attendeesByPackage[activePackage.id] ?? activePackage.defaultAttendees;
  const activeMessage = formatEventBookingMessage({
    eventTitle: 'Spliff & Paint',
    packageName: activePackage.name,
    packagePriceDisplay: getPriceLabelForBooking(activePackage),
    eventDate: event.dateDisplay,
    attendees: activeAttendees,
    customerName
  });
  const activeWhatsAppUrl = getEventWhatsAppUrl({
    eventTitle: 'Spliff & Paint',
    packageName: activePackage.name,
    packagePriceDisplay: getPriceLabelForBooking(activePackage),
    eventDate: event.dateDisplay,
    attendees: activeAttendees,
    customerName
  });

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(activeMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      // Clipboard API fallback
    }
  };

  // JSON-LD Structured Data using verified event details only
  const eventStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Sativa Yard Presents: Spliff & Paint — From Clouds to Canvas',
    description:
      'Spliff & Paint is a creative lifestyle experience by Sativa Yard combining art, painting, music and social interaction at Common Grounds, Maboneng, Johannesburg.',
    startDate: event.isoDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [event.heroImage],
    location: {
      '@type': 'Place',
      name: 'Common Grounds, Maboneng',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Maboneng, Johannesburg',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Sativa Yard',
      telephone: '+27 50 011 2959',
      email: 'hello@sativayard.co.za'
    },
    offers: event.packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: String(pkg.price),
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      url: 'https://sativayard.co.za/events/spliff-and-paint'
    }))
  };

  const pillarIcons = [Palette, Music, Users, HeartHandshake];

  return (
    <div className="bg-cream text-forest min-h-screen pb-24 md:pb-0">
      {/* PHASE 9: SEO & Structured Data */}
      <Helmet>
        <title>Spliff &amp; Paint: From Clouds to Canvas | Sativa Yard Events Johannesburg</title>
        <meta
          name="description"
          content="Sativa Yard Presents SPLIFF & PAINT — From Clouds to Canvas on 28 November 2026 at Common Grounds, Maboneng, Johannesburg. Explore 4 curated painting experience packages (R150–R450) and book via WhatsApp."
        />
        <meta
          name="keywords"
          content="Spliff and Paint, Sativa Yard, From Clouds to Canvas, Common Grounds Maboneng, Johannesburg Paint Experience, Sativa Yard Events, 28 November 2026"
        />
        <meta
          property="og:title"
          content="SATIVA YARD PRESENTS: SPLIFF & PAINT — From Clouds to Canvas"
        />
        <meta
          property="og:description"
          content="Join Sativa Yard on 28 November 2026 at Common Grounds, Maboneng, Johannesburg for a creative lifestyle experience combining art, painting, music and social connection. Packages from R150."
        />
        <meta property="og:image" content={event.heroImage} />
        <meta property="og:type" content="event" />
        <meta property="og:url" content="https://sativayard.co.za/events/spliff-and-paint" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(eventStructuredData)}</script>
      </Helmet>

      {/* PHASE 2: EVENT HERO SECTION */}
      <section className="relative bg-forest text-cream overflow-hidden border-b border-brass/25">
        {/* Background Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full bg-lime-300/10 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:py-24 relative z-10">
          {/* Breadcrumb back link */}
          <div className="mb-8">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Events Overview
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Editorial Copy */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex flex-wrap items-center gap-2.5 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-accent text-xs font-black uppercase tracking-[0.24em]">
                  {event.presenter}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-brass text-forest text-[10px] font-black uppercase tracking-widest">
                  18+ Lifestyle Event
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-cream tracking-tight leading-[0.98] mb-4">
                {event.title}
              </h1>

              <p className="text-lg sm:text-2xl font-black uppercase tracking-[0.28em] text-accent mb-8">
                {event.tagline}
              </p>

              {/* Verified Date & Venue Pills */}
              <div className="grid sm:grid-cols-2 gap-4 mb-9 max-w-2xl">
                <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-cream/60 mb-0.5">
                      Event Date
                    </span>
                    <span className="text-base font-black text-cream">
                      {event.dateDisplay}.
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brass/20 border border-brass/40 text-brass flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-cream/60 mb-0.5">
                      Venue
                    </span>
                    <span className="text-sm sm:text-base font-black text-cream leading-snug">
                      {event.venue}.
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-lime-300 text-forest font-black px-8 py-4.5 rounded-2xl text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-black/20"
                >
                  EXPLORE PACKAGES
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenBookingModal(event.packages[0])}
                  className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 text-cream border border-cream/25 font-black px-8 py-4.5 rounded-2xl text-xs sm:text-sm uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-accent" />
                  BOOK YOUR EXPERIENCE
                </button>
              </div>
            </div>

            {/* Hero Poster Card — resized canvas to fit the full 682x1024 poster */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] lg:max-w-full rounded-[28px] overflow-hidden border-2 border-white/20 shadow-2xl bg-forest">
                {/* Modern Web Guidance: optimize-image-priority — elevate LCP hero image with fetchPriority="high" */}
                <img
                  src={event.heroImage}
                  alt="Sativa Yard Presents Spliff & Paint — From Clouds to Canvas Official Event Poster (28 November 2026)"
                  fetchPriority="high"
                  width={682}
                  height={1024}
                  className="w-full h-auto block object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 3: ABOUT THE EXPERIENCE */}
      <section className="py-16 md:py-24 bg-white border-b border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block py-1.5 px-4 rounded-full bg-forest/5 text-forest text-[11px] font-black uppercase tracking-[0.2em] mb-4 border border-forest/10">
                About The Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-forest tracking-tight leading-[1.08] mb-6">
                Where Creative Expression Meets Lifestyle Culture.
              </h2>
              <div className="h-1 w-20 bg-brass rounded-full" />
            </div>

            <div className="lg:col-span-7 space-y-5">
              {event.aboutParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-forest/80 leading-relaxed font-medium"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* 4 Pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {event.experiencePillars.map((pillar, idx) => {
              const IconComponent = pillarIcons[idx % pillarIcons.length];
              return (
                <div
                  key={pillar.title}
                  className="bg-cream rounded-3xl p-7 border border-forest/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-forest text-accent flex items-center justify-center mb-5 shadow-sm">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-black text-forest mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-forest/75 leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHASE 4 & PHASE 5: TICKET AND EXPERIENCE PACKAGES + WHATSAPP BOOKING */}
      <section id="packages" className="py-16 md:py-24 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-forest text-accent text-[11px] font-black uppercase tracking-[0.22em] mb-4">
              <Sparkles className="h-3.5 w-3.5 text-brass" />
              Ticket &amp; Experience Packages
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              Choose Your Canvas Experience
            </h2>
            <p className="text-forest/75 text-base sm:text-lg font-medium leading-relaxed">
              Select from four curated packages. Every booking connects directly with Sativa Yard on WhatsApp with your package details pre-filled.
            </p>
          </div>

          {/* Guest Details Bar (Optional before clicking any package button) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-forest/15 shadow-sm mb-10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800 mb-1">
                  <User className="h-3.5 w-3.5" />
                  Personalise Your Booking Message
                </span>
                <p className="text-xs sm:text-sm text-forest/75 font-medium">
                  Enter your name below and adjust the attendee counter on any package card to automatically include your details in your WhatsApp booking message.
                </p>
              </div>
              <div className="flex-1 max-w-sm">
                <label
                  htmlFor="booking-customer-name"
                  className="block text-[10px] font-black uppercase tracking-[0.2em] text-forest/70 mb-1.5"
                >
                  Your Name (Included in WhatsApp message)
                </label>
                <input
                  id="booking-customer-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Thabo Mokoena"
                  className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-cream/60 text-forest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Four Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 items-stretch">
            {event.packages.map((pkg) => {
              const isVip = Boolean(pkg.isVip);
              const attendeeCount = attendeesByPackage[pkg.id] ?? pkg.defaultAttendees;

              return (
                <article
                  key={pkg.id}
                  data-testid={`package-card-${pkg.id}`}
                  className={cn(
                    'rounded-[32px] overflow-hidden flex flex-col justify-between transition-all duration-300 border',
                    isVip
                      ? 'bg-forest text-cream border-2 border-brass shadow-2xl ring-1 ring-brass/40'
                      : 'bg-white text-forest border-forest/12 shadow-md hover:shadow-xl'
                  )}
                >
                  <div>
                    {/* Package Image Header */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-emerald-950">
                      {/* Modern Web Guidance: optimize-image-priority — use loading="lazy" alone for below-the-fold images */}
                      <img
                        src={pkg.image}
                        alt={`${pkg.name} — Spliff & Paint package`}
                        loading="lazy"
                        width={800}
                        height={550}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={cn(
                          'absolute inset-0 bg-gradient-to-t pointer-events-none',
                          isVip
                            ? 'from-forest via-forest/20 to-transparent'
                            : 'from-black/50 via-transparent to-transparent'
                        )}
                      />

                      {/* Package Badge */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md',
                            isVip
                              ? 'bg-brass text-forest shadow-sm'
                              : 'bg-forest/90 text-cream border border-white/15'
                          )}
                        >
                          {pkg.badge}
                        </span>
                        {isVip && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-forest text-[10px] font-black uppercase tracking-wider">
                            <Crown className="h-3 w-3" />
                            VIP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <p
                        className={cn(
                          'text-[10px] font-black uppercase tracking-[0.2em] mb-1.5',
                          isVip ? 'text-accent' : 'text-emerald-700'
                        )}
                      >
                        {pkg.tierLabel}
                      </p>

                      <h3
                        className={cn(
                          'font-serif text-2xl font-black tracking-tight mb-3',
                          isVip ? 'text-cream' : 'text-forest'
                        )}
                      >
                        {pkg.name}
                      </h3>

                      {/* Prominent Price Display */}
                      <div
                        className={cn(
                          'pb-4 mb-4 border-b flex items-baseline gap-2',
                          isVip ? 'border-white/15' : 'border-forest/10'
                        )}
                      >
                        <span
                          data-testid={`package-price-${pkg.id}`}
                          className={cn(
                            'text-4xl font-black tracking-tight',
                            isVip ? 'text-accent' : 'text-forest'
                          )}
                        >
                          {pkg.priceDisplay}
                        </span>
                        {pkg.priceSuffix ? (
                          <span
                            className={cn(
                              'text-xs font-extrabold uppercase tracking-widest',
                              isVip ? 'text-brass' : 'text-emerald-800'
                            )}
                          >
                            {pkg.priceSuffix}
                          </span>
                        ) : (
                          <span
                            className={cn(
                              'text-xs font-semibold',
                              isVip ? 'text-cream/65' : 'text-forest/60'
                            )}
                          >
                            per package
                          </span>
                        )}
                      </div>

                      <p
                        className={cn(
                          'text-xs sm:text-sm leading-relaxed mb-5 font-medium',
                          isVip ? 'text-cream/80' : 'text-forest/75'
                        )}
                      >
                        {pkg.shortDescription}
                      </p>

                      {/* Detailed Inclusions Checklist */}
                      <div className="mb-6">
                        <span
                          className={cn(
                            'block text-[10px] font-black uppercase tracking-[0.2em] mb-3',
                            isVip ? 'text-brass' : 'text-forest/60'
                          )}
                        >
                          Package Inclusions
                        </span>
                        <ul className="space-y-2.5" aria-label={`${pkg.name} inclusions`}>
                          {pkg.inclusions.map((inclusion) => (
                            <li
                              key={inclusion.text}
                              className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold leading-snug"
                            >
                              <CheckCircle2
                                className={cn(
                                  'h-4 w-4 shrink-0 mt-0.5',
                                  isVip ? 'text-accent' : 'text-emerald-700'
                                )}
                              />
                              <span className={isVip ? 'text-cream/95' : 'text-forest'}>
                                {inclusion.text}
                                {inclusion.requiresComplianceReview && (
                                  <span
                                    title="Flagged for 18+ legal and age-compliance review before public fulfilment"
                                    className={cn(
                                      'ml-1.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider align-middle',
                                      isVip
                                        ? 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                                    )}
                                  >
                                    18+ Review
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Attendee Stepper + BOOK THIS PACKAGE Button */}
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2">
                    <div
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-3.5 py-2 mb-3.5 border',
                        isVip
                          ? 'bg-white/5 border-white/15 text-cream'
                          : 'bg-cream border-forest/10 text-forest'
                      )}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 opacity-75" />
                        Attendees
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updatePackageAttendees(pkg.id, attendeeCount - 1)}
                          aria-label={`Decrease attendees for ${pkg.name}`}
                          className={cn(
                            'w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer',
                            isVip
                              ? 'bg-white/10 hover:bg-white/20 text-cream'
                              : 'bg-white hover:bg-forest/10 text-forest border border-forest/15'
                          )}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span
                          data-testid={`attendees-${pkg.id}`}
                          className="w-6 text-center text-xs font-black"
                        >
                          {attendeeCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => updatePackageAttendees(pkg.id, attendeeCount + 1)}
                          aria-label={`Increase attendees for ${pkg.name}`}
                          className={cn(
                            'w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer',
                            isVip
                              ? 'bg-white/10 hover:bg-white/20 text-cream'
                              : 'bg-white hover:bg-forest/10 text-forest border border-forest/15'
                          )}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      data-testid={`book-package-${pkg.id}`}
                      onClick={() => handleBookPackage(pkg, true)}
                      className={cn(
                        'w-full py-4 px-5 rounded-2xl font-black text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md',
                        isVip
                          ? 'bg-accent hover:bg-lime-300 text-forest shadow-black/25'
                          : 'bg-forest hover:bg-emerald-900 text-cream'
                      )}
                    >
                      <MessageCircle className="h-4 w-4" />
                      BOOK THIS PACKAGE
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* PHASE 10: Legal & Age-Compliance Review Flag Banner */}
          <div
            data-testid="compliance-review-banner"
            className="mt-10 rounded-3xl bg-amber-50 border border-amber-300/80 p-6 sm:p-7 text-amber-950 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-900 mb-1.5">
                  Legal &amp; Age-Compliance Review Notice (18+ Only)
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed font-medium text-amber-950/90">
                  {event.complianceNotice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 6: EVENT INFORMATION SECTION */}
      <section id="event-info" className="py-16 md:py-24 bg-white border-t border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block py-1.5 px-4 rounded-full bg-forest/5 text-forest text-[11px] font-black uppercase tracking-[0.2em] mb-4 border border-forest/10">
              Essential Details
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              Event Information &amp; Booking Guide
            </h2>
            <p className="text-forest/75 text-base sm:text-lg font-medium">
              Everything verified for Spliff &amp; Paint at Common Grounds, Maboneng, plus step-by-step instructions to complete your reservation via WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Date, Venue, Directions, Contact */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {/* Event Date Card */}
              <div className="bg-cream rounded-3xl p-7 border border-forest/10 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-forest text-accent flex items-center justify-center mb-5">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 mb-1">
                    Event Date
                  </span>
                  <h3 className="font-serif text-2xl font-black text-forest mb-2">
                    {event.dateDisplay}
                  </h3>
                  <p className="text-xs text-forest/70 leading-relaxed font-medium">
                    Door opening and session schedule times are marked for organiser confirmation and will be shared upon WhatsApp booking confirmation.
                  </p>
                </div>
              </div>

              {/* Venue Card */}
              <div className="bg-cream rounded-3xl p-7 border border-forest/10 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-forest text-brass flex items-center justify-center mb-5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 mb-1">
                    Venue &amp; Location
                  </span>
                  <h3 className="font-serif text-2xl font-black text-forest mb-2">
                    Common Grounds
                  </h3>
                  <p className="text-sm font-bold text-forest/85 mb-2">
                    Maboneng, Johannesburg
                  </p>
                  <p className="text-xs text-forest/70 leading-relaxed font-medium mb-4">
                    Exact street number and check-in gate details are pending organiser verification. Use the Google Maps link below for directions to Common Grounds, Maboneng.
                  </p>
                </div>
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="google-maps-directions-link"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-forest hover:bg-emerald-900 text-cream text-xs font-black uppercase tracking-widest transition-colors"
                >
                  Google Maps Directions
                  <ExternalLink className="h-3.5 w-3.5 text-accent" />
                </a>
              </div>

              {/* Booking Contact Card */}
              <div className="sm:col-span-2 bg-cream rounded-3xl p-7 border border-forest/10">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 mb-2">
                  Official Sativa Yard Booking Contact
                </span>
                <h3 className="font-serif text-2xl font-black text-forest mb-4">
                  Direct Organiser Channels
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href={`https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-forest/10 hover:border-forest/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-forest/60">
                        WhatsApp &amp; Phone
                      </span>
                      <span className="text-sm font-black text-forest">
                        +27 50 011 2959
                      </span>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@sativayard.co.za"
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-forest/10 hover:border-forest/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-forest/60">
                        Email Enquiries
                      </span>
                      <span className="text-sm font-black text-forest">
                        hello@sativayard.co.za
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Step-by-Step Booking Instructions */}
            <div className="lg:col-span-5 bg-forest text-cream rounded-[32px] p-8 sm:p-10 border border-brass/30 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-accent/15 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-accent/30">
                  Seamless WhatsApp Journey
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-cream mb-6">
                  How to Book Your Package
                </h3>

                <ol className="space-y-5">
                  {[
                    {
                      step: '01',
                      title: 'Select Your Experience Tier',
                      desc: 'Compare The Vibe Starter (R150), The Double Trouble (R300), The Love & Art Package (R350 per couple), or The Green Elite (R450).'
                    },
                    {
                      step: '02',
                      title: 'Add Name & Attendee Count',
                      desc: 'Optionally enter your name and confirm the number of attendees so your booking message is personalised.'
                    },
                    {
                      step: '03',
                      title: 'Send Pre-Filled WhatsApp Request',
                      desc: 'Click "Book This Package" to launch WhatsApp (+27 50 011 2959) with all package and event details ready to review, edit, and send.'
                    },
                    {
                      step: '04',
                      title: 'Receive Organiser Confirmation',
                      desc: 'The Sativa Yard team will reply on WhatsApp to confirm availability and assist you with completing your reservation.'
                    }
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-xl bg-accent text-forest font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-cream mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-cream/75 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <a
                  href="#packages"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-accent hover:bg-lime-300 text-forest font-black text-xs uppercase tracking-[0.18em] transition-colors"
                >
                  Choose a Package Above
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 7: FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-16 md:py-24 bg-cream border-t border-forest/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-4 rounded-full bg-forest/5 text-forest text-[11px] font-black uppercase tracking-[0.2em] mb-4 border border-forest/10">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-forest/75 text-base font-medium">
              Answers based strictly on verified Spliff &amp; Paint event details. Unverified items are transparently flagged for organiser confirmation.
            </p>
          </div>

          {/* Modern Web Guidance: search-hidden-content — native <details> with shared name attribute for mutually exclusive accessible accordion that works with Find-in-Page */}
          <div className="space-y-4">
            {event.faqs.map((faq, idx) => (
              <details
                key={faq.id}
                name="spliff-paint-faq"
                open={idx === 0}
                className="group bg-white rounded-3xl border border-forest/12 shadow-sm overflow-hidden transition-all"
              >
                <summary className="flex items-center justify-between gap-4 p-6 sm:p-7 cursor-pointer list-none font-serif text-lg sm:text-xl font-black text-forest select-none">
                  <span>{faq.question}</span>
                  <span className="w-9 h-9 rounded-full bg-cream border border-forest/10 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                    <ChevronDown className="h-4 w-4 text-forest" />
                  </span>
                </summary>
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-forest/5 text-sm sm:text-base text-forest/80 leading-relaxed space-y-3">
                  <p>{faq.answer}</p>
                  {faq.organiserNote && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs font-medium text-amber-950 flex items-start gap-2.5">
                      <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{faq.organiserNote}</span>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY MOBILE BOOKING BAR (PHASE 8) */}
      <div
        data-testid="sticky-mobile-booking-bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest/95 backdrop-blur-md text-cream border-t border-brass/30 px-4 py-3 shadow-2xl"
      >
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-accent">
              28 Nov 2026 • Maboneng
            </span>
            <span className="text-sm font-black text-cream">
              Packages from R150
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#packages"
              className="px-3.5 py-2.5 rounded-xl bg-white/10 text-cream text-[11px] font-bold uppercase tracking-wider border border-white/15"
            >
              Packages
            </a>
            <button
              type="button"
              onClick={() => handleOpenBookingModal(activePackage)}
              className="px-4 py-2.5 rounded-xl bg-accent text-forest text-[11px] font-black uppercase tracking-wider shadow-md cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* NATIVE LIGHT-DISMISS BOOKING DIALOG (Modern Web Guidance: light-dismiss-a-dialog) */}
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as any)}
        aria-labelledby="booking-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[32px] bg-cream text-forest p-0 border border-forest/20 shadow-2xl backdrop:bg-forest/70 backdrop:backdrop-blur-xs"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-forest/10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 block mb-1">
                WhatsApp Booking Concierge
              </span>
              <h2
                id="booking-dialog-title"
                className="font-serif text-2xl font-black text-forest"
              >
                Complete Your Booking
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCloseDialog}
              aria-label="Close booking dialog"
              className="p-2 rounded-full hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-5 space-y-4">
            {/* Package Selector inside Modal */}
            <div>
              <label
                htmlFor="modal-package-select"
                className="block text-[10px] font-black uppercase tracking-[0.18em] text-forest/70 mb-1.5"
              >
                Selected Experience Package
              </label>
              <select
                id="modal-package-select"
                value={activePackage.id}
                onChange={(e) => {
                  const found = event.packages.find((p) => p.id === e.target.value);
                  if (found) setActivePackage(found);
                }}
                className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-white text-forest text-sm font-bold focus:outline-none focus:ring-2 focus:ring-forest"
              >
                {event.packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — {getPriceLabelForBooking(pkg)}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Name Input + Attendees inside Modal */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="modal-customer-name"
                  className="block text-[10px] font-black uppercase tracking-[0.18em] text-forest/70 mb-1.5"
                >
                  Customer Name (Optional)
                </label>
                <input
                  id="modal-customer-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-white text-forest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-attendees-input"
                  className="block text-[10px] font-black uppercase tracking-[0.18em] text-forest/70 mb-1.5"
                >
                  Attendees
                </label>
                <input
                  id="modal-attendees-input"
                  type="number"
                  min={1}
                  max={20}
                  value={activeAttendees}
                  onChange={(e) =>
                    updatePackageAttendees(activePackage.id, parseInt(e.target.value, 10) || 1)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-white text-forest text-sm font-black focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            {/* Live Pre-filled WhatsApp Message Preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-forest/70">
                  Pre-Filled WhatsApp Message (Editable in WhatsApp)
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-forest cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy Text
                    </>
                  )}
                </button>
              </div>
              <pre
                data-testid="whatsapp-message-preview"
                className="p-4 rounded-2xl bg-forest text-cream font-mono text-xs whitespace-pre-wrap leading-relaxed border border-forest/20"
              >
                {activeMessage}
              </pre>
            </div>
          </div>

          <div className="pt-4 border-t border-forest/10 flex flex-col sm:flex-row gap-3">
            <a
              href={activeWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="modal-whatsapp-confirm-link"
              className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-forest hover:bg-emerald-900 text-cream font-black text-xs uppercase tracking-[0.18em] transition-colors shadow-lg"
            >
              <MessageCircle className="h-4 w-4 text-accent" />
              Open in WhatsApp (+27 50 011 2959)
            </a>
            <button
              type="button"
              onClick={handleCloseDialog}
              className="py-4 px-5 rounded-2xl bg-white hover:bg-forest/5 text-forest border border-forest/15 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
