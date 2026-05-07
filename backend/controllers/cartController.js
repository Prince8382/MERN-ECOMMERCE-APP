import mongoose from "mongoose";
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        console.log("REQ:", req.body);

        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing data" });
        }

        //  convert to ObjectId
        const uid = new mongoose.Types.ObjectId(userId);
        const pid = new mongoose.Types.ObjectId(productId);

        let cart = await Cart.findOne({ userId: uid });

        if (!cart) {
            cart = new Cart({
                userId: uid,
                items: [{ productId: pid, quantity: 1 }]
            });
        } else {
            const item = cart.items.find(
                i => i.productId.toString() === pid.toString()
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productId: pid, quantity: 1 });
            }
        }

        await cart.save();

        const updatedCart = await Cart.findOne({ userId: uid })
            .populate("items.productId");

        res.json({
            message: "Item added",
            cart: updatedCart
        });

    } catch (error) {
        console.log(" REAL ERROR:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// REMOVE ITEM
export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }

        cart.items = cart.items.filter(
            (i) => i.productId?.toString() !== productId
        );

        await cart.save();

        res.json({
            message: "Item removed",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// UPDATE QUANTITY
export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not Found" });
        }

        const item = cart.items.find(
            (i) => i.productId?.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({
            message: "Quantity updated",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// GET CART
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("items.productId");

        res.json(cart || { items: [] });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};