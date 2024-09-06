import React, { useState } from "react";

const UsersAddModal = ({ onClose }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const submitForm = async () => {
        console.log(form);
        try {
            const response = await axios.post("/api/register", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                onClose(true);
            } else if (response.status === 401) {
                localStorage.clear();
                Inertia.visit("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 shadow-lg rounded-lg p-6 z-100 bg-base-200">
                <h3 className="text-lg font-bold mb-2 flex justify-center z-50">
                    Add User
                </h3>
                <label className="input input-bordered flex items-center gap-2 m-2">
                    Name
                    <input
                        type="text"
                        className="grow"
                        name="name"
                        placeholder=""
                        onChange={handleChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-2">
                    Email
                    <input
                        type="text"
                        className="grow"
                        name="email"
                        placeholder="user@gmail.com"
                        onChange={handleChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-2">
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
                        className="grow"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </label>
                <div className="mb-4 m-2">
                    <select
                        id="role"
                        name="role"
                        className="select select-bordered w-full max-w-xs"
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div className="flex justify-between m-2">
                    <div
                        className="mb-4 m-2 btn btn-error"
                        onClick={() => onClose(false)}
                    >
                        Cancel
                    </div>
                    <div className="mb-4 m-2 btn btn-info" onClick={submitForm}>
                        Add User
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersAddModal;
