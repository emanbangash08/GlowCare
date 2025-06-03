import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/icon/add_product_icon.png'
import list_product_icon from '../../assets/icon/list_product_icon.png'
import request_icon from '../../assets/icon/patient_requests.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to={'/addproducts'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="Add Product"/>
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproducts'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="Product List"/>
                <p>Product List</p>
            </div>
        </Link>
        <Link to={'/patientrequests'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={request_icon} alt="Patient Requests"/>
                <p>Patient Requests</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar
