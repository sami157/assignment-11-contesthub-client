import usePlatformStats from "../hooks/usePlatformStats";

const PlatformStats = () => {
    const { data, isLoading } = usePlatformStats();

    if (isLoading) {
        return (
            <div className="py-16 text-center">
                Loading platform stats...
            </div>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Platform Impact
                </h2>

                <p className="text-gray-600 mb-12">
                    Trusted by creators. Proven by rewards.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-50 p-8 rounded-xl shadow">
                        <h3 className="text-3xl font-bold text-indigo-600">
                            {data?.totalWinners}
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Winners Rewarded
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow">
                        <h3 className="text-3xl font-bold text-green-600">
                            ${data?.totalPrizeMoney}
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Prize Money Distributed
                        </p>
                    </div>
                </div>

                <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition">
                    Become the Next Winner 🚀
                </button>
            </div>
        </section>
    );
};

export default PlatformStats;