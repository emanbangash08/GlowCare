// src/components/PatientRequest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientRequest.css';

const PatientRequest = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get('http://localhost:4000/getrequest');
            setRequests(response.data);
        };
        fetchRequests();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:4000/allproducts');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleSelectRequest = (request) => {
        setSelectedRequest(request);
        setRecommendedProducts([]); // Reset selected products on new selection
    };

    const handleRecommend = async () => {
        if (!selectedRequest || !selectedRequest._id) {
            alert("Invalid request: No user selected");
            return;
        }

        try {
            await axios.post(`http://localhost:4000/recommend/${selectedRequest._id}`, {
                recommendedProducts: recommendedProducts,
            });
            alert('Recommendation submitted successfully');
            setSelectedRequest(null);
            setRecommendedProducts([]);
        } catch (err) {
            console.error(err);
            alert('Failed to submit recommendation');
        }
    };

    const handleProductCheckboxChange = (productId) => {
        const index = recommendedProducts.indexOf(productId);
        if (index === -1) {
            setRecommendedProducts([...recommendedProducts, productId]);
        } else {
            setRecommendedProducts(recommendedProducts.filter(id => id !== productId));
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <table className="request-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Skin Type</th>
                        <th>Issues</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.name}</td>
                            <td>{request.status}</td>
                            <td>{request.skinType}</td>
                            <td>{request.issues}</td>
                            <td>
                                <button onClick={() => handleSelectRequest(request)}>Recommend</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRequest && (
                <div className="recommendation-section">
                    <h2>Recommend Products for {selectedRequest.name}</h2>
                    <div className="products-list">
                        {products.map(product => (
                            <div key={product._id}>
                                <input
                                    type="checkbox"
                                    id={product._id}
                                    checked={recommendedProducts.includes(product._id)}
                                    onChange={() => handleProductCheckboxChange(product._id)}
                                />
                                <label htmlFor={product._id}>{product.name}</label>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleRecommend}>Submit Recommendation</button>
                </div>
            )}
        </div>
    );
};

export default PatientRequest;
