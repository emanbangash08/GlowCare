import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        category: 'Category 1',
        description: '',
        image: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
            .then((resp) => resp.json())
            .then((data) => {
                responseData = data;
            });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproducts', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    data.success ? alert('Product Added') : alert('Failed to Add Product');
                    console.log(data);
                });
        }
    };

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Product Price</p>
                    <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type Here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                    <option value="cleansers">Cleansers</option>
                    <option value="moisturizers">Moisturizers</option>
                    <option value="sunscreens">Sunscreens</option>
                    <option value="serums-treatments">Serums & Treatments</option>
                    <option value="face-masks-scrubs">Face Masks & Scrubs</option>
                    <option value="toners-mists">Toners & Mists</option>
                    <option value="lip-eye-care">Lip & Eye Care</option>
                    <option value="sensitive-baby-skin">Sensitive & Baby Skin</option>
                    <option value="night-care">Night Care</option>
                    <option value="body-care">Body Care</option>

                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Description</p>
                <textarea value={productDetails.description} onChange={changeHandler} name="description" placeholder="Type Here"></textarea>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumbnail-img" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className="addproduct-btn">Add Product</button>
        </div>
    );
};

export default AddProduct;