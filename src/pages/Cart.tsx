import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../data';
import { formatCurrency } from '../lib/utils';
import { Helmet } from 'react-helmet-async';
import { CartItem } from '../types';

interface OrderDetails {
  orderRef: string;
  date: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerNumber: string;
}

export function formatOrderMessage(order: OrderDetails): string {
  // Strip newlines/carriage returns from customer inputs before formatting to prevent injections
  const cleanName = order.customerName.replace(/[\r\n]+/g, ' ');
  const cleanNumber = order.customerNumber.replace(/[\r\n]+/g, ' ');
  
  let message = `Hello Sativa Yard,\n\nI would like to place an order.\n\n`;
  message += `*Order Reference:* ${order.orderRef}\n`;
  message += `*Date:* ${order.date}\n\n`;
  message += `*Products:*\n`;
  
  order.items.forEach(item => {
    // Strip newlines from item name just in case
    const cleanItemName = item.product.name.replace(/[\r\n]+/g, ' ');
    message += `- ${cleanItemName} [${item.product.weight}] x${item.quantity} (${formatCurrency(item.product.price)} ea) - ${formatCurrency(item.product.price * item.quantity)}\n`;
  });

  message += `\n*Total:* ${formatCurrency(order.total)}\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${cleanName}\n`;
  message += `Number: ${cleanNumber}\n\n`;
  message += `Thank you!`;
  
  return message;
}

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  useEffect(() => {
    if (completedOrder) {
      window.scrollTo(0, 0);
    }
  }, [completedOrder]);

  const isNumberValid = /^\+?\d{9,15}$/.test(customerNumber.trim());
  const canCheckout = customerName.trim() !== '' && isNumberValid;

  const handleCheckout = () => {
    if (!canCheckout) return;

    const orderRef = `SY-${String(Date.now()).slice(-6)}`;
    const orderDate = new Date().toLocaleString();

    const orderDetails: OrderDetails = {
      orderRef,
      date: orderDate,
      items: [...cart],
      total: cartTotal,
      customerName: customerName,
      customerNumber: customerNumber
    };

    const message = formatOrderMessage(orderDetails);
    const encodedMessage = encodeURIComponent(message);
    
    // Security: encode WhatsApp number and message payload fully
    window.open(`https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}?text=${encodedMessage}`, '_blank');

    setCompletedOrder({
      ...orderDetails,
      whatsappMessage: message
    });
    clearCart();
  };

  if (completedOrder) {
    return (
      <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Helmet>
          <title>Order Confirmed | Sativa Yard</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Print Stylesheet injection */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            header, footer, nav, button, .no-print, .social-debug {
              display: none !important;
            }
            .print-receipt-container {
              border: none !important;
              box-shadow: none !important;
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .print-receipt-body {
              border: 1px dashed #ccc !important;
              padding: 20px !important;
            }
          }
        `}} />

        <div className="w-full max-w-4xl grid md:grid-cols-5 gap-8 print-receipt-container">
          {/* Main Receipt Column */}
          <div className="md:col-span-3 bg-white p-8 rounded-[40px] shadow-sm border border-emerald-50 flex flex-col justify-between print-receipt-body">
            <div>
              {/* Receipt Header */}
              <div className="text-center pb-6 border-b border-dashed border-emerald-100">
                <span className="text-3xl">🌿</span>
                <h2 className="text-2xl font-black text-emerald-900 tracking-tight mt-2">SATIVA YARD</h2>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mt-1">Order Receipt</p>
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span className="bg-emerald-50 text-emerald-850 text-xs px-3 py-1.5 rounded-full font-mono font-bold">
                    Ref: {completedOrder.orderRef}
                  </span>
                  <span className="text-[10px] text-emerald-600/70 font-semibold">{completedOrder.date}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="py-6 border-b border-dashed border-emerald-100 text-sm">
                <h3 className="text-xs font-black tracking-widest text-emerald-600 uppercase mb-3">Customer Info</h3>
                <div className="space-y-1 text-emerald-900">
                  <p><span className="text-emerald-700/60 font-medium">Name:</span> <strong className="font-bold">{completedOrder.customerName}</strong></p>
                  <p><span className="text-emerald-700/60 font-medium">WhatsApp:</span> <strong className="font-bold font-mono">{completedOrder.customerNumber}</strong></p>
                </div>
              </div>

              {/* Itemized List */}
              <div className="py-6 border-b border-dashed border-emerald-100">
                <h3 className="text-xs font-black tracking-widest text-emerald-600 uppercase mb-4">Items Purchased</h3>
                <div className="space-y-4">
                  {completedOrder.items.map((item: any) => (
                    <div key={item.product.id} className="flex justify-between items-start text-sm">
                      <div className="max-w-[65%] text-left">
                        <span className="font-bold text-emerald-955 block leading-tight">{item.product.name}</span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{item.product.category} • {item.product.weight}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-emerald-600/70 block font-semibold leading-none mb-1">{item.quantity} × {formatCurrency(item.product.price)}</span>
                        <span className="font-bold text-emerald-950 font-mono">{formatCurrency(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 flex justify-between items-center">
                <span className="font-black text-emerald-900">Total Due</span>
                <span className="text-3xl font-black text-emerald-800">{formatCurrency(completedOrder.total)}</span>
              </div>
            </div>

            {/* Actions for printing / returning */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 no-print">
              <button 
                onClick={() => window.print()}
                className="flex-1 bg-emerald-800 text-white py-4 px-6 rounded-2xl font-bold hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                Print Receipt
              </button>
              <Link 
                to="/products"
                className="flex-1 bg-gray-100 text-emerald-800 border border-emerald-100 py-4 px-6 rounded-2xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* WhatsApp Message Debug/Verify Column */}
          <div className="md:col-span-2 bg-emerald-800 text-emerald-50 p-8 rounded-[40px] shadow-sm border border-emerald-900 flex flex-col social-debug">
            <h3 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-4">
              💬 WhatsApp Message Sent
            </h3>
            <p className="text-xs text-emerald-200 mb-4 leading-relaxed font-medium">
              We have automatically redirected you to WhatsApp. For reference, here is the exact text of the order transmission:
            </p>
            <div className="bg-emerald-955/60 border border-emerald-750/30 rounded-2xl p-4 flex-grow font-mono text-xs whitespace-pre-wrap leading-relaxed select-all overflow-y-auto max-h-[400px] text-emerald-100">
              {completedOrder.whatsappMessage}
            </div>
            <div className="mt-4 text-[10px] text-emerald-300 font-semibold text-center">
              💡 Tip: You can copy the message block if needed.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART GUARD: If cart is empty, show nice empty state
  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <Helmet>
          <title>Your Cart is Empty | Sativa Yard</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-emerald-50">
          <span className="text-4xl text-emerald-800">🛍️</span>
        </div>
        <h2 className="text-3xl font-extrabold text-emerald-900 mb-4">Your cart is empty</h2>
        <p className="text-emerald-800/70 mb-8 max-w-md font-medium">Looks like you haven't added any products to your cart yet. Explore our premium collection.</p>
        <Link 
          to="/products"
          className="bg-emerald-700 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20"
        >
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Helmet>
        <title>Shopping Cart | Sativa Yard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-emerald-900 tracking-tight mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white p-3 sm:p-4 rounded-[32px] shadow-sm border border-emerald-50 flex gap-4 sm:gap-6 items-start sm:items-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-emerald-50/50 rounded-2xl overflow-hidden shrink-0 mt-2 sm:mt-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-grow flex flex-col py-2 pr-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-emerald-900 text-lg mb-1">{item.product.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{item.product.category} • {item.product.weight}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-emerald-700/50 hover:text-red-500 transition-colors p-2 bg-emerald-50/50 hover:bg-red-50 rounded-xl cursor-pointer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="font-extrabold text-emerald-900 text-xl">{formatCurrency(item.product.price)}</span>
                    
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-1">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm text-emerald-700 hover:bg-emerald-100 transition-colors font-bold cursor-pointer"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-black text-emerald-900 text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockCount}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors font-bold cursor-pointer"
                          title={item.quantity >= item.product.stockCount ? "Maximum stock limit reached" : ""}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      {item.quantity >= item.product.stockCount && (
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase tracking-wider block mt-1">
                          Max Stock Limit Reach ({item.product.stockCount})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-emerald-50 sticky top-24">
              <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {/* Receipt Items Section */}
                <div className="border-b border-dashed border-emerald-100 pb-4 mb-4">
                  <span className="block text-[10px] font-black tracking-widest uppercase text-emerald-600 mb-3">Items</span>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start text-xs font-medium text-emerald-850">
                        <div className="max-w-[65%] text-left">
                          <span className="font-bold block text-emerald-900 leading-tight mb-0.5">{item.product.name}</span>
                          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{item.product.category} • {item.product.weight}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-600/70 block leading-none mb-1 font-bold">{item.quantity} × {formatCurrency(item.product.price)}</span>
                          <span className="text-emerald-955 font-bold font-mono">{formatCurrency(item.product.price * item.quantity)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-emerald-800/70 text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-emerald-900">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-800/70 text-sm font-medium">
                   <span>Shipping</span>
                   <span className="font-bold text-emerald-600">Via WhatsApp</span>
                </div>
                <div className="pt-4 border-t border-emerald-50 flex justify-between items-center">
                  <span className="font-black text-emerald-900">Total</span>
                  <span className="text-3xl font-extrabold text-emerald-700">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-black tracking-widest uppercase text-emerald-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-none transition-all text-sm hover:border-emerald-200 bg-gray-50/50"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block text-[10px] font-black tracking-widest uppercase text-emerald-700 mb-2">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    id="number"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-none transition-all text-sm hover:border-emerald-200 bg-gray-50/50"
                    placeholder="Enter WhatsApp number (e.g. 27785870868)"
                  />
                  {customerNumber && !isNumberValid && (
                    <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                      ⚠️ Invalid phone number format (9-15 digits)
                    </p>
                  )}
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={!canCheckout}
                className="w-full flex items-center justify-center gap-2 bg-emerald-800 text-white py-5 rounded-2xl font-bold hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-900/20 text-sm cursor-pointer"
              >
                Proceed to WhatsApp <ArrowRight className="h-5 w-5" />
              </button>
              
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-emerald-600/50 mt-4">
                You will finalize via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
