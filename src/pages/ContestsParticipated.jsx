import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const ContestsParticipated = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data = [], isLoading, isError } = useQuery({
        queryKey: ["my-participated-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/registrations/my-contests");
            console.log(res.data);
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center mt-10">Loading your contests...</p>;
    }

    if (isError) {
        return (
            <p className="text-center mt-10 text-error">
                Failed to load participated contests
            </p>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center min-h-screen mt-16">
                <h2 className="text-xl font-semibold mb-2">
                    No participated contests found
                </h2>
                <p className="text-gray-500">
                    Once you register for a contest, it will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl min-h-screen mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">
                My Participated Contests
            </h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Contest</th>
                            <th className="text-center">Deadline</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Payment</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
                            const contest = item;
                            const isEnded =
                                new Date(contest.deadline) < new Date();

                            return (
                                <tr key={item._id}>
                                    <td className="text-center">{index + 1}</td>

                                    <td className="font-semibold">
                                        {contest.contestName}
                                    </td>

                                    <td className="text-center">
                                        {new Date(
                                            contest.deadline
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="text-center">${contest.price}</td>

                                    <td className="text-center">
                                        <span className="badge badge-success">
                                            Paid
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        {isEnded ? (
                                            <span className="badge badge-error">
                                                Ended
                                            </span>
                                        ) : (
                                            <span className="badge badge-primary">
                                                Upcoming
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-center rounded-lg cursor-pointer">
                                        <div className="flex justify-center">
                                            <FaEye onClick={() => {
                                                navigate(`/details/${contest._id}`)
                                            }
                                            }>
                                            </FaEye>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestsParticipated;
