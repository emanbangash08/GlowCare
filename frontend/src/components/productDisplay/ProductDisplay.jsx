"use client"

import { useContext, useState } from "react"
import "./ProductDisplay.css"
import star_icon from "../Assets/icons/star_icon.png"
import star_dull_icon from "../Assets/icons/star_dull_icon.png"
import { ShopContext } from "../../context/shopContext"
import { useNavigate } from "react-router-dom"

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext)
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState(null)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.")
      return
    }

    // ✅ Safely extract price
    const price = product.sizes instanceof Map ? product.sizes.get(selectedSize) : product.sizes[selectedSize]

    if (!price) {
      alert("Invalid size selected. Please try again.")
      return
    }

    // ✅ Call addToCart with price
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      price: price,
    })

    navigate("/Cart")
  }

  // ✅ Get price to display
  const price = selectedSize
    ? product.sizes instanceof Map
      ? product.sizes.get(selectedSize)
      : product.sizes[selectedSize]
    : null

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[1, 2, 3, 4].map((_, i) => (
            <img key={i} src={product.image || "/placeholder.svg"} alt={`${product.name} ${i + 1}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon || "/placeholder.svg"} alt="star" />
          <img src={star_icon || "/placeholder.svg"} alt="star" />
          <img src={star_icon || "/placeholder.svg"} alt="star" />
          <img src={star_icon || "/placeholder.svg"} alt="star" />
          <img src={star_dull_icon || "/placeholder.svg"} alt="star" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          {price ? `$${price.toFixed(2)}` : "Select a size to see price"}
        </div>

        <div className="productdisplay-right-description">
          <p>{product.description}</p>
        </div>

        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-size-options">
            {product.sizes &&
              (product.sizes instanceof Map ? Array.from(product.sizes.keys()) : Object.keys(product.sizes)).map(
                (size) => (
                  <div
                    key={size}
                    className={`size-option ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ),
              )}
          </div>
        </div>

        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add To Cart
        </button>
        <p className="productdisplay-right-category">
          <span>Category: </span>
          {product.category}
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay
