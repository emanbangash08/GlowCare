import React, { useRef, useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo/glow_care_logo.png';
import cart_icon from '../Assets/icons/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/shopContext';
import nav_dropdown from '../Assets/icons/dropdown_icon.png';

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();

  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    console.error('Navbar must be used within ShopContextProvider');
    return null;
  }

  const { getTotalCartItems } = shopContext;

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <Link to='/' style={{ textDecoration: 'none' }}>
          <p onClick={() => setMenu("shop")}>Glow Care</p>
        </Link>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="menu" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to='/'>Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("recommendations")}>
          <Link to='/recommendations'>Request Admin</Link>
          {menu === "recommendations" && <hr />}
        </li>
        <li onClick={() => setMenu("adminrecom")}>
          <Link to='/adminrecom'>Admin Recommendations</Link>
          {menu === "adminrecom" && <hr />}
        </li>
        <li onClick={() => setMenu("category")}>
          <Link to='/category'>Categories</Link>
          {menu === "category" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => {
            localStorage.removeItem('auth-token');
            window.location.replace('/');
          }}>
            Logout
          </button>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}

        <Link to='/cart'>
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
