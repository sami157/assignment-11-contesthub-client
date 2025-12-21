import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLeaderboard = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("contests/leaderboard");
            return res.data;
        },
    });
};

export default useLeaderboard;