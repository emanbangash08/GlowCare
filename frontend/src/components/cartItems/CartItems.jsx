import React from "react";
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../context/shopContext';
import remove_icon from '../Assets/icons/remove_icon.png';

const CartItems = () => {
    const navigate = useNavigate();

    const navigateToPayment = () => {
      navigate('/payment');
    };

    const { cartItems, removeFromCart, updateCartItemQuantity, getTotalCartAmount } = React.useContext(ShopContext);

    // Handle empty or invalid cart
    if (!cartItems || Object.keys(cartItems).length === 0) {
        return <div className="cartitems"><p>Your cart is empty.</p></div>;
    }

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {Object.entries(cartItems).map(([key, item]) => {
                if (!item || item.price === undefined || item.quantity === undefined) return null;

                return (
                    <div key={key}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={item.image || ''} alt={item.name || 'product'} className="carticon-product-icon" />
                            <p>{item.name || 'No name'}</p>
                            <p>${Number(item.price).toFixed(2)}</p>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                value={item.quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (val >= 1 && val <= 10) {
                                        updateCartItemQuantity(key, val);
                                    }
                                }}
                                className="cartitems-quantity-input"
                            />
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                            <img
                                className="cartitems-remove-icon"
                                src={remove_icon}
                                onClick={() => removeFromCart(key)}
                                alt="Remove item"
                            />
                        </div>
                        <hr/>
                    </div>
                );
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount().toFixed(2)}</h3>
                        </div>
                    </div>
                    <button onClick={navigateToPayment}>PROCEED TO CHECKOUT</button>
                </div>

                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here.</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>   
            </div>
        </div>
    );
};

export default CartItems;
