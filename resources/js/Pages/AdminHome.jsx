import React from "react";
import NavBar from "../Common/NavBar";
import UsersAddModal from "../Modal/UsersAddModal";
import UsersEditModal from "../Modal/UsersEditModal";
import UserDeleteModal from "../Modal/UserDeleteModal";
const AdminHome = () => {
    const [users, setUsers] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/tasks", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            setTasks(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    const [modal, setModal] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const toggleModal = (confirm) => {
        setModal((previousModal) => !previousModal);
        if (confirm) {
            fetchData();
        }
    };
    const toggleEditModal = (confirm, user) => {
        setSelectedUser(user);
        setEditModal((previousModal) => !previousModal);
        if (confirm) {
            fetchData();
        }
    };
    const toggleDeleteModal = (confirm, user) => {
        setSelectedUser(user);
        setDeleteModal((previousModal) => !previousModal);
        if (confirm) {
            fetchData();
        }
    };
    const [selectedUser, setSelectedUser] = React.useState({});

    return (
        <>
            <NavBar />
            <div className="h-96 w96">
                <h1 className="text-3xl font-bold mb-4 flex justify-center">
                    Admin Home
                </h1>

                <div className="flex">
                    <h2 className="w-screen text-xl font-bold mb-4 m-10 flex justify-start">
                        Users
                    </h2>
                    <button
                        className="btn btn-primary mb-4 m-10 justify-end"
                        onClick={() => setModal(true)}
                    >
                        Add User
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <div className="max-h-96 overflow-y-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id || index}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <div className="flex">
                                                <div
                                                    className="btn btn-warning m-2"
                                                    onClick={() =>
                                                        toggleEditModal(
                                                            true,
                                                            user
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </div>
                                                <div
                                                    className="btn btn-error m-2"
                                                    onClick={() =>
                                                        toggleDeleteModal(
                                                            true,
                                                            user
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex">
                    <h2 className="w-screen text-xl font-bold mb-4 m-10 flex justify-start">
                        Tasks
                    </h2>
                    <button className="btn btn-primary mb-4 m-10 justify-end">
                        Add Tasks
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <div className="max-h-96 overflow-y-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={task.id || index}>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{task.due_date}</td>
                                        <td>{task.status}</td>
                                        <td>{task.priority}</td>
                                        <td>
                                            <div className="flex">
                                                <div className="btn btn-warning m-2">
                                                    Edit
                                                </div>
                                                <div className="btn btn-error m-2">
                                                    Delete
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {modal && <UsersAddModal onClose={toggleModal} />}
            {editModal && (
                <UsersEditModal
                    onClose={toggleEditModal}
                    selectedUser={selectedUser}
                />
            )}
            {deleteModal && (
                <UserDeleteModal
                    onClose={toggleDeleteModal}
                    selectedUser={selectedUser}
                />
            )}
        </>
    );
};

export default AdminHome;
