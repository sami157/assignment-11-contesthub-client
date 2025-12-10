import React from 'react';

const FormSkeleton = () => {
    return (
        <div className='flex min-h-screen items-center justify-center p-20'>
            <div className="flex w-52 flex-col gap-4">
                <div className="skeleton h-2 w-1/3"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-2 w-1/3"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-2 w-1/3"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-2 w-1/3"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-2 w-1/3"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-2 w-1/3"></div>
                <div className="skeleton h-6 w-full"></div>
            </div>
        </div>
    );
};

export default FormSkeleton;