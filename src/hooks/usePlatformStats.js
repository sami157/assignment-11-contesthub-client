import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePlatformStats = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["platform-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("contests/platform-stats");
            return res.data;
        },
    });
};

export default usePlatformStats;