import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "./Loading";

const ContestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [taskLinks, setTaskLinks] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [ended, setEnded] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const handleTaskSubmit = async () => {
        if (!taskLinks.trim()) {
            toast.error("Please enter your submission");
            return;
        }
        try {
            setSubmitLoading(true);
            await axiosSecure.post(`/contests/submit-task/${id}`, {
                submission: taskLinks,
            });
            toast.success("Task submitted successfully");
            setTaskLinks("");
            document.getElementById("submit_task_modal").close();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Submission failed");
        } finally {
            setSubmitLoading(false);
        }
    };

    const { data: registrationStatus, isLoading: regLoading } = useQuery({
        queryKey: ["registration-status", id, user?.email],
        enabled: !!user && !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/registrations/check/${id}`);
            return res.data;
        },
    });

    const { data: contest, isLoading, isError } = useQuery({
        queryKey: ["contest-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (!contest) return;
        const interval = setInterval(() => {
            const deadline = new Date(contest.deadline).getTime();
            const now = Date.now();
            const diff = deadline - now;
            if (diff <= 0) {
                setEnded(true);
                clearInterval(interval);
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [contest]);

    if (isError) return <p className="text-center text-error">Failed to load contest</p>;
    if (isLoading) return <Loading />;
    if (!contest) return null;

    const handleRegister = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        try {
            const res = await axiosSecure.post("/payments/create-payment-session", {
                contestId: contest._id,
                name: contest.name,
                price: contest.price,
            });
            window.location.href = res.data.url;
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 min-h-screen">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{contest.name}</h1>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <span className="badge badge-primary badge-outline">Participants: {contest.participantCount || 0}</span>
                        <span className="badge badge-primary badge-outline">Price: {contest.price}</span>
                    </div>
                </div>
                {!ended ? (
                    <div className="overflow-x-auto">
                        <div className="flex gap-3 sm:gap-5 text-center">
                            {["days","hours","minutes","seconds"].map(unit => (
                                <div key={unit} className="flex font-bold rounded-xl flex-col p-2 bg-neutral text-neutral-content min-w-[70px]">
                                    <span className="countdown font-mono text-3xl sm:text-4xl md:text-5xl">
                                        <span style={{"--value": timeLeft[unit]}}>{timeLeft[unit]}</span>
                                    </span>
                                    {unit}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : <p>The contest has ended</p>}
            </div>
            <img src={contest.image} alt={contest.name} className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-xl" />
            <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Contest Description</h2>
                <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base">{contest.description}</p>
            </div>
            <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Task Instructions</h2>
                <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base">{contest.taskInstruction}</p>
            </div>
            {contest.winner && (
                <div className="border rounded-lg p-4 bg-base-200">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Winner</h2>
                    <span className="font-bold">{contest.winner.name}</span>
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {regLoading ? (
                    <div className="w-full sm:w-auto h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                ) : !registrationStatus?.registered ? (
                    <button
                        disabled={ended}
                        onClick={handleRegister}
                        className="btn btn-primary w-full sm:w-auto relative"
                    >
                        {ended ? "Contest Ended" : "Register / Pay"}
                        {ended && <span className="tooltip tooltip-bottom absolute -bottom-8 left-0 w-max">This contest has already ended</span>}
                    </button>
                ) : null}
                {registrationStatus?.registered && !ended && (
                    <button
                        className="btn btn-success w-full sm:w-auto"
                        onClick={() => document.getElementById("submit_task_modal").showModal()}
                    >
                        Submit Task
                    </button>
                )}
            </div>
            <dialog id="submit_task_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Submit Your Task</h3>
                    <p className="py-2 text-sm text-gray-500">Provide necessary links (GitHub, Drive, live URL, etc.)</p>
                    <textarea
                        className="textarea textarea-bordered w-full min-h-[120px]"
                        placeholder="Paste your submission links here..."
                        value={taskLinks}
                        onChange={(e) => setTaskLinks(e.target.value)}
                    />
                    <div className="modal-action flex flex-col sm:flex-row gap-2">
                        <form method="dialog">
                            <button className="btn btn-ghost w-full sm:w-auto">Cancel</button>
                        </form>
                        <button
                            className="btn btn-primary w-full sm:w-auto"
                            disabled={submitLoading || !taskLinks.trim()}
                            onClick={handleTaskSubmit}
                        >
                            {submitLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ContestDetails;