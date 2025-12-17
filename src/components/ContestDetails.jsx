import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const ContestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [ended, setEnded] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
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


    if (!contest) return;

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


    if (isLoading) return <p className="text-center">Loading contest...</p>;
    if (isError) return <p className="text-center text-error">Failed to load contest</p>;
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 min-h-screen">

            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                    <h1 className="title-font text-4xl font-bold">{contest.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="badge badge-primary badge-outline">
                            Participants: {contest.participantCount || 0}
                        </span>
                        <span className="badge badge-primary badge-outline">
                            Price: {contest?.price}
                        </span>
                    </div>
                </div>
                {
                    !ended &&
                    <div>
                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                            <div className="flex font-bold rounded-xl flex-col p-2 bg-neutral text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                    <span style={{ "--value": timeLeft.days }}>{timeLeft.days}</span>
                                </span>
                                days
                            </div>
                            <div className="flex font-bold rounded-xl flex-col p-2 bg-neutral text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                    <span style={{ "--value": timeLeft.hours }}>{timeLeft.hours}</span>
                                </span>
                                hours
                            </div>
                            <div className="flex font-bold rounded-xl flex-col p-2 bg-neutral text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                    <span style={{ "--value": timeLeft.minutes }}>{timeLeft.minutes}</span>
                                </span>
                                min
                            </div>
                            <div className="flex font-bold rounded-xl flex-col p-2 bg-neutral text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                    <span style={{ "--value": timeLeft.seconds }}>{timeLeft.seconds}</span>
                                </span>
                                sec
                            </div>
                        </div>
                    </div>
                }
            </div>

            <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-72 object-cover rounded-xl"
            />

            <div>
                <h2 className="text-xl font-semibold mb-2">Contest Description</h2>
                <p className="text-gray-600 whitespace-pre-line">
                    {contest.description}
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Task Instructions</h2>
                <p className="text-gray-600 whitespace-pre-line">
                    {contest.taskInstruction}
                </p>
            </div>

            {contest.winner && (
                <div className="border rounded-lg p-4 bg-base-200">
                    <h2 className="text-xl font-semibold mb-2">Winner</h2>
                    <div className="flex items-center gap-4">
                        <img
                            src={contest.winner.photo}
                            alt={contest.winner.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <span className="font-bold">{contest.winner.name}</span>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                <button
                    disabled={ended}
                    onClick={handleRegister}
                    className="btn btn-primary"
                >
                    Register / Pay
                </button>
            </div>
        </div>
    );
};

export default ContestDetails;
