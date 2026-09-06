import './index.css';
import { Routes, Route } from 'react-router-dom';

import { CartProvider } from './CartContext';
import ScrollProgress from './ScrollProgress';
import Nav from './Nav';

import Hero from './Hero';
import ScentFinder from './ScentFinder';
import Showcase from './Showcase';
import { Story, Footer } from './StoryAndFooter';
import ProcessScroll from './ProcessScroll';
import { Journal, Contact } from './JournalAndContact';
import WhatsAppButton from './WhatsAppButton';
import Testimonials from './Testimonials';
import { HowItWorks, FinalCTA } from './NextSteps';
import Lookbook from './Lookbook';
import { WishlistProvider } from './WishlistContext';
import ProductPage from './ProductPage';
import FeaturedProducts from './FeaturedProducts';
import Account from './Account';
import Checkout from './Checkout';
import Gifting from './Gifting';


export default function App() {
  return (
    <CartProvider>
        <WishlistProvider>
      <div>
        <div className="grain" />
        <ScrollProgress />
        <Nav />

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                  
                <ScentFinder />
                <FeaturedProducts />
                  <Lookbook />
                <Testimonials />
                   <HowItWorks />
                  
<FinalCTA />
              </>
            }
          />

          {/* COLLECTION */}
          <Route path="/collection" element={<Showcase />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/gifting" element={<Gifting />} />



          {/* STORY */}
          <Route
            path="/story"
            element={
              <>
           
                <Story />
                <ProcessScroll />
              </>
            }
          />

          {/* JOURNAL */}
          <Route path="/journal" element={<Journal />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* PRODUCT DETAIL */}
          

        </Routes>

        <Footer />
        <WhatsAppButton />
      </div>
      </WishlistProvider>
    </CartProvider>
  );
}