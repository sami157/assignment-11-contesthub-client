import React from 'react'

export const registerUser = async (axiosSecure, user) => {
    try {
        if (user?.email && user?.name) {
            await axiosSecure.post("/users", {
                name: user.name,
                email: user.email,
            });
        }
    } catch (error) {
        console.error("Failed to send user to server:", error);
    }
};
