import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSearchContests = (type) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["contests-search", type],
        queryFn: async () => {
            const res = await axiosSecure.get("contests/search", {
                params: { type },
            });
            return res.data;
        },
        enabled: type !== "",
    });
};

export default useSearchContests;
