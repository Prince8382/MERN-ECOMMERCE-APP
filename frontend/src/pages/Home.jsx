import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loadingId, setLoadingId] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await api.get(
                    `/products?search=${search}&category=${category}`
                );

                setProducts(res.data);

            } catch (err) {
                console.error("Product load error:", err);
            }
        };

        const delay = setTimeout(loadProducts, 400);

        return () => clearTimeout(delay);

    }, [search, category]);

    // ADD TO CART
    const addToCart = async (productId) => {

        if (loadingId === productId) return;

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first");
            return;
        }

        setLoadingId(productId);

        try {

            await api.post(`/cart/add`, {
                userId,
                productId
            });

            window.dispatchEvent(new Event("cartUpdated"));

        } catch (err) {

            console.error(
                "Add error:",
                err.response?.data || err.message
            );

        }

        setLoadingId(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">

            {/* HEADING */}
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Explore Products
                </h1>

                <p className="text-gray-500 mt-1 text-sm md:text-base">
                    Find the best laptops, mobiles and tablets
                </p>
            </div>

            {/* SEARCH + CATEGORY */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">

                <div className="flex flex-col md:flex-row gap-4">

                    {/* SEARCH */}
                    <div className="flex-1 relative">

                        <input
                            type="text"
                            placeholder="🔍 Search Products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    {/* CATEGORY */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full md:w-64 border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    >
                        <option value="">
                            📦 All Categories
                        </option>

                        <option value="Laptops">
                            💻 Laptops
                        </option>

                        <option value="Mobiles">
                            📱 Mobiles
                        </option>

                        <option value="Tablets">
                            📟 Tablets
                        </option>
                    </select>
                </div>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {products.map((product) => (

                    <div
                        key={product._id}
                        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                    >

                        <Link to={`/product/${product._id}`}>

                            {/* IMAGE */}
                            <div className="bg-gray-50 p-4 flex justify-center items-center h-52">

                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-40 object-contain group-hover:scale-105 transition duration-300"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-4">

                                {/* CATEGORY */}
                                <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-3 font-medium">
                                    {product.category}
                                </span>

                                {/* TITLE */}
                                <h2 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 min-h-[48px]">
                                    {product.title}
                                </h2>

                                {/* PRICE */}
                                <p className="text-2xl font-bold text-blue-600 mt-3">
                                    ₹{product.price}
                                </p>
                            </div>
                        </Link>

                        {/* BUTTON */}
                        <div className="px-4 pb-4 flex justify-end">

                            <button
                                disabled={loadingId === product._id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product._id);
                                }}
                                className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50 shadow-sm"
                            >
                                {
                                    loadingId === product._id
                                        ? "Adding..."
                                        : "Add to Cart"
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY PRODUCTS */}
            {
                products.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No Products Found 😢
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try searching something else
                        </p>
                    </div>
                )
            }
        </div>
    );
}