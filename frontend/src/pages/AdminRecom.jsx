// AdminRecom.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/AdminRecom.css';
import { jwtDecode } from "jwt-decode";

const AdminRecom = () => {
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserIdFromToken = (token) => {
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return decoded.user.id;
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };

    const fetchRecommendations = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = getUserIdFromToken(token);
            const response = await axios.get(`http://localhost:4000/getrecommendation/${userId}`);
            setRecommendation(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching recommendation:", error);
            setError('Error fetching recommendation');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='user-recommendations-container'>
            <h2>Recommendation from the Doctor:</h2>
            <ul>
                {recommendation && recommendation.recommendedProducts?.length > 0 ? (
                    recommendation.recommendedProducts.map((product, index) => (
                        <li key={index}>{product}</li>
                    ))
                ) : (
                    <p>No recommendation found.</p>
                )}
            </ul>
        </div>
    );
};

export default AdminRecom;