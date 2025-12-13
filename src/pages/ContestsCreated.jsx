import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const ContestsCreated = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: contests = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["creatorContests"],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/creator/${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center">Loading contests...</div>;
    }

    if (isError) {
        return <div className="text-red-500 text-center">Failed to load contests</div>;
    }

    if (contests.length === 0) {
        return <div className="text-center text-gray-500">No contests created yet</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => (
                <div key={contest._id} className="card bg-base-100 shadow-md">
                    <figure>
                        <img
                            src={contest.image}
                            alt={contest.name}
                            className="h-48 w-full object-cover"
                        />
                    </figure>

                    <div className="card-body">
                        <h2 className="card-title">{contest.name}</h2>

                        <p className="text-sm text-gray-600 line-clamp-2">
                            {contest.description}
                        </p>

                        <div className="flex justify-between text-sm mt-2">
                            <span>💰 Price: ${contest.price}</span>
                            <span>🏆 Prize: ${contest.prizeMoney}</span>
                        </div>

                        <div className="mt-2">
                            <span className="badge badge-outline capitalize">
                                {contest.status}
                            </span>
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-sm btn-outline">View</button>
                            <button className="btn btn-sm btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContestsCreated;
