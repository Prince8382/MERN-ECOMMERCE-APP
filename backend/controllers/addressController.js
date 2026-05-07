import Address from "../models/address.js";

// Save Address
export const saveAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.json({ message: "Address saved successfully", address });
    } catch (error) {
        console.log(error); // Terminal mein error dekhne ke liye
        res.status(500).json({ message: "Error saving address", error: error.message });
    }
};

// Get Address by User ID
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            userId: req.params.userId
        });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error: error.message });
    }
};