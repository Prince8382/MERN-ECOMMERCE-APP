import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {

    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        const loadCart = async () => {

            try {

                if (!userId) return;

                const res = await api.get(`/cart/${userId}`);

                const cart = res.data || { items: [] };

                // TOTAL ITEMS COUNT
                const count = cart.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                setCartCount(count);

            } catch (err) {

                console.error("Navbar cart error:", err);
            }
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };

    }, [userId]);

    // LOGOUT
    const logout = () => {

        localStorage.clear();

        setCartCount(0);

        navigate("/login");
    };

    return (

        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                    >
                        <div className="bg-blue-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition">
                            🛍️
                        </div>

                        <div>
                            <h1 className="text-lg md:text-2xl font-bold text-gray-800 leading-none">
                                Chaudhary Store
                            </h1>

                            <p className="text-[10px] md:text-xs text-gray-500">
                                Online Shopping Store
                            </p>
                        </div>
                    </Link>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-3 md:gap-5">

                        {/* HOME */}
                        <Link
                            to="/"
                            className="hidden md:flex text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Home
                        </Link>

                        {/* CART */}
                        <Link
                            to="/cart"
                            className="relative group"
                        >

                            <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-2xl hover:bg-blue-100 transition">
                                🛒
                            </div>

                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-red-500 text-white min-w-[20px] h-5 px-1 text-[11px] font-bold rounded-full flex items-center justify-center shadow"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* AUTH */}
                        {!userId ? (

                            <div className="flex items-center gap-2">

                                {/* LOGIN */}
                                <Link
                                    to="/login"
                                    className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm md:text-base font-medium px-4 py-2 rounded-xl shadow-sm transition"
                                >
                                    Login
                                </Link>

                                {/* SIGNUP */}
                                <Link
                                    to="/signup"
                                    className="hidden sm:flex border border-blue-500 text-blue-600 hover:bg-blue-50 active:scale-95 text-sm md:text-base font-medium px-4 py-2 rounded-xl transition"
                                >
                                    Signup
                                </Link>
                            </div>

                        ) : (

                            <button
                                onClick={logout}
                                className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm md:text-base font-medium px-4 py-2 rounded-xl shadow-sm transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}