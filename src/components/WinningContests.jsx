import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

const WinningContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["my-winning-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests/winning-contests");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading/>
    }

    if (contests.length === 0) {
        return (
            <p className="text-center text-gray-500">
                You haven't won any contests yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => (
                <div
                    key={contest._id}
                    className="bg-base-200 rounded-xl p-2 flex flex-col"
                >
                    <img
                        src={contest.image}
                        alt={contest.name}
                        className="h-40 w-full object-cover rounded-lg mb-4"
                    />

                    <h3 className="text-xl font-bold mb-1">
                        {contest.name}
                    </h3>

                    <div className="mt-auto">
                        <span className="btn">
                            Prize Won: ${contest.prizeMoney}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WinningContests;