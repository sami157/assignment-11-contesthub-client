import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import welcome from '../assets/animation/welcome.json'
import Lottie from 'lottie-react'

const Welcome = () => {
    return (
        <div className='w-3/5 space-y-4 mx-auto p-2 text-center'>
            <p className='text-4xl font-semibold'>Welcome to ContestHub!</p>
            <Lottie
            className='mask-b-from-70% mask-b-to-90% mask-t-from-70% mask-t-to-90%'
            animationData={welcome} loop={false} />
        </div>
    )
}

export default Welcome
