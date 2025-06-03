import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryOverlay, { CategoryToggle } from '../components/CategoryOverlay/CategoryOverlay';
import ShopCategory from './ShopCategory';

import defaultBanner from '../components/Assets/icons/shopping_cat.png';

const Category = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Add the toggle button to open the overlay */}
      <div className="category-toggle-container">
        <CategoryToggle onClick={() => setIsOverlayOpen(true)} />
      </div>
      
      {/* The overlay that will appear when isOverlayOpen is true */}
      <CategoryOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
      />
      
      <div className="category-content">
        <Routes>
          <Route path="cleansers" element={<ShopCategory category="Cleansers" banner={defaultBanner} />} />
          <Route path="moisturizers" element={<ShopCategory category="Moisturizers" banner={defaultBanner} />} />
          <Route path="sunscreens" element={<ShopCategory category="Sunscreens" banner={defaultBanner} />} />
          <Route path="serums-treatments" element={<ShopCategory category="Serums & Treatments" banner={defaultBanner} />} />
          <Route path="face-masks-scrubs" element={<ShopCategory category="Face Masks & Scrubs" banner={defaultBanner} />} />
          <Route path="toners-mists" element={<ShopCategory category="Toners & Mists" banner={defaultBanner} />} />
          <Route path="lip-eye-care" element={<ShopCategory category="Lip & Eye Care" banner={defaultBanner} />} />
          <Route path="sensitive-baby-skin" element={<ShopCategory category="Sensitive & Baby Skin" banner={defaultBanner} />} />
          <Route path="night-care" element={<ShopCategory category="Night Care" banner={defaultBanner} />} />
          <Route path="body-care" element={<ShopCategory category="Body Care" banner={defaultBanner} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Category;