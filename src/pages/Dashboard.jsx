import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { IoPersonAdd } from "react-icons/io5";
import { FaShield } from "react-icons/fa6";
import { SiCkeditor4 } from "react-icons/si";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../components/Loading";

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [activeTab, setActiveTab] = useState("users");

    //fetch users
    const {
        data: users = [],
        isLoading,
        isSuccess,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    //fetch all contests
    const {
        data: contests = [],
        isLoading: contestsLoading,
        isError: contestsError,
    } = useQuery({
        queryKey: ["contests"],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/contests/all", {
                params: { all: true }
            });

            return res.data;
        },
    });

    const changeRole = async (name, email, role) => {
        try {
            await toast.promise(
                axiosSecure.put(`/users/update-role/${email}`, { role }),
                {
                    loading: "Changing role...",
                    success: `Role changed to ${role}`,
                    error: "Operation failed",
                }
            );
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleStatusChange = async (contestId, newStatus) => {
        try {
            await toast.promise(
                axiosSecure.put(`/contests/update-status/${contestId}`, {
                    status: newStatus,
                }),
                {
                    loading: "Updating status...",
                    success: `Status updated to ${newStatus}`,
                    error: "Failed to update status",
                }
            );

            queryClient.invalidateQueries(["contests"]);
        } catch (error) {
            console.error("Status update error:", error);
        }
    };

    const handleDelete = async (contestId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this contest?"
        );
        if (!confirmDelete) return;

        try {
            await toast.promise(
                axiosSecure.delete(`/contests/delete/${contestId}`),
                {
                    loading: "Deleting contest...",
                    success: "Contest deleted successfully",
                    error: "Failed to delete contest",
                }
            );

            queryClient.invalidateQueries(["contests"]);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading user list...", { id: "users-toast" });
        }
        if (isSuccess) {
            toast.success("User list loaded", { id: "users-toast" });
        }
        if (isError) {
            toast.error("Error loading users", { id: "users-toast" });
        }
    }, [isLoading, isSuccess, isError]);

    if (isLoading) return <Loading/>
    if (isError) return <p>Error fetching users.</p>;

    return (
        <div className="space-y-4">
            <div className="tabs tabs-boxed justify-center">
                <button
                    className={`tab font-bold ${
                        activeTab === "users" ? "tab-active bg-base-200 font-bold rounded-lg" : ""
                    }`}
                    onClick={() => setActiveTab("users")}
                >
                    Users
                </button>
                <button
                    className={`tab font-bold ${
                        activeTab === "contests" ? "tab-active bg-base-200 font-bold rounded-lg" : ""
                    }`}
                    onClick={() => setActiveTab("contests")}
                >
                    Contests
                </button>
            </div>

            {activeTab === "users" && (
                <div className="bg-base-100 p-6 rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead className="text-black">
                                <tr>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Select Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <div className="flex items-center text-gray-400">
                                                <div
                                                    onClick={() =>
                                                        changeRole(
                                                            user.name,
                                                            user.email,
                                                            "user"
                                                        )
                                                    }
                                                    className="p-2 rounded-lg hover:bg-primary/15"
                                                >
                                                    <IoPersonAdd
                                                        className={`text-xl ${
                                                            user.role === "user"
                                                                ? "text-black"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        changeRole(
                                                            user.name,
                                                            user.email,
                                                            "creator"
                                                        )
                                                    }
                                                    className="p-2 rounded-lg hover:bg-primary/15"
                                                >
                                                    <SiCkeditor4
                                                        className={`text-xl ${
                                                            user.role === "creator"
                                                                ? "text-black"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        changeRole(
                                                            user.name,
                                                            user.email,
                                                            "admin"
                                                        )
                                                    }
                                                    className="p-2 rounded-lg hover:bg-primary/15"
                                                >
                                                    <FaShield
                                                        className={`text-xl ${
                                                            user.role === "admin"
                                                                ? "text-black"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "contests" && (
                <div className="bg-base-100 p-6 rounded-xl">
                    {contestsLoading && <p>Loading contests...</p>}
                    {contestsError && <p>Error loading contests.</p>}

                    {!contestsLoading && contests.length === 0 && (
                        <p className="text-center text-gray-500">
                            No contests found
                        </p>
                    )}

                    {contests.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sl</th>
                                        <th>Name</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Prize</th>
                                        <th className="text-center">Deadline</th>
                                        <th className="text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contests.map((contest, index) => (
                                        <tr key={contest._id}>
                                            <th className="text-center">
                                                {index + 1}
                                            </th>
                                            <td>{contest.name}</td>
                                            <td className="text-center capitalize">
                                                {contest.contestType}
                                            </td>
                                            <td className="text-center">
                                                ${contest.price}
                                            </td>
                                            <td className="text-center">
                                                ${contest.prizeMoney}
                                            </td>
                                            <td className="text-center">
                                                {new Date(
                                                    contest.deadline
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="text-center">
                                                <div className="flex gap-3 items-center justify-center">
                                                    <select
                                                        className={`select select-bordered select-sm font-bold
                                                            ${
                                                                contest.status ===
                                                                "pending"
                                                                    ? "text-warning-content"
                                                                    : ""
                                                            }
                                                            ${
                                                                contest.status ===
                                                                "confirmed"
                                                                    ? "text-success-content"
                                                                    : ""
                                                            }
                                                            ${
                                                                contest.status ===
                                                                "rejected"
                                                                    ? "text-error"
                                                                    : ""
                                                            }
                                                        `}
                                                        value={contest.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                contest._id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="pending">
                                                            Pending
                                                        </option>
                                                        <option value="confirmed">
                                                            Confirmed
                                                        </option>
                                                        <option value="rejected">
                                                            Rejected
                                                        </option>
                                                    </select>

                                                    <MdDeleteForever
                                                        onClick={() =>
                                                            handleDelete(
                                                                contest._id
                                                            )
                                                        }
                                                        className="text-error text-3xl cursor-pointer"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;