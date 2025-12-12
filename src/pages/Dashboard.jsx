import React, { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { MdAdminPanelSettings } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaShield } from "react-icons/fa6";
import { SiCkeditor4 } from "react-icons/si";

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();
    const fetchData = async () => {
        const response = await axiosSecure.get("/users");
        return response.data;
    }
    const { data: users = [], isLoading, isSuccess, isError, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchData
    });

    const changeRole = async(name, email, role) => {
        try {
            toast.promise(
                async () => {
                    await axiosSecure.put(`/users/update-role/${email}`, {
                        role: role
                    })
                    await refetch()
                },
                {
                    loading: 'Changing role...',
                    success: `Role changed to ${role}`,
                    error: 'Operation failed',
                }
            )
        } catch (error) {
            toast.error(error.message)
        }
    }
    

    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading user list", { id: "users-toast" });
        }
        if (isSuccess) {
            toast.success("User list loaded successfully", { id: "users-toast" });
        }
        if (isError) {
            toast.error("Error loading user list", { id: "users-toast" });
        }
    }, [isLoading, isSuccess, isError]);

    if (isLoading) return <p>Loading </p>
    if (isError) return <p>Error fetching users.</p>;
    return (
        <div>
            <div className="tabs tabs-box p-2">
                <input type="radio" name="my_tabs_1" className="tab font-bold" aria-label="User Management" />
                <div className="tab-content mt-2 bg-base-100 p-6">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead className='text-black'>
                                <tr>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Select Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => {
                                        return (
                                            <tr key={user._id}>
                                                <th>{index + 1}</th>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <div className="flex items-center text-gray-400">
                                                        <div onClick= {() => changeRole(user.name, user.email, 'user')} className={`p-2 ${user.role !== 'user' ? 'hover:bg-primary/15' : 'hover:none'}  rounded-lg`}>
                                                            <IoPersonAdd
                                                                className={`text-xl ${user.role === "user" ? "text-black" : "text-gray-400"}`}
                                                            />
                                                        </div>
                                                        <div onClick={() => changeRole(user.name, user.email, 'creator')} className={`p-2 ${user.role !== 'creator' ? 'hover:bg-primary/15' : 'hover:none'}  rounded-lg`}>
                                                            <SiCkeditor4
                                                                className={`text-xl ${user.role === "creator" ? "text-black" : "text-gray-400"}`}
                                                            />
                                                        </div>
                                                        <div onClick={() => changeRole(user.name, user.email, 'admin')} className={`p-2 ${user.role !== 'admin' ? 'hover:bg-primary/15' : 'hover:none'}  rounded-lg`}>
                                                            <FaShield
                                                                className={`text-xl ${user.role === "admin" ? "text-black" : "text-gray-400"}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <input type="radio" name="my_tabs_1" className="tab font-bold" aria-label="Contest Management" defaultChecked />
                <div className="tab-content mt-2 bg-base-100 border-base-300 p-6">Contests</div>
            </div>
        </div>
    );
};

export default Dashboard;