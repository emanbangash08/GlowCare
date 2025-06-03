import React from "react";
import './popular.css';
import Item from '../item/item';

const Popular = () => {
    const [popular_products, setPopular_Products] = React.useState([]);
    const [error, setError] = React.useState(null);


    React.useEffect(() => {
        fetch('http://localhost:4000/popular')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPopular_Products(data);
            })
            .catch((error) => {
                setError(error.message);
                console.error('There was an error!', error);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="popular">
            <h1>POPULAR PRODUCTS</h1>
            <hr />
            <div className="popular-item">
                {popular_products.map((item, i) => (
                    <Item key={i} id={item.id} category={item.category} name={item.name} image={item.image} price={item.price} />
                ))}
            </div>
        </div>
    );
}

export default Popular;