import express from "express";
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

//Router to create a new product
router.post("/add", createProduct);

//Router to get all products
router.get("/", getProducts);

//Router to update a product by ID
router.put("/update/:id", updateProduct);

//Route to delete a product by ID
router.delete("/delete/:id", deleteProduct);

export default router;