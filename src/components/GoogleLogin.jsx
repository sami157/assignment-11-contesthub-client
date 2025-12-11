import React from 'react'
import googleLogo from '../assets/googleLogo.png'
import { Link } from 'react-router'

const GoogleLogin = ({ onClickAction }) => {
    return (
        <Link onClick={onClickAction} className='flex mx-auto justify-center gap-2 bg-base-400/50 max-h-10 px-5 py-2 rounded-full items-center hover:scale-110 ease-out duration-200 backdrop-blur-2xl'>
            <img className='w-5 h-5' src={googleLogo} alt="" />
            <p className='font-semibold'>Continue with Google</p>
        </Link>
    )
}

export default GoogleLogin