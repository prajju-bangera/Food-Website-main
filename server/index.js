import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js"
import http from "http"

dotenv.config();

// const orderRoutes = require('./routes/authRoutes.cjs');
const app = express();
const server = http.createServer(app);

 
// Middleware
app.use(express.json());
app.use(bodyParser.json());   
app.use(cors());
// app.use('/api/orders', orderRoutes);
 
// MongoDB Connection
// const MongodbURI = process.env.MONGO_URL
const MongodbURI = "mongodb://localhost:27017/FoodDB"

const connectDB = async () => {
    try {
        // const client = new MongoClient(MongodbURI);
        // await client.connect();
        // const databasesList = client.db("FoodDB")
        // console.log("Databases:", databasesList.collections.length);

        mongoose.set("strictQuery",true)
        mongoose.connect(MongodbURI)
        console.log("MongoDB Connected Successfully!")
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); 
    }
};
connectDB();

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello" });
});

app.get('/api/status', (req, res) => {
    res.status(200).json({ message: "API is running!" });
});

app.use('/auth/', authRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});