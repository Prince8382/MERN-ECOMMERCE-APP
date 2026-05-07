import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const loadCart = async () => {
        if (!userId) return;

        try {
            const res = await api.get(`/cart/${userId}`);
            setCart(res.data || { items: [] });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (productId) => {
        await api.post(`/cart/remove`, { userId, productId });

        loadCart();

        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQty = async (productId, quantity) => {
        if (quantity <= 0) return removeItem(productId);

        await api.post(`/cart/update`, {
            userId,
            productId,
            quantity,
        });

        loadCart();

        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!cart) {
        return (
            <div className="text-center mt-20 text-lg font-semibold">
                Loading...
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) =>
            sum + item.productId.price * item.quantity,
        0
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">

            {/* HEADING */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                🛒 Your Cart
            </h1>

            {cart.items.length === 0 ? (
                <div className="text-center text-gray-500 mt-16 text-lg">
                    Cart is empty 😢
                </div>
            ) : (
                <>
                    {/* ITEMS */}
                    <div className="grid gap-5">

                        {cart.items.map((item) => (
                            <div
                                key={item.productId._id}
                                className="flex flex-col sm:flex-row gap-4 border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-lg transition bg-white"
                            >
                                {/* IMAGE */}
                                <div className="flex justify-center sm:block">
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.title}
                                        className="w-32 h-32 sm:w-28 sm:h-28 object-contain rounded-lg bg-gray-50 p-2"
                                    />
                                </div>

                                {/* DETAILS */}
                                <div className="flex-1 text-center sm:text-left">

                                    <h2 className="font-semibold text-lg md:text-xl">
                                        {item.productId.title}
                                    </h2>

                                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                                        ₹{item.productId.price}
                                    </p>

                                    {/* QTY */}
                                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">

                                        <button
                                            onClick={() =>
                                                updateQty(
                                                    item.productId._id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-bold"
                                        >
                                            -
                                        </button>

                                        <span className="font-semibold text-lg">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQty(
                                                    item.productId._id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4">

                                    <p className="font-bold text-xl text-blue-600">
                                        ₹{(
                                            item.productId.price *
                                            item.quantity
                                        ).toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() =>
                                            removeItem(item.productId._id)
                                        }
                                        className="border border-red-400 text-red-500 px-4 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SUMMARY */}
                    <div className="mt-8 border border-gray-200 p-5 rounded-2xl shadow-md bg-gray-50">

                        <div className="flex justify-between mb-3 text-sm md:text-base">
                            <span>Total Items:</span>

                            <span className="font-semibold">
                                {cart.items.reduce(
                                    (sum, i) => sum + i.quantity,
                                    0
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between text-base md:text-lg">
                            <span>Total Price:</span>

                            <span className="font-bold text-blue-600">
                                ₹{total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* CHECKOUT BUTTON */}
                    <div className="mt-8 sticky bottom-2">
                        <button
                            onClick={() =>
                                navigate("/checkout-address")
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition font-semibold shadow-md"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}