import { useState } from 'react';
import { Link, useNavigate, useLocation, Form } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import GoogleLogin from '../components/GoogleLogin';
import toast from 'react-hot-toast';
import FormSkeleton from '../components/skeleton/FormSkeleton';
import useAuth from '../hooks/useAuth';
import Lottie from 'lottie-react';
import registerLottie from '../assets/animation/register.json'
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, loading, errorMessage, setErrorMessage } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const handleLogin = data => {
        try {
            toast.promise(
                async () => {
                    await signInUser(data.email, data.password)
                    await navigate(`${location.state ? location.state : '/'}`)
                },
                {
                    loading: 'Logging in',
                    success: 'Logged in Successfully',
                    error: 'Login failed',
                }
            )
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleGoogleLogin = () => {
        signInUser('', '', true).then(() => {
            toast.success('Logged in with Google Successfully')
            navigate(`${location.state ? location.state : '/'}`)
        })
            .catch((error) => {
                toast.error('Google Login failed!')
                setErrorMessage(error.message)
            })
    }
    return (
        loading ? <FormSkeleton />
            : (
                <div className='flex flex-col md:flex-row items-center w-11/12 md:w-7/12 mx-auto justify-between'>
                    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                        <h1 className="text-5xl font-bold title-font text-center">Login</h1>
                        <GoogleLogin onClickAction={handleGoogleLogin}></GoogleLogin>
                        <p>Or,</p>
                        <form onSubmit={handleSubmit(handleLogin)} className='bg-base-200 p-5 rounded-2xl w-full'>
                            <fieldset className='flex flex-col gap-1'>

                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="input w-full rounded-lg border-0"
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input w-full pr-12 rounded-lg border-0"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required"
                                        })}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10"> {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </fieldset>
                            <button type='submit' className="btn btn-neutral text-white bg-none w-full mt-3 rounded-lg shadow-none">Login</button>
                            <p className='text-red-400'>{errorMessage ? errorMessage : ''}</p>
                            <p>Don't have an account? <Link className='font-bold' to='/register'>Register</Link></p>
                        </form>
                    </div>
                    <div className='md:w-3/5'>
                        <Lottie animationData={registerLottie} loop={false} />
                    </div>
                </div>
            )
    );
};

export default Login;