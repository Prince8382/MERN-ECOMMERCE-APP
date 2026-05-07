import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api/axios";

export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");

    // FIX
    const navigate = useNavigate();

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", form);

            // SAVE DATA
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);

            setMsg("✅ Login Successful");

            // REDIRECT
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {

            setMsg(
                err.response?.data?.message ||
                "❌ Invalid email or password"
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">

            {/* CARD */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                {/* TOP */}
                <div className="bg-blue-500 text-white text-center py-8 px-6">

                    <div className="text-5xl mb-3">
                        🔐
                    </div>

                    <h2 className="text-3xl font-bold">
                        Welcome Back
                    </h2>

                    <p className="text-blue-100 mt-2 text-sm">
                        Login to continue shopping
                    </p>
                </div>

                {/* FORM */}
                <div className="p-6 md:p-8">

                    {/* MESSAGE */}
                    {msg && (
                        <div
                            className={`mb-5 text-center text-sm font-medium px-4 py-3 rounded-xl ${
                                msg.includes("Successful")
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "bg-red-100 text-red-700 border border-red-200"
                            }`}
                        >
                            {msg}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* EMAIL */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                required
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                required
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* SIGNUP */}
                    <p className="text-center text-gray-600 text-sm mt-6">

                        Don't have an account?

                        <Link
                            to="/signup"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}