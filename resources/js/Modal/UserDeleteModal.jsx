import React from "react";

const UserDeleteModal = ({ onClose, selectedUser }) => {
    const submitForm = async () => {
        try {
            const response = await axios.delete(
                "/api/users/" + selectedUser.id,
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
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 shadow-lg rounded-lg p-6 z-100 bg-base-200">
                <h3 className="text-lg font-bold mb-2 flex justify-center z-50">
                    Delete User
                </h3>
                <p className="text-lg flex justify-center ">
                    Are you sure you want to delete user {selectedUser.name} ?
                </p>
                <div className="flex justify-between m-2">
                    <div
                        className="mb-4 m-2 btn btn-info"
                        onClick={() => onClose(false, null)}
                    >
                        Cancel
                    </div>
                    <div
                        className="mb-4 m-2 btn btn-error"
                        onClick={submitForm}
                    >
                        Delete
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDeleteModal;
