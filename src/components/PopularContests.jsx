import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ContestCard from "./ContestCard";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const PopularContests = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["popularContests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests/popular");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading/>
    }

    return (
        <section className="max-w-7xl mx-auto px-4 my-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Popular Contests</h2>
                <button
                    onClick={() => navigate("/all-contests")}
                    className="btn btn-sm"
                >
                    Show All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.map((contest) => (
                    <ContestCard data-aos="fade"
                        key={contest._id}
                        contest={contest}
                    />
                ))}
            </div>
        </section>
    );
};

export default PopularContests;