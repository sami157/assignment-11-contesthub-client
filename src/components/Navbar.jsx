import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
// import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'
import useRole from '../hooks/useRole'
import ThemeToggle from './ThemeToggle'
import Lottie from 'lottie-react'
import welcome from '../assets/animation/welcome.json'

export default function Navbar() {
    const { user, signOutUser } = useAuth()
    const roleInfo = useRole()
    const navigate = useNavigate()

    const handleClick = async () => {
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
        <div className="fixed top-3 left-6 right-6 z-50 bg-base-300/80 backdrop-blur-2xl px-3 py-2 rounded-full">
            <div className="flex items-center justify-between">

                {/* Logo */}
                <Link viewTransition to="/" className="flex items-center">
                    {/* <img className="w-28 sm:w-36 md:w-40 -mx-4 sm:-mx-6" src={logo} /> */}
                    <Lottie
                        className='w-25 mx-2 sm:mx-2'
                        animationData={welcome} loop={true} />
                    <div className="hidden sm:block">
                        <p className="text-xl md:text-2xl -mb-1">Contest</p>
                        <p className="text-xl md:text-2xl font-extrabold">Hub</p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 text-[16px] font-bold">
                    <ThemeToggle />

                    <NavLink viewTransition className="hover:bg-white/40 rounded-xl px-3 py-2" to="/">Home</NavLink>
                    <NavLink viewTransition className="hover:bg-white/40 rounded-xl px-3 py-2" to="/all-contests">All Contests</NavLink>
                    <NavLink viewTransition className="hover:bg-white/40 rounded-xl px-3 py-2" to="/leaderboard">Leaderboard</NavLink>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn bg-white py-8 rounded-full border-0">
                                <img
                                    className="w-12 h-12 rounded-full"
                                    src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/1/1247.png'}
                                />
                            </div>

                            <ul className="dropdown-content menu bg-base-200 rounded-xl z-10 w-52 shadow-sm">
                                <li className="px-3 py-2">{user.displayName}</li>

                                {!roleInfo.roleLoading && roleInfo.role === 'creator' && (
                                    <>
                                        <li><NavLink viewTransition to="/add-contest">Add Contest</NavLink></li>
                                        <li><NavLink viewTransition to="/contests-created">My Created Contests</NavLink></li>
                                    </>
                                )}

                                {!roleInfo.roleLoading && roleInfo.role === 'user' && (
                                    <>
                                        <li><NavLink viewTransition to="/contests-participated">My Participated Contests</NavLink></li>
                                        <li><NavLink viewTransition to="/dashboard-user">Dashboard</NavLink></li>
                                    </>
                                )}

                                {!roleInfo.roleLoading && roleInfo.role === 'admin' && (
                                    <li><NavLink viewTransition to="/dashboard">Dashboard</NavLink></li>
                                )}

                                <li><button onClick={handleClick}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <NavLink viewTransition className="hover:bg-white/40 rounded-lg px-3 py-2" to="/login">Login</NavLink>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden flex items-center gap-2">
                    <ThemeToggle />

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>

                        <ul className="menu dropdown-content bg-base-200 rounded-xl w-52 shadow z-10">
                            <li><NavLink viewTransition to="/">Home</NavLink></li>
                            <li><NavLink viewTransition to="/all-contests">All Contests</NavLink></li>
                            <li><NavLink viewTransition to="/leaderboard">Leaderboard</NavLink></li>

                            {user ? (
                                <>
                                    {!roleInfo.roleLoading && roleInfo.role === 'creator' && (
                                        <>
                                            <li><NavLink viewTransition to="/add-contest">Add Contest</NavLink></li>
                                            <li><NavLink viewTransition to="/contests-created">My Created Contests</NavLink></li>
                                        </>
                                    )}

                                    {!roleInfo.roleLoading && roleInfo.role === 'user' && (
                                        <>
                                            <li><NavLink viewTransition to="/contests-participated">My Participated Contests</NavLink></li>
                                            <li><NavLink viewTransition to="/dashboard-user">Dashboard</NavLink></li>
                                        </>
                                    )}

                                    {!roleInfo.roleLoading && roleInfo.role === 'admin' && (
                                        <li><NavLink viewTransition to="/dashboard">Dashboard</NavLink></li>
                                    )}

                                    <li><button onClick={handleClick}>Logout</button></li>
                                </>
                            ) : (
                                <li><NavLink viewTransition to="/login">Login</NavLink></li>
                            )}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}