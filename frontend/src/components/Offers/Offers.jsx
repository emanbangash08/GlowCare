import React from 'react'
import './Offers.css'
import exlusive_image from '../Assets/icons/skincare_image2.png' //exclusive_img

const Offers = () => {
    return(
        <div className='offers'>
               <div className="offers-left">
                  <h1>Exclusive</h1>
                  <h1>Offers For You</h1>
                  <p>ONLY ON BEST SELLER PRODUCTS</p>
                  <button>Check Now</button>
               </div>
               <div className="offers-right">
                  <img src ={exlusive_image} alt="" />
               </div>
        </div>
    )
}

export default Offers