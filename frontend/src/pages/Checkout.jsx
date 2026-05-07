import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
    const userId = localStorage.getItem("userId");

    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/");
            return;
        }

        api.get(`/cart/${userId}`).then((res) => setCart(res.data));

        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data);
            setSelectAddress(res.data[0]);
        });
    }, []);

    if (!cart) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-lg font-semibold text-gray-600">
                    Loading Checkout...
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, i) => sum + (i.productId?.price || 0) * i.quantity,
        0
    );

    const totalItems = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const placeOrder = async () => {
        if (!selectAddress) {
            alert("Please select an address");
            return;
        }

        try {
            const res = await api.post("/order/place", {
                userId,
                address: selectAddress,
            });

            navigate(`/order-success/${res.data.orderId}`);

        } catch (err) {
            console.log("ORDER ERROR:", err.response?.data);
            alert(err.response?.data?.message || "Order failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">

            {/* PAGE TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ADDRESS SECTION */}
                <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-5 border border-gray-100">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                            Select Delivery Address
                        </h2>

                        <button
                            onClick={() => navigate("/checkout-address")}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            + Add New
                        </button>
                    </div>

                    <div className="space-y-4">
                        {address.map((addr) => (
                            <label
                                key={addr._id}
                                className={`block border rounded-xl p-4 cursor-pointer transition 
                                ${
                                    selectAddress?._id === addr._id
                                        ? "border-blue-500 bg-blue-50 shadow"
                                        : "border-gray-200 hover:border-blue-300"
                                }`}
                            >
                                <div className="flex items-start gap-3">

                                    <input
                                        type="radio"
                                        name="address"
                                        checked={selectAddress?._id === addr._id}
                                        onChange={() => setSelectAddress(addr)}
                                        className="mt-1 accent-blue-600"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-800">
                                            {addr.fullName}
                                        </h3>

                                        <p className="text-gray-600 text-sm mt-1 leading-6">
                                            {addr.addressLine},
                                            <br />
                                            {addr.city}, {addr.state} - {addr.pincode}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-2">
                                            📞 {addr.phone}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* ORDER SUMMARY */}
                <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 h-fit sticky top-5">

                    <h2 className="text-2xl font-bold mb-5 text-gray-800">
                        Order Summary
                    </h2>

                    {/* ITEMS */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">

                        {cart.items.map((item) => (
                            <div
                                key={item.productId._id}
                                className="flex items-center gap-3 border-b pb-3"
                            >
                                <img
                                    src={item.productId.image}
                                    alt={item.productId.title}
                                    className="w-16 h-16 object-contain rounded-lg bg-gray-100 p-1"
                                />

                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                        {item.productId.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Qty: {item.quantity}
                                    </p>
                                </div>

                                <p className="font-bold text-blue-600">
                                    ₹
                                    {(
                                        item.productId.price * item.quantity
                                    ).toFixed(0)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* TOTAL */}
                    <div className="mt-6 border-t pt-4 space-y-3">

                        <div className="flex justify-between text-gray-600">
                            <span>Total Items</span>
                            <span>{totalItems}</span>
                        </div>

                        <div className="flex justify-between text-xl font-bold text-gray-800">
                            <span>Total Amount</span>
                            <span className="text-blue-600">
                                ₹{total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={placeOrder}
                        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition"
                    >
                        Place Order (COD)
                    </button>
                </div>
            </div>
        </div>
    );
}