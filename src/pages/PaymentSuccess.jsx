import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            toast.error("Invalid payment session");
            navigate("/");
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await axiosSecure.get(
                    `/payments/success?id=${sessionId}`
                );

                toast.success(res.data.message || "Payment successful");
            } catch {
                toast.error("Payment verification failed");
                navigate("/");
            }
        };

        verifyPayment();
    }, [searchParams, axiosSecure, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-success mb-2">
                Payment Successful 🎉
            </h2>
            <p className="text-gray-600">
                Registering you to the contest...
            </p>
        </div>
    );
};

export default PaymentSuccess;