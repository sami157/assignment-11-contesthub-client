import React from 'react';
import loading from '../assets/animation/loading.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div>
            <Lottie animationData={loading} loop={false} />
        </div>
    );
};

export default Loading;