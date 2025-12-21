import { useState } from "react";
import useSearchContests from "../hooks/useSearchContests";
import { useNavigate } from "react-router";

const BannerSearch = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate()

    const { data: contests = [], isLoading } =
        useSearchContests(searchText);

    return (
        <section className="bg-linear-to-r rounded-2xl from-indigo-600 to-purple-700 py-8">
            <div className="max-w-5xl mx-auto px-4 text-center text-white">
                <h1 className="text-5xl font-bold mb-6">
                    Welcome to ContestHub!
                </h1>

                <input
                    type="text"
                    placeholder="Type contest category to search (Image, Design...)"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full max-w-2xl mx-auto p-4 rounded-lg text-black drop-shadow-2xl outline-none bg-base-300/60 backdrop-blur-2xl"
                />

                <div className="mt-10 bg-white rounded-lg text-black shadow-lg">
                    {isLoading && (
                        <p className="p-4 text-center">Loading...</p>
                    )}

                    {!isLoading && contests.length === 0 && searchText && (
                        <p className="p-4 text-center text-gray-500">
                            No contests found
                        </p>
                    )}

                    {contests.map((contest) => (
                        <div
                            key={contest._id}
                            className="p-4 text-left cursor-pointer"
                            onClick={() => navigate(`/details/${contest._id}`)}
                        >
                            <h3 className="font-semibold">{contest?.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSearch;