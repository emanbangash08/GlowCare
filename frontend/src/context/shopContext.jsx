import React, { useEffect, useState } from "react";

export const ShopContext = React.createContext(null);

const getDefaultCart = () => {
    return {};
};

const ShopContextProvider = (props) => {
    const [all_products, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all products
        fetch('http://localhost:4000/allproducts')
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => setAllProducts(data))
            .catch((error) => {
                setError(error.message);
                console.error('Error fetching products:', error);
            });

        // Fetch user cart if logged in
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
                body: "",
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then((data) => setCartItems(data))
                .catch((error) => {
                    setError(error.message);
                    console.error('Error fetching cart items:', error);
                });
        }
    }, []);

    const addToCart = ({ id, size, price, name, image }) => {
        const key = `${id}_${size}`;
        const numericPrice = parseFloat(price);

        setCartItems((prev) => ({
            ...prev,
            [key]: {
                ...(prev[key] || { id, size, price: numericPrice, name, image, quantity: 0 }),
                quantity: (prev[key]?.quantity || 0) + 1
            }
        }));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({ id, size }),
            })
                .then((res) => res.json())
                .then((data) => console.log("Added to cart:", data))
                .catch((error) => {
                    setError(error.message);
                    console.error('Error adding to cart:', error);
                });
        }
    };

    const removeFromCart = (key) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[key]) {
                updated[key].quantity -= 1;
                if (updated[key].quantity <= 0) delete updated[key];
            }
            return updated;
        });

        if (localStorage.getItem('auth-token')) {
            const [id, size] = key.split('_');
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({ id, size }),
            })
                .then((res) => res.json())
                .then((data) => console.log("Removed from cart:", data))
                .catch((error) => {
                    setError(error.message);
                    console.error('Error removing from cart:', error);
                });
        }
    };

    const updateCartItemQuantity = (key, quantity) => {
        if (quantity < 1) return;

        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[key]) {
                updated[key].quantity = quantity;
            }
            return updated;
        });

        if (localStorage.getItem('auth-token')) {
            const [id, size] = key.split('_');
            fetch('http://localhost:4000/updatecartquantity', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({ id, size, quantity }),
            })
                .then((res) => res.json())
                .then((data) => console.log("Updated cart quantity:", data))
                .catch((error) => {
                    setError(error.message);
                    console.error('Error updating cart quantity:', error);
                });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const key in cartItems) {
            const item = cartItems[key];
            const price = parseFloat(item?.price);
            const quantity = parseInt(item?.quantity);

            if (!isNaN(price) && !isNaN(quantity)) {
                totalAmount += price * quantity;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const key in cartItems) {
            const quantity = parseInt(cartItems[key]?.quantity);
            if (!isNaN(quantity)) {
                totalItems += quantity;
            }
        }
        return totalItems;
    };

    const contextValue = {
        all_products,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        getTotalCartAmount,
        getTotalCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {error && <div style={{ color: "red" }}>Error: {error}</div>}
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
