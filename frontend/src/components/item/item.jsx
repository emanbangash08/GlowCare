"use client"

import { Link } from "react-router-dom"
import "./item.css"

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image || "/placeholder.svg"} alt={props.name} />
      </Link>
      <div className="item-details">
        <h3>{props.name}</h3>
       
      </div>
    </div>
  )
}

export default Item
