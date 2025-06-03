import React from 'react'
import './GetStarted.css'
import arrow_icon from '../Assets/icons/arrow_icon.png' //arrow_icon
import skincare_image from '../Assets/icons/skincare_image.png' //skincare_image



export const GetStarted = () => {
  return (
    <div className='getstarted'>
      <div className="getstarted-left">
      <h2>NEW ARRIVALS ONLY</h2>
      <div>
        <p>latest</p>
        <p>skincare</p>
        <p>for everyone</p>
      </div>
      <div className="getstarted-latest-btn">
        <div>Latest Skincare Products</div>
        <img src={arrow_icon} alt="" />
      </div>
      </div>
    <div className="getstarted-right">
      <img src={skincare_image} alt="" />
    </div>
    </div>
  )
}
