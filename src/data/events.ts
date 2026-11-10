import { WHATSAPP_NUMBER } from '../data';

export interface EventInclusion {
  text: string;
  requiresComplianceReview?: boolean;
}

export interface EventPackage {
  id: string;
  name: string;
  tierLabel: string;
  price: number;
  priceDisplay: string;
  priceSuffix?: string;
  defaultAttendees: number;
  shortDescription: string;
  image: string;
  isVip?: boolean;
  badge?: string;
  inclusions: EventInclusion[];
}

export interface EventFAQ {
  id: string;
  question: string;
  answer: string;
  organiserNote?: string;
}

export interface EventDetails {
  id: string;
  slug: string;
  presenter: string;
  title: string;
  tagline: string;
  dateDisplay: string;
  isoDate: string;
  venue: string;
  neighborhood: string;
  city: string;
  googleMapsUrl: string;
  heroImage: string;
  aboutParagraphs: string[];
  experiencePillars: {
    title: string;
    description: string;
  }[];
  packages: EventPackage[];
  faqs: EventFAQ[];
  complianceNotice: string;
  pendingConfirmationItems: string[];
}

export const SPLIFF_AND_PAINT_EVENT: EventDetails = {
  id: 'evt-spliff-and-paint-2026',
  slug: 'spliff-and-paint',
  presenter: 'SATIVA YARD PRESENTS',
  title: 'SPLIFF & PAINT',
  tagline: 'FROM CLOUDS TO CANVAS.',
  dateDisplay: '28 November 2026',
  isoDate: '2026-11-28',
  venue: 'Common Grounds, Maboneng, Johannesburg',
  neighborhood: 'Maboneng',
  city: 'Johannesburg',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Common+Grounds+Maboneng+Johannesburg',
  heroImage: '/events/spliff-and-paint-poster.jpg',
  aboutParagraphs: [
    'Spliff & Paint is a signature creative lifestyle experience curated by Sativa Yard in the heart of Maboneng, Johannesburg. Designed for art lovers, creatives, and social explorers alike, the session brings together guided-free expression on canvas, rich ambient music, and relaxed social connection.',
    'Whether you are stepping up to an easel for the first time, doubling up on canvases to explore bold colour palettes, or sharing a memorable creative date with a partner, every ticket package equips you with your canvas and painting essentials in an elevated, welcoming setting.'
  ],
  experiencePillars: [
    {
      title: 'Art & Painting',
      description:
        'Express your vision from clouds to canvas with quality A3 canvases and complete painting kits tailored to your chosen package.'
    },
    {
      title: 'Music & Atmosphere',
      description:
        'Immerse yourself in a curated sonic backdrop that fuels creative flow and sets an effortless, soulful Johannesburg vibe.'
    },
    {
      title: 'Social Connection',
      description:
        'Connect with a community of like-minded creatives and lifestyle enthusiasts at Common Grounds in vibrant Maboneng.'
    },
    {
      title: 'Curated Hospitality',
      description:
        'Enjoy included snacks and thoughtfully prepared package inclusions designed to make your session seamless from arrival to final brushstroke.'
    }
  ],
  packages: [
    {
      id: 'vibe-starter',
      name: 'The Vibe Starter',
      tierLabel: 'Package 01 • Solo Essentials',
      price: 150,
      priceDisplay: 'R150',
      defaultAttendees: 1,
      shortDescription:
        'Everything you need to step into the studio, spark your creativity, and bring your single A3 canvas to life.',
      image: '/events/package-vibe-starter.jpg',
      badge: 'Classic Solo',
      inclusions: [
        { text: 'One A3 canvas.' },
        { text: 'Complete painting kit.' },
        { text: 'Snacks.' },
        { text: 'One pre-roll.', requiresComplianceReview: true },
        { text: 'Access to the experience.' }
      ]
    },
    {
      id: 'double-trouble',
      name: 'The Double Trouble',
      tierLabel: 'Package 02 • Extended Solo Canvas',
      price: 300,
      priceDisplay: 'R300',
      defaultAttendees: 1,
      shortDescription:
        'Designed for the prolific creator who wants twice the canvas space—two A3 canvases for one person to experiment freely.',
      image: '/events/package-double-trouble.jpg',
      badge: 'Double Canvas',
      inclusions: [
        { text: 'Two A3 canvases for one person.' },
        { text: 'Complete painting kit.' },
        { text: 'Snacks.' },
        { text: 'One pre-roll.', requiresComplianceReview: true },
        { text: 'Access to the experience.' }
      ]
    },
    {
      id: 'love-and-art',
      name: 'The Love & Art Package',
      tierLabel: 'Package 03 • Shared For Two',
      price: 350,
      priceDisplay: 'R350',
      priceSuffix: 'per couple',
      defaultAttendees: 2,
      shortDescription:
        'A shared creative experience for two people, featuring dual A3 canvases, two full painting kits, and a plain T-shirt.',
      image: '/events/package-love-and-art.jpg',
      badge: 'Couples Choice',
      inclusions: [
        { text: 'Two A3 canvases.' },
        { text: 'Two painting kits.' },
        { text: 'One plain T-shirt.' },
        { text: 'Snacks.' },
        { text: 'One pre-roll.', requiresComplianceReview: true },
        { text: 'Access for two people.' }
      ]
    },
    {
      id: 'green-elite',
      name: 'The Green Elite',
      tierLabel: 'Package 04 • Flagship VIP Experience',
      price: 450,
      priceDisplay: 'R450',
      defaultAttendees: 1,
      shortDescription:
        'Our flagship tier combining the full painting experience with both a plain T-shirt, an exclusive Sativa Yard branded T-shirt, and featured social media promotion.',
      image: '/events/package-green-elite.jpg',
      isVip: true,
      badge: 'Premier Tier',
      inclusions: [
        { text: 'One canvas.' },
        { text: 'Complete painting kit.' },
        { text: 'One plain T-shirt.' },
        { text: 'One exclusive Sativa Yard branded T-shirt.' },
        { text: 'Snacks.' },
        { text: 'One pre-roll.', requiresComplianceReview: true },
        { text: 'Access to the experience.' },
        { text: 'Featured social media promotion.' }
      ]
    }
  ],
  faqs: [
    {
      id: 'faq-how-to-book',
      question: 'How do I book?',
      answer:
        'Choose your preferred package on this page, optionally enter your name and number of attendees, and click "Book This Package". Your device will open WhatsApp with a pre-filled booking message addressed to Sativa Yard (+27 50 011 2959) containing the event name, selected package, price, date, and attendee count.'
    },
    {
      id: 'faq-package-inclusions',
      question: 'What is included in each package?',
      answer:
        'We offer four distinct packages: The Vibe Starter (R150) includes one A3 canvas, a complete painting kit, snacks, one pre-roll*, and access to the experience. The Double Trouble (R300) includes two A3 canvases for one person, a complete painting kit, snacks, one pre-roll*, and access to the experience. The Love & Art Package (R350 per couple) includes two A3 canvases, two painting kits, one plain T-shirt, snacks, one pre-roll*, and access for two people. The Green Elite (R450) includes one canvas, a complete painting kit, one plain T-shirt, one exclusive Sativa Yard branded T-shirt, snacks, one pre-roll*, access to the experience, and featured social media promotion.',
      organiserNote:
        '*Note: Package inclusions involving cannabis products ("One pre-roll") are flagged for legal and 18+ age-compliance review prior to final fulfilment.'
    },
    {
      id: 'faq-book-for-two',
      question: 'Can I book for two people?',
      answer:
        'Yes. The Love & Art Package (R350 per couple) is curated specifically for two people and includes two A3 canvases, two painting kits, one plain T-shirt, snacks, one pre-roll, and access for two people. You may also specify multiple attendees when booking any package via WhatsApp.'
    },
    {
      id: 'faq-where-is-event',
      question: 'Where is the event?',
      answer:
        'Spliff & Paint will be hosted at Common Grounds, Maboneng, Johannesburg on 28 November 2026. You can use the Google Maps directions link in the Event Information section below to plan your route to Maboneng.',
      organiserNote:
        'Exact street number, check-in gate, and event start/finish times are pending organiser confirmation.'
    },
    {
      id: 'faq-confirm-booking',
      question: 'How do I confirm my booking?',
      answer:
        'After you send your pre-filled WhatsApp booking message to Sativa Yard (+27 50 011 2959), our team will respond directly on WhatsApp to confirm package availability and guide you through finalising your reservation.',
      organiserNote:
        'Payment reference instructions, deposit deadlines, and cancellation terms will be confirmed directly by the organiser via WhatsApp.'
    },
    {
      id: 'faq-contact-sativa-yard',
      question: 'How do I contact Sativa Yard?',
      answer:
        'You can reach Sativa Yard on WhatsApp or by phone at +27 50 011 2959, via email at hello@sativayard.co.za, on Instagram at @sativa_yard, or in person at our Johannesburg headquarters at 26 Van Beek St, New Doornfontein, Johannesburg, 2094.'
    }
  ],
  complianceNotice:
    'Legal & Age-Compliance Flag (18+): Selected package inclusions reference a cannabis item ("One pre-roll"). This inclusion is flagged for South African legal and age-compliance review before public fulfilment. Strictly no persons under 18. No online cannabis-product sale or payment processing is conducted on this website.',
  pendingConfirmationItems: [
    'Event start time, door opening time, and closing time on 28 November 2026.',
    'Verified street address / unit number and parking instructions for Common Grounds, Maboneng.',
    'Legal and 18+ compliance sign-off for the advertised "One pre-roll" package inclusion.',
    'T-shirt sizing collection workflow for The Love & Art Package and The Green Elite.',
    'Booking cut-off date, maximum venue capacity, and refund/transfer policy.'
  ]
};

export interface EventBookingInput {
  eventTitle?: string;
  packageName: string;
  packagePriceDisplay: string;
  eventDate?: string;
  attendees: number;
  customerName?: string;
}

export function formatEventBookingMessage(input: EventBookingInput): string {
  const eventTitle = input.eventTitle || 'Spliff & Paint';
  const eventDate = input.eventDate || SPLIFF_AND_PAINT_EVENT.dateDisplay;
  const safeAttendees = Math.max(1, Math.floor(Number(input.attendees) || 1));
  const cleanName = (input.customerName || '').replace(/[\r\n]+/g, ' ').trim();
  const cleanPackageName = input.packageName.replace(/[\r\n]+/g, ' ').trim();
  const cleanPrice = input.packagePriceDisplay.replace(/[\r\n]+/g, ' ').trim();

  let message = `Hello Sativa Yard! I would like to book the ${eventTitle} experience.\n\n`;
  message += `Selected package: ${cleanPackageName}.\n`;
  message += `Package price: ${cleanPrice}.\n`;
  message += `Event date: ${eventDate}.\n`;
  message += `Number of attendees: ${safeAttendees}.\n`;
  if (cleanName) {
    message += `Customer name: ${cleanName}.\n`;
  }
  message += `\nPlease assist me with completing my booking.`;

  return message;
}

export function getEventWhatsAppUrl(input: EventBookingInput): string {
  const message = formatEventBookingMessage(input);
  return `https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}?text=${encodeURIComponent(message)}`;
}
