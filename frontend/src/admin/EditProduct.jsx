import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
    const{ id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const allowedFields = ["title", "description", "price", "category", "image", "stock"];

    const loadProduct = async () => {
        const res = await api.get(`/products`);
        const product = res.data.find((p) => p._id === id);
        setForm(product);
    }

    useEffect(() => {
        loadProduct();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/products/Update/${id}`, form);
        alert("Product Update successfully!");
        navigate("/admin/products");
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold md-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {
                    allowedFields.map((key) => (
                        allowedFields.includes(key) &&
                        <input
                           key={key}
                           name = {key}
                           value={form[key]}
                           onChange={handleChange}
                           placeholder={key}
                           className="w-full p-2 border border-gray-300 rounded"
                        />
                    ))
                }
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Update Product
                </button>
            </form>
        </div>
    )
}