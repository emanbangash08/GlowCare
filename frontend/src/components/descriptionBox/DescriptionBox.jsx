import React from 'react' 
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
                An e-commerce website is a platform that allows you to sell
                and market your products online. It is a website that allows
                you to list your products, accept orders, and receive payments.
                E-commerce websites are a great way to reach a larger audience 
                and increase your sales. They are also a great way to showcase 
                your products and build your brand. E-commerce websites are a great 
                way to reach a larger audience and increase your sales. They are 
                also a great way to showcase your products and build your brand.
            </p>

            <p>
                E-commerce websites typically display products or services with detailed
                descriptions, images, and prices. They also provide customers with a 
                shopping cart and checkout process. Each product usually has its own
                product page, which includes information about the product, such as
                its features, specifications, and price. Customers can add products to
                their shopping cart and proceed to checkout when they are ready to make
                a purchase.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox