import useWinners from "../hooks/useWinners";

const Winners = () => {
    const { data: winners = [], isLoading } = useWinners();

    if (isLoading) {
        return <p className="text-center py-10">Loading winners...</p>;
    }

    return (
        <section className="py-20 bg-gray-50" data-aos="fade-right">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">
                    🎉 Our Champions
                </h2>

                <p className="text-gray-600 mb-12">
                    Real people. Real talent. Real rewards.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {winners.map((winner, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <img
                                src={winner.winnerImage}
                                alt={winner.winnerName}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />

                            <h3 className="font-semibold text-lg">
                                {winner.winnerName}
                            </h3>

                            <p className="text-sm text-gray-500 mb-2">
                                Winner of {winner.contestName}
                            </p>

                            <p className="text-green-600 font-bold text-xl">
                                ${winner.prizeMoney}
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                                Awarded on{" "}
                                {new Date(winner.declaredAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Winners;