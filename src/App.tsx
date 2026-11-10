import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Events from './pages/Events';
import SpliffAndPaint from './pages/SpliffAndPaint';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { AgeGate } from './components/AgeGate';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <AgeGate>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="events" element={<Events />} />
                <Route path="events/spliff-and-paint" element={<SpliffAndPaint />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </AgeGate>
      </CartProvider>
    </HelmetProvider>
  );
}
