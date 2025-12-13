import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { HiEye } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import EditContestModal from "../components/EditContestModal";

const ContestsCreated = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [selectedContest, setSelectedContest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Delete contest
    const handleDelete = async (contestId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this contest?"
        );
        if (!confirmDelete) return;

        try {
            await toast.promise(
                axiosSecure.delete(`/contests/delete/${contestId}`),
                {
                    loading: "Deleting contest...",
                    success: "Contest deleted successfully",
                    error: "Failed to delete contest",
                }
            );

            queryClient.invalidateQueries(["creatorContests"]);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    
    const handleUpdate = async (contestId, updatedData) => {
        const res = await axiosSecure.put(`/contests/update/${contestId}`, updatedData);
        queryClient.invalidateQueries(["creatorContests"]);
        return res;
    };

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
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="text-center">Sl</th>
                        <th>Name</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Prize</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Deadline</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {contests.map((contest, index) => (
                        <tr key={contest._id}>
                            <th className="text-center">{index + 1}</th>
                            <td>{contest.name}</td>
                            <td className="text-center capitalize">{contest.contestType}</td>
                            <td className="text-center">${contest.price}</td>
                            <td className="text-center">${contest.prizeMoney}</td>
                            <td className="text-center">
                                <div
                                    className={`flex gap-2 justify-center items-center text-warning-content capitalize`}
                                >
                                    <BsFillPatchQuestionFill className={`text-lg ${contest.status === 'pending' ? 'text-warning' : contest.status === 'confirmed' ? 'text-success' : 'text-error'}`} />
                                    <div>{contest.status}</div>
                                </div>
                            </td>
                            <td className="text-center">{new Date(contest.deadline).toLocaleDateString()}</td>
                            <td className="flex text-lg gap-2 items-center justify-center">
                                <button
                                    onClick={() => {
                                        setSelectedContest(contest);
                                        setIsModalOpen(true);
                                    }}
                                    className="text-info hover:cursor-pointer px-2 py-1 hover:bg-base-300 rounded-lg"
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(contest._id)}
                                    className="text-2xl text-error hover:cursor-pointer px-2 py-1 hover:bg-base-300 rounded-lg"
                                >
                                    <MdDeleteForever />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedContest && (
                <EditContestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    contest={selectedContest}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ContestsCreated;
