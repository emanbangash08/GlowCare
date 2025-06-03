const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');

const port = 4000;
app.use(express.json());
app.use(cors());

// Ensure upload folder exists
const uploadDir = 'upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Database connection
mongoose.connect("mongodb+srv://emanbangash8:emanyy2003@cluster0.vtqof7p.mongodb.net/glowcare")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Multer storage config
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

// Upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (req.file) {
        const port = process.env.PORT || 4000;
        const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
        res.json({ success: 1, image_url: imageUrl });
    } else {
        res.status(500).json({ success: 0, message: 'File upload failed', error: req.file });
    }
});

// Product Schema
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    sizes: { type: Map, of: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});
const Product = mongoose.model('Product', productSchema);

// Add Product
app.post('/addproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            sizes: req.body.sizes,
            description: req.body.description,
        });

        await product.save();
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
});

// Delete Product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

// Get All Products
app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// Get Latest 8 Products
app.get('/newcollection', async (req, res) => {
    const products = await Product.find({});
    res.send(products.slice(-8));
});

// Get Latest 6 Popular Products
app.get('/popular', async (req, res) => {
    const products = await Product.find({});
    res.send(products.slice(-6));
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now }
});
const Users = mongoose.model('Users', userSchema);

// JWT Auth Middleware
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({ errors: "Please authenticate using a valid token" });

    try {
        const data = jwt.verify(token, 'secret_glowcare');
        req.user = data.user;
        next();
    } catch {
        res.status(401).send({ errors: "Invalid token" });
    }
};

// Signup
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: {}
    });

    await user.save();

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_glowcare');
    res.json({ success: true, token });
});

// Login
app.post('/login', async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });
    if (user && req.body.password === user.password) {
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_glowcare');
        res.json({ success: true, token });
    } else {
        res.json({ success: false, errors: 'Invalid email or password' });
    }
});

// Cart - Add to Cart
app.post('/addtocart', fetchUser, async (req, res) => {
    const { itemId, size } = req.body;
    const user = await Users.findById(req.user.id);

    if (!user.cartData[itemId]) {
        user.cartData[itemId] = {};
    }
    user.cartData[itemId][size] = (user.cartData[itemId][size] || 0) + 1;

    await Users.findByIdAndUpdate(user._id, { cartData: user.cartData });
    res.send("Added");
});

// Cart - Remove from Cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    const { itemId, size } = req.body;
    const user = await Users.findById(req.user.id);

    if (user.cartData[itemId] && user.cartData[itemId][size]) {
        user.cartData[itemId][size] -= 1;
        if (user.cartData[itemId][size] <= 0) {
            delete user.cartData[itemId][size];
        }
        if (Object.keys(user.cartData[itemId]).length === 0) {
            delete user.cartData[itemId];
        }
        await Users.findByIdAndUpdate(user._id, { cartData: user.cartData });
    }

    res.send("Removed");
});

// Cart - Get Cart
app.post('/getcart', fetchUser, async (req, res) => {
    const user = await Users.findById(req.user.id);
    res.json(user.cartData);
});

// User Request Schema
const UserRequestSchema = new mongoose.Schema({
    name: String,
    email: String,
    skinType: String,
    issues: String,
    userId: String,
    status: { type: String, default: 'pending' }
});
const userRequest = mongoose.model('UserRequest', UserRequestSchema);

// Create User Request
app.post('/createrequest', async (req, res) => {
    const { name, email, skinType, issues, userId } = req.body;
    const newUserRequest = new userRequest({ name, email, skinType, issues, userId });
    await newUserRequest.save();
    res.status(201).send(newUserRequest);
});

// Get All User Requests
app.get('/getrequest', async (req, res) => {
    const userRequests = await userRequest.find();
    res.status(200).send(userRequests);
});

// Recommendation Schema
const recommendationSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    recommendedProducts: [String],
    date: { type: Date, default: Date.now }
});
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

// Create recommendation (you should have something like this in admin panel or backend logic)
app.post('/recommend/:id', async (req, res) => {
    const { recommendedProducts } = req.body;
    const userId = req.params.id;

    try {
        const recommendation = await Recommendation.findOneAndUpdate(
            { userId },
            { recommendedProducts },
            { upsert: true, new: true }
        );

        await Request.findOneAndUpdate(
            { _id: userId },
            { status: 'complete' }
        );

        res.json({ success: true, data: recommendation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving recommendation', error });
    }
});


// Get recommendation for a user
app.get('/getrecommendation/:userId', async (req, res) => {
    try {
        const recommendation = await Recommendation.findOne({ userId: req.params.userId });
        if (recommendation) {
            res.json(recommendation);
        } else {
            res.status(404).json({ message: "No recommendation found for this user." });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching recommendation", error: err });
    }
});


// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Service running on port: " + port);
    } else {
        console.log("Error: " + error);
    }
});
