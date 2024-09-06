import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
const Test = () => {
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const response = await axios.post("/api/login", form);
            if (response.status === 200) {
                console.log(response.data);
                switch (response.data.role) {
                    case "admin":
                        Inertia.visit("/admin/home");
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("Type", "Bearer");
                        localStorage.setItem("role", response.data.role);
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.user)
                        );
                        break;

                    case "user":
                        Inertia.visit("/user/home");
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("Type", "Bearer");
                        localStorage.setItem("role", response.data.role);
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.user)
                        );
                        break;

                    case "manager":
                        Inertia.visit("/manager/home");
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("Type", "Bearer");
                        localStorage.setItem("role", response.data.role);
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.user)
                        );
                        break;

                    default:
                        break;
                }
            } else {
                setError(error.response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
        console.log(form);
    };

    const route = () => {
        Inertia.visit("/register");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Login Form</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-2">
                        Email
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 px-4 py-2 rounded w-full"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-bold mb-2">
                        Password
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-300 px-4 py-2 rounded w-full"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>

                <br />
                <div className="m-5 flex justify-center" onClick={route}>
                    Register instead
                </div>
            </div>
        </div>
    );
};

export default Test;
