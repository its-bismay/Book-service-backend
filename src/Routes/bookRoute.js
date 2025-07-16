import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/create", protectRoute  ,async (req, res) => {
    try {
        const { title, caption, rating, image} = req.body;
        if(!image || !title || !caption || !rating) return res.status(400).json({
            message: "Please provide all details",
            success: false
        })

        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;

        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
            user: req.user._id,
        })

        await newBook.save();
        res.status(201).json({
            message: 'Book added successfully',
            success: true
        })

    } catch (error) {
        console.log("something went wrong", error)
        res.status(500).json({
            message: 'Internal server error',
            success: true
        })
    }
});

router.get("/all-books", protectRoute  ,async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;
        const books = await Book.find().sort({createdAt: -1}).skip(skip).limit(limit).populate("user", "username profileImage");
        const totalBooks = await Book.countDocuments();
        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        })

    } catch (error) {
        console.log("something went wrong in getting all books", error)
        res.status(500).json({
            message: 'Internal server error',
            success: true
        })
    }
});


router.delete("/delete/:id", protectRoute, async(req,res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book){
            return res.status(400).json({
                message: "Book not found",
                success: false
            })
        }

        if(book.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "You are not authorized",
                success: false
            })
        }

        if(book.image && book.image.includes("cloudinary")){
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.log("error deleting the image", error);
                res.status(500).json({
                    message: 'Internal server error',
                    success: true
                })
            }
        }
        await book.deleteOne();
        res.status(200).json({
            message: 'Book deleted successfully',
            success: true
        })
    } catch (error) {
        console.log("something went wrong in deletting a book", error)
        res.status(500).json({
            message: 'Internal server error',
            success: true
        })
    }
})


router.get("/my-books", protectRoute  ,async (req, res) => {
    try {
        const books = await Book.find({user: req.user._id}).sort({createdAt: -1});
        res.status(200).json(books)
    } catch (error) {
        console.log("something went wrong in getting requested user books", error)
        res.status(500).json({
            message: 'Internal server error',
            success: true
        })
    }
});


export default router;