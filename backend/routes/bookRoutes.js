import express from "express";
import { bookModel } from "../models/bookModel.js";

const router = express.Router();

//saving a book
router.post("/", async (request, response) => {
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

//get all books
router.get("/" , async (request, response) => {
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

//Get book by Id
router.get("/:id" , async (request, response) => {
     try {
        const { id } = request.params;


        const book = await bookModel.findById(id);

        if (!book) {
            return response.status(404).send( {message: "Book not found"} );
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message })
    }
});

//Update book
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({ message: "Send all fields" }); 
        }

        const { id } = request.params;

        const book = await bookModel.findByIdAndUpdate(id, request.body);

        if (!book) {
            return response.status(404).send( {message: "book not found"} );
        }

        return response.status(200).send( {message: "book updated: "} );
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message} );
    }
});

//Delete book by id
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const book = await bookModel.findByIdAndDelete(id);

        if (!book) {
            return response.status(404).send( {message: "Book not found"} );
        }

        return response.status(200).send( {message: "Book deleted"} );


    } catch (error) {
        console.log(error);
        return response.status(500).send( {message: error.message} );
    }
});

//Delete all books (danger)
router.delete("/", async (request, response) => {
    try {
        await bookModel.deleteMany();

        return response.status(200).send( {message: `You deleted all books!`} ); 


    } catch (error) {
        console.log(error);
        return response.status(500).send( {message: error.message} );
    }
});

export default router;