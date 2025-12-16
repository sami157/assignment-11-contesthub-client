import React from 'react';
import { useNavigate } from 'react-router';

const ContestCard = ({ contest }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/details/${contest._id}`)} className="bg-base-200 p-3 rounded-2xl hover:scale-105 duration-250 ease-in-out flex flex-col h-full">
            <img
                src={contest.image}
                alt={contest.name}
                className="h-48 w-full rounded-lg object-cover"
            />
            <div className="flex flex-col gap-2 flex-1 mt-3">
                <h2 className="card-title">{contest.name}</h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {contest.description}
                </p>

                <div className='mt-auto flex flex-col gap-3'>
                    <div className="flex justify-between text-sm mt-2">
                        <span>Price: ${contest.price}</span>
                        <span>Prize: ${contest.prizeMoney}</span>
                    </div>

                    <div>
                        <span className="badge badge-outline capitalize">
                            {contest.status}
                        </span>
                    </div>
                    <div>
                        <button className="w-full bg-white px-4 py-2 rounded-lg drop-shadow-sm font-bold text-primary">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;
