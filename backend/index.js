import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Testing testing 1 2 3");
});

app.use("/books", booksRoute);

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ['Content-Type']
    }
))

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("successful");
        app.listen(PORT, () => {
            console.log(`Listening to Port ${PORT}`)
        }); 
    })
    .catch((error) => {
        console.log(error);
    });