import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import { formatOrderMessage } from '../pages/Cart';
import { Product } from '../types';

afterEach(() => {
  cleanup();
});

// Mock Product Data
const mockProductInStock: Product = {
  id: "P001",
  name: "Test In-Stock Flower",
  description: "A premium test selection.",
  category: "Cannabis Flower",
  price: 100,
  weight: "1g",
  availability: "In Stock",
  sku: "SYS-P001",
  strainType: "Hybrid",
  image: "/test.webp",
  stockCount: 5,
  featured: false
};

const mockProductOutOfStock: Product = {
  id: "P002",
  name: "Test Out-of-Stock Edible",
  description: "Delicious out of stock gummies.",
  category: "Edibles",
  price: 50,
  weight: "1 pack",
  availability: "Out of Stock",
  sku: "SYS-P002",
  strainType: "N/A",
  image: "/test-oos.webp",
  stockCount: 0,
  featured: false
};

// A Helper Component to test the Cart Context
function TestCartComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartItemCount } = useCart();
  return (
    <div>
      <div data-testid="cart-count">{cartItemCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <div data-testid="items-list">
        {cart.map(item => (
          <div key={item.product.id} data-testid={`item-${item.product.id}`}>
            <span data-testid={`qty-${item.product.id}`}>{item.quantity}</span>
            <button 
              data-testid={`inc-${item.product.id}`}
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              +
            </button>
            <button 
              data-testid={`dec-${item.product.id}`}
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            >
              -
            </button>
            <button 
              data-testid={`remove-${item.product.id}`}
              onClick={() => removeFromCart(item.product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button 
        data-testid="add-instock" 
        onClick={() => addToCart(mockProductInStock, 1)}
      >
        Add In Stock
      </button>
      <button 
        data-testid="add-oos" 
        onClick={() => addToCart(mockProductOutOfStock, 1)}
      >
        Add Out of Stock
      </button>
    </div>
  );
}

describe('Cart Context & Order Logic Tests', () => {
  test('Add to cart, update quantity, and remove items correctly', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    // Initial check
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');

    // Add In-Stock item
    act(() => {
      screen.getByTestId('add-instock').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('100');

    // Increment quantity
    act(() => {
      screen.getByTestId('inc-P001').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('2');
    expect(screen.getByTestId('cart-total').textContent).toBe('200');

    // Remove item
    act(() => {
      screen.getByTestId('remove-P001').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
  });

  test('Refuse adding out-of-stock items to cart', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-oos').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  test('Clamp quantity update to the stock count ceiling', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    // Add product (stockCount is 5)
    act(() => {
      screen.getByTestId('add-instock').click();
    });

    // Try to increment 6 times (should clamp at 5)
    for (let i = 0; i < 6; i++) {
      act(() => {
        screen.getByTestId('inc-P001').click();
      });
    }

    expect(screen.getByTestId('qty-P001').textContent).toBe('5');
    expect(screen.getByTestId('cart-count').textContent).toBe('5');
    expect(screen.getByTestId('cart-total').textContent).toBe('500');
  });

  test('Generate order messages and correctly sanitize names with special characters', () => {
    const mockOrder = {
      orderRef: "SY-123456",
      date: "2026-06-26 14:00:00",
      items: [
        {
          product: mockProductInStock,
          quantity: 2
        }
      ],
      total: 200,
      customerName: "O'Brien & Co\nIncorp",
      customerNumber: "+27785870868"
    };

    const message = formatOrderMessage(mockOrder);
    
    // Check that name's newlines are replaced with spaces
    expect(message).toContain("Name: O'Brien & Co Incorp");
    expect(message).not.toContain("Name: O'Brien & Co\nIncorp");

    // Check itemized and reference contents
    expect(message).toContain("SY-123456");
    expect(message).toContain("Test In-Stock Flower");
    
    // Check encoding safety
    const encoded = encodeURIComponent(message);
    expect(encoded).toContain(encodeURIComponent("O'Brien & Co Incorp"));
  });
});
