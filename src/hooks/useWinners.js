import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWinners = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["recent-winners"],
        queryFn: async () => {
            const res = await axiosSecure.get("contests/winners");
            return res.data;
        },
    });
};

export default useWinners;