import logo from '../assets/logo.png'
import { FaSquareFacebook, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-base-300 mt-16 rounded-2xl">
            <div className="container flex flex-col gap-5 items-center mx-auto py-5 text-center">
                <img className='w-80' src={logo} alt="" />
                <div className='bg-base-200 rounded-xl p-5'>
                    <h2 className="text-3xl">Contest<span className="font-bold ">Hub</span> </h2>
                    <p className="text-sm opacity-70">
                        Empowering creativity through contests.
                    </p>
                </div>

                <div className="flex justify-center gap-6">
                    <a
                        href="https://facebook.com"
                        className="text-xl hover:text-primary transition"
                    >
                        <FaSquareFacebook className='text-4xl' />
                    </a>

                    <a
                        href="https://x.com"
                        className="text-xl hover:text-primary transition"
                    >
                        <FaXTwitter className='text-4xl' />
                    </a>
                </div>

                <div className="bg-base-200 rounded-full w-full py-2 text-sm opacity-70">
                    © 2025 ContestHub — All Rights Reserved
                </div>

            </div>
        </footer>
    );
};

export default Footer;
