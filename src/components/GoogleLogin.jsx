import React from 'react'
import googleLogo from '../assets/googleLogo.png'

const GoogleLogin = ({ onClickAction }) => {
    return (
        <div onClick={onClickAction} className='flex mx-auto justify-center gap-2 bg-base-400/50 max-h-10 px-5 py-2 rounded-full items-center hover:scale-110 ease-in-out duration-500 backdrop-blur-2xl'>
            <img className='w-5 h-5' src={googleLogo} alt="" />
            <p className='font-semibold'>Continue with Google</p>
        </div>
    )
}

export default GoogleLogin