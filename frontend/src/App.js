import './App.css';
import { Navbar } from './components/Navbar/Navbar'; 
import Footer from './components/footer/Footer';

import ShopCategory from './pages/ShopCategory';
import ShopPage from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './pages/Category';
import Recommendations from './pages/Recommendations';
import AdminRecom from './pages/AdminRecom';
import PaymentPage from './pages/PaymentPage';

import ShopContextProvider from './context/shopContext';

import categoryBanner from './components/Assets/icons/shopping_cat.png'; // Reuse or create separate banners per category if you want

function App() {
  return (
    <ShopContextProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/shop" element={<ShopPage />} />

            {/* GlowCare Categories */}
            <Route path="/category/cleansers" element={<ShopCategory category="Cleansers" banner={categoryBanner} />} />
            <Route path="/category/moisturizers" element={<ShopCategory category="Moisturizers" banner={categoryBanner} />} />
            <Route path="/category/sunscreens" element={<ShopCategory category="Sunscreens" banner={categoryBanner} />} />
            <Route path="/category/serums-treatments" element={<ShopCategory category="Serums & Treatments" banner={categoryBanner} />} />
            <Route path="/category/face-masks-scrubs" element={<ShopCategory category="Face Masks & Scrubs" banner={categoryBanner} />} />
            <Route path="/category/toners-mists" element={<ShopCategory category="Toners & Mists" banner={categoryBanner} />} />
            <Route path="/category/lip-eye-care" element={<ShopCategory category="Lip & Eye Care" banner={categoryBanner} />} />
            <Route path="/category/sensitive-baby-skin" element={<ShopCategory category="Sensitive & Baby Skin" banner={categoryBanner} />} />
            <Route path="/category/night-care" element={<ShopCategory category="Night Care" banner={categoryBanner} />} />
            <Route path="/category/body-care" element={<ShopCategory category="Body Care" banner={categoryBanner} />} />

            {/* Product, Cart, Auth, and other routes */}
            <Route path="product/" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/signup" element={<LoginSignup />} />

            {/* The main Category page with nested routing */}
            <Route path="/category/*" element={<Category />} />

            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/adminrecom" element={<AdminRecom />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </ShopContextProvider>
  );
}

export default App;
