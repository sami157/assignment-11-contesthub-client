import useLeaderboard from "../hooks/useLeaderboard";

const Leaderboard = () => {
    const { data: leaderboard = [], isLoading } = useLeaderboard();

    if (isLoading) {
        return <div className="py-16 text-center">Loading leaderboard...</div>;
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-10">
                    Leaderboard
                </h1>

                <div className="bg-white rounded-xl overflow-hidden">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="py-3 px-4">Rank</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="text-center py-3 px-4">Wins</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.map((user, index) => (
                                <tr key={user.userEmail} className="border-t">
                                    <td className="py-3 px-4 font-semibold">
                                        #{index + 1}
                                    </td>

                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <span>{user.userName}</span>
                                    </td>

                                    <td className="py-3 px-4 text-center font-bold">
                                        {user.wins}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;