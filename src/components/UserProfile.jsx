import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";

const COLORS = ["#22c55e", "#ef4444"];

const UserProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: profileData, refetch } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/profile`);
            return res.data;
        },
    });

    const { data: userStats, isLoading: statsLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("users/stats");
            return res.data;
        },
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        values: {
            name: profileData?.name || "",
            photo: profileData?.photo || "",
            bio: profileData?.bio || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await axiosSecure.put(`/users/profile/${user.email}`, data);
            toast.success("Profile updated");
            refetch();
        } catch {
            toast.error("Update failed");
        }
    };

    const stats = userStats;

    const chartData = stats
        ? [
            { name: "Wins", value: stats.won },
            { name: "Losses", value: stats.participated - stats.won },
        ]
        : [];

    if (!profileData) return <Loading/>

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-6 lg:w-2/3">
                {stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-base-200 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">Participated</p>
                            <p className="text-3xl font-bold">{stats.participated}</p>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">Wins</p>
                            <p className="text-3xl font-bold text-green-500">{stats.won}</p>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl text-center">
                            <p className="text-sm text-gray-500">Win %</p>
                            <p className="text-3xl font-bold text-primary">{stats.winPercentage}%</p>
                        </div>
                    </div>
                )}

                {stats && (
                    <div className="bg-base-200 w-full rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-center">Win Percentage</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        cornerRadius={50}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-center mt-4 text-lg font-bold">{stats.winPercentage}% Win Rate</p>
                    </div>
                )}
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-base-200 p-6 rounded-xl flex-1 space-y-4"
            >
                <h3 className="text-xl font-semibold">Update Profile</h3>
                <div>
                    <label className="label">Name</label>
                    <input className="input input-bordered w-full" {...register("name")} />
                </div>
                <div>
                    <label className="label">Photo URL</label>
                    <input className="input input-bordered w-full" {...register("photo")} />
                </div>
                <div>
                    <label className="label">Bio</label>
                    <textarea className="textarea textarea-bordered w-full" {...register("bio")} />
                </div>
                <button disabled={isSubmitting} className="btn btn-primary w-full">
                    {isSubmitting ? "Updating..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;