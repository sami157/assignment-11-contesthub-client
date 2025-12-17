import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ContestCard from "../components/ContestCard";

const AllContests = () => {
    const types = ["all", "image", "design", "article", "video"]
    const axiosSecure = useAxiosSecure();
    const [activeType, setActiveType] = useState("all");

    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    const filteredContests =
        activeType === "all"
            ? contests
            : contests.filter(
                  (contest) => contest.contestType === activeType
              );

    if (isLoading) return <p className="text-center">Loading contests...</p>;
    if (isError) return <p className="text-center text-error">Failed to load contests</p>;

    return (
        <div className="space-y-6">
            <div className="tabs w-full rounded-xl tabs-boxed justify-center">
                {types.map((type) => (
                    <button
                        key={type}
                        className={`tab rounded-lg capitalize ${
                            activeType === type ? "bg-base-200 text-black font-bold" : ""
                        }`}
                        onClick={() => setActiveType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {filteredContests.length === 0 ? (
                <p className="text-center text-gray-500">
                    No contests found
                </p>
            ) : (
                <div className="grid w-11/12 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredContests.map((contest) => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllContests;