import React, { useState, useEffect } from 'react';
import './NewCollection.css';
import Item from '../item/item';

const NewCollection = () => {
    const [new_collection, setNew_Collection] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/newcollection')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setNew_Collection(data);
            })
            .catch((error) => {
                setError(error.message);
                console.error('There was an error fetching the new collection!', error);
            });
    }, []);

    return (
        <div className='new-collections'>
            <h1>New Collections</h1>
            <hr />
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <div className='collections'>
                    {new_collection.map((item, i) => (
                        <Item key={i} id={item.id} category={item.category} name={item.name} image={item.image} price={item.price} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewCollection;
