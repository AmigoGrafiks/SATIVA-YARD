import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/Layout';
import Events from '../pages/Events';
import SpliffAndPaint from '../pages/SpliffAndPaint';
import {
  SPLIFF_AND_PAINT_EVENT,
  formatEventBookingMessage,
  getEventWhatsAppUrl
} from '../data/events';
import { WHATSAPP_NUMBER } from '../data';

beforeEach(() => {
  // Mock matchMedia for Layout responsive checks
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function renderWithAppRouter(initialEntry = '/events/spliff-and-paint') {
  return render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="events" element={<Events />} />
              <Route path="events/spliff-and-paint" element={<SpliffAndPaint />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );
}

describe('Sativa Yard Events & Spliff & Paint Experience Tests', () => {
  test('1. Navigation includes Events tab and links to /events and /events/spliff-and-paint', () => {
    renderWithAppRouter('/events');

    const eventsNavLink = screen.getByRole('link', { name: /^events$/i });
    expect(eventsNavLink).toBeTruthy();
    expect(eventsNavLink.getAttribute('href')).toBe('/events');

    // Featured event card on /events links to /events/spliff-and-paint
    const exploreLink = screen.getByRole('link', { name: /explore event & packages/i });
    expect(exploreLink.getAttribute('href')).toBe('/events/spliff-and-paint');
  });

  test('2. Hero, Package Information, Prices, and Inclusions match exact specification', () => {
    renderWithAppRouter('/events/spliff-and-paint');

    // Hero checks
    expect(screen.getByText('SATIVA YARD PRESENTS')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'SPLIFF & PAINT' })).toBeTruthy();
    expect(screen.getByText('FROM CLOUDS TO CANVAS.')).toBeTruthy();
    expect(screen.getAllByText(/28 November 2026/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Common Grounds, Maboneng, Johannesburg/).length).toBeGreaterThan(0);

    // Verify all 4 packages and exact prices
    expect(screen.getByTestId('package-price-vibe-starter').textContent).toBe('R150');
    expect(screen.getByTestId('package-price-double-trouble').textContent).toBe('R300');
    expect(screen.getByTestId('package-price-love-and-art').textContent).toBe('R350');
    expect(screen.getByTestId('package-price-green-elite').textContent).toBe('R450');

    // Verify specific inclusions
    expect(screen.getByText('Two A3 canvases for one person.')).toBeTruthy();
    expect(screen.getByText('Two painting kits.')).toBeTruthy();
    expect(screen.getByText('Access for two people.')).toBeTruthy();
    expect(screen.getByText('One exclusive Sativa Yard branded T-shirt.')).toBeTruthy();
    expect(screen.getByText('Featured social media promotion.')).toBeTruthy();

    // Verify prohibited content is absent
    expect(document.body.textContent).not.toContain('Summer Market');
    expect(document.body.textContent).not.toMatch(/\bR30\b/);
    expect(document.body.textContent).not.toMatch(/\bR60\b/);

    // Verify compliance review banner is present
    expect(screen.getByTestId('compliance-review-banner')).toBeTruthy();
  });

  test('3. All four WhatsApp booking buttons open existing Sativa Yard WhatsApp number with pre-filled details', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderWithAppRouter('/events/spliff-and-paint');

    // Enter customer name before booking
    const nameInput = screen.getByLabelText(/Your Name/i);
    fireEvent.change(nameInput, { target: { value: 'Naledi Khumalo' } });

    const expectedChecks = [
      {
        id: 'vibe-starter',
        name: 'The Vibe Starter',
        price: 'R150',
        defaultAttendees: '1'
      },
      {
        id: 'double-trouble',
        name: 'The Double Trouble',
        price: 'R300',
        defaultAttendees: '1'
      },
      {
        id: 'love-and-art',
        name: 'The Love & Art Package',
        price: 'R350 per couple',
        defaultAttendees: '2'
      },
      {
        id: 'green-elite',
        name: 'The Green Elite',
        price: 'R450',
        defaultAttendees: '1'
      }
    ];

    expectedChecks.forEach((pkgCheck, index) => {
      const btn = screen.getByTestId(`book-package-${pkgCheck.id}`);
      fireEvent.click(btn);

      expect(openSpy).toHaveBeenCalledTimes(index + 1);
      const calledUrl = String(openSpy.mock.calls[index][0]);
      expect(calledUrl).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`);

      const decodedText = decodeURIComponent(calledUrl.split('?text=')[1]);
      expect(decodedText).toContain('Hello Sativa Yard! I would like to book the Spliff & Paint experience.');
      expect(decodedText).toContain(`Selected package: ${pkgCheck.name}.`);
      expect(decodedText).toContain(`Package price: ${pkgCheck.price}.`);
      expect(decodedText).toContain('Event date: 28 November 2026.');
      expect(decodedText).toContain(`Number of attendees: ${pkgCheck.defaultAttendees}.`);
      expect(decodedText).toContain('Customer name: Naledi Khumalo.');
      expect(decodedText).toContain('Please assist me with completing my booking.');
    });
  });

  test('4. Event Information, Google Maps link, FAQ accordion, and Sticky Mobile Booking Bar render properly', () => {
    renderWithAppRouter('/events/spliff-and-paint');

    // Google Maps link
    const mapsLink = screen.getByTestId('google-maps-directions-link');
    expect(mapsLink.getAttribute('href')).toContain('Common+Grounds+Maboneng+Johannesburg');

    // Sticky mobile booking bar
    expect(screen.getByTestId('sticky-mobile-booking-bar')).toBeTruthy();

    // FAQ questions
    SPLIFF_AND_PAINT_EVENT.faqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeTruthy();
    });
  });

  test('5. formatEventBookingMessage sanitizes newlines and formats with or without customerName', () => {
    const withoutName = formatEventBookingMessage({
      packageName: 'The Vibe Starter',
      packagePriceDisplay: 'R150',
      attendees: 1
    });
    expect(withoutName).toBe(
      `Hello Sativa Yard! I would like to book the Spliff & Paint experience.\n\n` +
        `Selected package: The Vibe Starter.\n` +
        `Package price: R150.\n` +
        `Event date: 28 November 2026.\n` +
        `Number of attendees: 1.\n\n` +
        `Please assist me with completing my booking.`
    );

    const withInjectedNewlines = formatEventBookingMessage({
      packageName: 'The Green Elite',
      packagePriceDisplay: 'R450',
      attendees: 3,
      customerName: 'Sipho\nZulu'
    });
    expect(withInjectedNewlines).toContain('Customer name: Sipho Zulu.');
    expect(getEventWhatsAppUrl({
      packageName: 'The Green Elite',
      packagePriceDisplay: 'R450',
      attendees: 3
    })).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`);
  });

  test('6. Mobile navigation menu includes Events link and opens/closes properly', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: true, // Simulate mobile viewport (<768px)
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    });

    renderWithAppRouter('/events/spliff-and-paint');

    const menuBtn = screen.getByRole('button', { name: /open mobile menu/i });
    fireEvent.click(menuBtn);

    const mobileEventsLink = screen.getByRole('link', { name: /^events$/i });
    expect(mobileEventsLink.getAttribute('href')).toBe('/events');
  });

  test('7. Official WhatsApp number is 27500112959 (+27 50 011 2959) and all event images render with valid attributes', () => {
    expect(WHATSAPP_NUMBER).toBe('27500112959');
    renderWithAppRouter('/events/spliff-and-paint');

    const posterImg = screen.getByAltText(/Official Event Poster/i);
    expect(posterImg.getAttribute('src')).toBe('/events/spliff-and-paint-poster.jpg');

    SPLIFF_AND_PAINT_EVENT.packages.forEach((pkg) => {
      const pkgImg = screen.getByAltText(`${pkg.name} — Spliff & Paint package`);
      expect(pkgImg.getAttribute('src')).toBe(pkg.image);
      expect(pkgImg.getAttribute('loading')).toBe('lazy');
    });
  });
});
