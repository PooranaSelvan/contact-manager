import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userController from "./controllers/userController.js";
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.PORT || 5000;
const app = express();


// CORS configuration
app.use(cors({
    origin: "*",
    methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
    credentials: true,
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to the database
connectDB();


// Define routes for userController with a base path of /users
app.use("/users", userController); 


// Start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));

export default app;