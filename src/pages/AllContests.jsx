import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ContestCard from "../components/ContestCard";
import Loading from "../components/Loading";

const AllContests = () => {
    const types = ["all", "image", "design", "article", "video"];
    const ITEMS_PER_PAGE = 6;

    const [activeType, setActiveType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["contests", activeType, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests", {
                params: {
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    type: activeType,
                },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    const contests = data?.contests || [];
    const totalPages = data?.totalPages || 0;

    const handleTypeChange = (type) => {
        setActiveType(type);
        setCurrentPage(1);
    };

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return (
            <p className="text-center text-error">
                Failed to load contests
            </p>
        );
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="tabs w-full rounded-xl tabs-boxed justify-center">
                {types.map((type) => (
                    <button
                        key={type}
                        className={`tab rounded-lg capitalize ${activeType === type
                                ? "bg-base-200 text-black font-bold"
                                : ""
                            }`}
                        onClick={() => handleTypeChange(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Contests */}
            {contests.length === 0 ? (
                <p className="text-center text-gray-500">
                    No contests found
                </p>
            ) : (
                <div className="grid w-11/12 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {contests.map((contest) => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
            )}

            {/* Pagination (server-driven) */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <div className="join">
                        {Array.from({ length: totalPages }).map((_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    className={`join-item btn ${currentPage === page ? "btn-active" : ""
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllContests;