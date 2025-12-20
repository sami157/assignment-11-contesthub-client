import React, { useEffect } from "react";
import { useSearchParams, useNavigate, NavLink } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import paymentSuccess from '../assets/animation/payment-success.json'
import Lottie from "lottie-react";

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
        <div className="flex flex-col items-center justify-start">
            <Lottie className="scale-100" animationData={paymentSuccess} loop={false} />
            <NavLink to='/' className='bg-primary font-bold px-4 py-2 text-primary-content rounded-full'>Go Home</NavLink>
        </div>
    );
};

export default PaymentSuccess;