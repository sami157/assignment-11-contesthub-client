import React from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../assets/logo.png'

export default function Navbar() {
    return (
        <div className='flex gap-2 items-center justify-between bg-base-300 px-[2vw] py-[1vw] rounded-full'>
            <Link to='/' className='flex items-center'>
                <img className='w-40 -mx-8' src={logo}></img>
                <div>
                    <p className='text-[30px] -mb-3'>Contest</p>
                    <div className=' text-[30px] font-extrabold'>Hub</div>
                </div>
            </Link>
            <div className='flex items-center gap-6 text-[16px] font-bold'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/all-contets'>All Contests</NavLink>
                <NavLink to='/extra'>Extra</NavLink>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Picture</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm">
                        <li><a>User Name</a></li>
                        <li><a>Dashboard</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
