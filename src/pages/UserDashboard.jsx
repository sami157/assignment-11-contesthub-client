import React, { useState } from "react";
import WinningContests from "../components/WinningContests";
import UserProfile from "../components/UserProfile";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("winning");

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold mb-6">User Dashboard</h1>

            <div className="tabs tabs-boxed mb-6">
                <button
                    className={`tab ${activeTab === "winning" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("winning")}
                >
                    My Winning Contests
                </button>
                <button
                    className={`tab ${activeTab === "profile" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                >
                    My Profile
                </button>
            </div>

            <div>
                {activeTab === "winning" && <WinningContests />}
                {activeTab === "profile" && <UserProfile />}
            </div>
        </div>
    );
};

export default UserDashboard;
