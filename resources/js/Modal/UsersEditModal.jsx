import React from "react";

const UsersEditModal = ({ onClose, selectedUser }) => {
    const [form, setForm] = React.useState({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
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
            const response = await axios.put(
                "/api/users/" + selectedUser.id,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response.status === 200) {
                onClose(true, null);
            } else if (response.status === 401) {
                localStorage.clear();
                Inertia.visit("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 shadow-lg rounded-lg p-6 z-100 bg-base-200">
            <h3 className="text-lg font-bold mb-2 flex justify-center z-50">
                Edit User
            </h3>
            <label className="input input-bordered flex items-center gap-2 m-2">
                Name
                <input
                    type="text"
                    className="grow"
                    name="name"
                    placeholder=""
                    defaultValue={selectedUser.name}
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
                    defaultValue={selectedUser.email}
                    onChange={handleChange}
                />
            </label>

            <div className="mb-4 m-2">
                <select
                    id="role"
                    name="role"
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleChange}
                    defaultValue={selectedUser.role}
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
                    onClick={() => onClose(false, null)}
                >
                    Cancel
                </div>
                <div className="mb-4 m-2 btn btn-info" onClick={submitForm}>
                    Submit
                </div>
            </div>
        </div>
    );
};

export default UsersEditModal;
