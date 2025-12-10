import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import GoogleLogin from '../components/GoogleLogin';
import toast from 'react-hot-toast';
import FormSkeleton from '../components/skeleton/FormSkeleton';
import useAuth from '../hooks/useAuth';
//import { useForm } from 'react-hook-form';

const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { signInUser, createUser, loading, errorMessage, setErrorMessage, updateUserProfile } = useAuth()
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const handleSignUp = (event) => {
        const form = event.target
        event.preventDefault()
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordRegex.test(form.password.value)) {
            setInvalidPassword(true)
            return;
        }
        else {
            setInvalidPassword(false)
            createUser(form.email.value, form.password.value)
                .then(() => {
                    updateUserProfile(form.name.value, form.photoUrl.value)
                    toast.success('Registered successfully')
                    form.reset()
                    navigate(`${location.state ? location.state : '/'}`)
                })
                .catch((error) => {
                    toast.error('Registration failed!')
                    setErrorMessage(error.message)
                })
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
                <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                    <h1 className="text-5xl font-bold title-font text-center">Register Now!</h1>
                    <GoogleLogin onClickAction={handleGoogleLogin}></GoogleLogin>
                    <p className='title-font'>Or,</p>
                    <div className="flex flex-col bg-base-200 glass w-[92vw] md:w-[400px] p-8 rounded-xl">
                        <form onSubmit={handleSignUp} className="fieldset">
                            <label className="label">Name</label>
                            <input name='name' type='text' required className="input w-full border-0 rounded-lg" placeholder="" />
                            <label className="label">Photo URL</label>
                            <input name='photoUrl' type='text' className="input w-full border-0 rounded-lg" placeholder="" />
                            <label className="label">Email</label>
                            <input name='email' type="email" required className="input w-full rounded-lg border-0" placeholder="" />
                            <label className="label">Password</label>
                            <div className="relative">
                                <input name='password' type={showPassword ? "text" : "password"} required className="input w-full pr-12 rounded-lg border-0" placeholder="" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {invalidPassword && <div><p className="text-red-500">Password must be at least 6 characters containing at least an uppercase and one lowercase character</p></div>}
                            <button type='submit' className="btn btn-neutral text-white bg-none mt-3 rounded-lg shadow-none">Register</button>
                            <p className='text-red-400'>{errorMessage ? errorMessage : ''}</p>
                            <p>Already have an account? <Link className='font-bold' to='/login'>Sign In</Link></p>
                        </form>
                    </div>
                </div>
            )
    );
};

export default Register;