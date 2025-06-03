import React from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/products/all_products";
import Item from "../item/item";

const RelatedProducts = () => {
    return(
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {data_product.map((item, i)=>{
                    return <Item key={i} id={item.id} category={item.category} name={item.name} image={item.image} price={item.price} />
            })}
            </div>
        </div>
    )
}

export default RelatedProducts
