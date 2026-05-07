import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.post("/auth/signup", form);

            setMsg(response.data.message);

            setForm({
                name: "",
                email: "",
                password: ""
            });

        } catch (err) {
            setMsg(
                err.response?.data?.message || "Something went wrong"
            );
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8">

                {/* HEADING */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Signup to continue shopping
                    </p>
                </div>

                {/* MESSAGE */}
                {msg && (
                    <div className="mb-5 text-center text-sm font-medium bg-blue-100 text-blue-700 py-3 rounded-lg">
                        {msg}
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* NAME */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                {/* LOGIN LINK */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}