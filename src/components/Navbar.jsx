import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'
import useRole from '../hooks/useRole'

export default function Navbar() {
    const {user, signOutUser} = useAuth()
    const roleInfo = useRole()
    const navigate = useNavigate()
    const handleClick = async() => {
        try {
            toast.promise(
                async () => {
                    await signOutUser()
                    await navigate('/')
                },
                {
                    loading: 'Logging out',
                    success: 'Logged out Successfully',
                    error: 'Logout failed',
                }
            )
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='flex gap-2 items-center justify-between bg-base-300 px-[1vw] py-[0.1vw] rounded-full'>
            <Link to='/' className='flex items-center'>
                <img className='w-40 -mx-8' src={logo}></img>
                <div>
                    <p className='text-[30px] -mb-3'>Contest</p>
                    <div className=' text-[30px] font-extrabold'>Hub</div>
                </div>
            </Link>
            <div className='flex items-center gap-6 text-[16px] font-bold'>
                <NavLink className='hover:bg-white/40 rounded-xl px-3 py-2' to='/'>Home</NavLink>
                <NavLink className='hover:bg-white/40 rounded-xl px-3 py-2' to='/all-contets'>All Contests</NavLink>
                <NavLink className='hover:bg-white/40 rounded-xl px-3 py-2' to='/extra'>Extra</NavLink>
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 bg-white/0 border-0">
                            <img className='w-13 h-13 object-cover rounded-full' src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/1/1247.png' } alt="" />
                        </div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-200 rounded-xl z-1 w-52 shadow-sm">
                            <li className='px-3 py-2'>{user.displayName}</li>
                            {
                                user && roleInfo.role === 'creator' &&
                                    <li><a onClick={() => { navigate('/add-contest') }}>Add Contest</a></li>
                            }
                            {
                                user && roleInfo.role === 'creator' &&
                                    <li><a onClick={() => { navigate('/contests-created') }}>My Created Contests</a></li>
                            }
                            {
                                user && roleInfo.role === 'user' &&
                                    <li><a onClick={() => { navigate('/contests-participated') }}>My Participated Contests</a></li>
                            }
                            {
                                user && roleInfo.role === 'admin' &&
                                    <li><a onClick={() => { navigate('/dashboard') }}>Dashboard</a></li>
                            }
                            <li><a onClick={handleClick}>Logout</a></li>
                        </ul>
                    </div> : <NavLink className='hover:bg-white/40 rounded-lg px-3 py-2' to='/login'>Login</NavLink>
                }
            </div>
        </div>
    )
}
