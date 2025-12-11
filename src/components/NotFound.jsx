import Lottie from 'lottie-react';
import React from 'react';
import error from '../assets/animation/404error.json'
import { NavLink } from 'react-router';

const NotFound = () => {
    return (
        <div className='mt-10 w-11/12 items-center flex flex-col md:w-7/10 mx-auto'>
            <Lottie animationData={error} loop={false} />
            <NavLink to='/' className='bg-primary font-bold px-4 py-2 text-primary-content rounded-full'>Go Home</NavLink>
        </div>
    );
};

export default NotFound;