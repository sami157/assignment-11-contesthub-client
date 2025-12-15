import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ContestCard from "../components/ContestCard";

const AllContests = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: contests = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["allContests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-error mt-10">
                Failed to load contests
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                All Contests
            </h1>

            {contests.length === 0 ? (
                <p className="text-center text-gray-500">
                    No contests available
                </p>
            ) : (
                <div
                    className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        gap-6
                    "
                >
                    {contests.map((contest) => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllContests;