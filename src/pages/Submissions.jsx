import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { FaEye, FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";

const Submissions = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedSubmission, setSelectedSubmission] = useState({});

    const {
        data: submissions = [],
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ["creator-submissions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/submissions/creator/${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center">Loading submissions...</p>;
    }

    if (isError) {
        return <p className="text-center text-error">Failed to load submissions</p>;
    }

    const handleDeclareWinner = async (submission) => {
        try {
            await axiosSecure.put(
                `contests/${submission.contestId}/declare-winner`,
                { submissionId: submission._id }
            );

            toast.success("Winner declared!");
            refetch();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to declare winner");
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Submitted Tasks
            </h1>

            {submissions.length === 0 ? (
                <p className="text-gray-500">No submissions found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Contest</th>
                                <th className="text-center">Participant</th>
                                <th className="text-center">Submitted At</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="font-semibold">
                                        {item.contestName}
                                    </td>

                                    <td className="text-center">
                                        <span>
                                            {item.userName}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        {new Date(item.submittedAt).toLocaleDateString()}
                                    </td>
                                    <td >
                                        <div className="flex justify-center cursor-pointer text-lg">
                                            <FaEye onClick={() => {
                                                setSelectedSubmission(item)
                                                document.getElementById("submission_modal").showModal();
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Modal */}
            <dialog id="submission_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    {selectedSubmission && (
                        <>
                            <h3 className="font-bold text-xl mb-2">
                                {selectedSubmission.contestName}
                            </h3>

                            <p className="text-sm text-gray-500 mb-4">
                                Submitted by: <span className="font-semibold">
                                    {selectedSubmission.userName}
                                </span>
                            </p>

                            <div className="mb-4">
                                <h4 className="font-semibold mb-1">Submission</h4>
                                <p className="whitespace-pre-line bg-base-200 p-3 rounded">
                                    {selectedSubmission.submission}
                                </p>
                            </div>

                            <p className="text-sm text-gray-500">
                                Submitted on:{" "}
                                {new Date(selectedSubmission.submittedAt).toLocaleString()}
                            </p>
                        </>
                    )}
                    <div className="flex gap-4 items-center justify-center">
                        <div className="">
                            <form method="dialog">
                                <button
                                    disabled={selectedSubmission?.status === 'winner'}
                                    onClick={() => handleDeclareWinner(selectedSubmission)}
                                    className={`btn modal-action ${selectedSubmission?.status !== 'winner' ? "btn-success" : "btn-disabled"
                                        }`}
                                >
                                    Declare Winner
                                </button>
                            </form>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default Submissions;
