import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const saveAddress = async () => {
        try {

            await api.post("/address/add", {
                ...form,
                userId,
            });

            navigate("/checkout");

        } catch (err) {
            console.error(err);
            alert("Failed to save address");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-5 sm:p-8">

                {/* HEADING */}
                <div className="text-center mb-8">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        🚚 Delivery Address
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Please enter your shipping details
                    </p>
                </div>

                {/* FORM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* FULL NAME */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            placeholder="Enter phone number"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* PINCODE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pincode
                        </label>

                        <input
                            type="text"
                            name="pincode"
                            value={form.pincode}
                            placeholder="Enter pincode"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* ADDRESS */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>

                        <textarea
                            name="addressLine"
                            value={form.addressLine}
                            placeholder="House no, street, area..."
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* CITY */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            placeholder="Enter city"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* STATE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>

                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            placeholder="Enter state"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    onClick={saveAddress}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
                >
                    Save Address
                </button>
            </div>
        </div>
    );
}