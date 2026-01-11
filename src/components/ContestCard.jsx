import React from 'react';
import { useNavigate } from 'react-router';
import { BiSolidTrophy } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { BsArrowUpRightCircleFill } from "react-icons/bs";


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
                <h2 className="card-title text-2xl">{contest.name}</h2>
                <div className='text-sm'>
                    <span className='font-semibold'>Deadline: </span>{contest.deadline.slice(0, 10)}
                </div>
                <p className="text-sm text-base-content line-clamp-2">
                    {contest.description}
                </p>

                <div className=''>
                    <div className="flex items-center justify-between text-sm mt-2">
                        <div className='flex gap-3 bg-base-300 px-4 py-1.5 rounded-lg items-center'>
                            <span>Fee: ${contest.price}</span>
                            <div className='flex items-center'>
                                <BiSolidTrophy className='text-xl' />
                                <span className=''>${contest.prizeMoney}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <IoIosPeople className='text-2xl' />
                                <span>
                                    {contest.participantCount}
                                </span>
                            </div>
                        </div>
                        <div>
                            <button className="bg-base-100 flex gap-1 items-center px-4 py-2 rounded-lg drop-shadow-sm font-bold text-primary active:scale-80 transition">
                                <span><BsArrowUpRightCircleFill className='text-xl' /></span>Details
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContestCard;
