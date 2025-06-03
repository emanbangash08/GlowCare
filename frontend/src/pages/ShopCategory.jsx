import React, { useContext, useEffect, useState } from 'react';
import './css/ShopCategory.css';
import { ShopContext } from '../context/shopContext';
import Item from '../components/item/item';

const ShopCategory = ({ category, banner }) => {
  const { all_products } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (all_products && category) {
      const normalizedCategory = category.toLowerCase().replace(/s$/, '');
      const filtered = all_products.filter(item =>
        item.category?.toLowerCase().replace(/s$/, '') === normalizedCategory
      );
      setFilteredProducts(filtered);
      setLoading(false);

      // Debug logs
      console.log('All products:', all_products);
      console.log('Category:', category);
      console.log('Filtered products:', filtered);
    }
  }, [all_products, category]);

  if (!category) {
    return <p style={{ textAlign: "center" }}>Category not found.</p>;
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading products...</p>;
  }

return (
  <div className="shop-category">
    <div className="shopcategory-products">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            category={item.category}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))
      ) : (
        <p>No products found in the {category} category.</p>
      )}
    </div>
    <div className="shopcategory-loadmore">Explore More</div>
  </div>
);
}


export default ShopCategory;
