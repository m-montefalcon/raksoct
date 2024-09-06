import { Inertia } from "@inertiajs/inertia";

import axios from "axios";
import React from "react";

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const roleName = user?.name;
    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/logout", null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                localStorage.clear();
                Inertia.visit("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Meinardz</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>{roleName} </summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li>
                                        <a> Account Settings</a>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout}>Logout</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBar;
