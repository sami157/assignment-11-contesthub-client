import Lottie from 'lottie-react';
import forbidden from '../../assets/animation/forbidden.json';
import { NavLink } from 'react-router';

const Forbidden = () => {
    return (
        <div className='mt-10 w-11/12 items-center flex gap-4 flex-col md:w-7/10 mx-auto'>
            <Lottie animationData={forbidden} loop={false} />
            <p className='font-extrabold text-3xl'>You are not authorized to access this content</p>
            <NavLink to='/' className='bg-primary font-bold px-4 py-2 text-primary-content rounded-full'>Go Home</NavLink>
        </div>
    );
};

export default Forbidden;