import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { bookModel } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Testing testing 1 2 3");
});

//saving a book
app.post("/books", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({ message: "Send all fields" })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await bookModel.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

app.get("/books" , async (request, response) => {
    try {
        const books = await bookModel.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message })
    }
});

app.get("/books/:id" , async (request, response) => {
     try {

        const { id } = request.params;


        const book = await bookModel.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message })
    }
});

app.put("/books/:id", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({ message: "Send all fields" })
        }

        const { id } = request.params;

        const book = bookModel.findByIdAndUpdate(id, request.body);

        if (!book) {
            return response.status(404).send( {message: "book not found"} );
        }

        return response.status(200).send( {message: "book updated"} );
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message} );
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("successful");
        app.listen(PORT, () => {
            console.log(`Listening to Port ${PORT}`)
        }); 
    })
    .catch((error) => {

    });