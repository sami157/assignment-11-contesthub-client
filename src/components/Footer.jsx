import logo from '../assets/logo.png'
import { FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import welcome from '../assets/animation/welcome.json'
import Lottie from 'lottie-react';

const Footer = () => {
    return (
        <footer className="bg-base-300 rounded-2xl">
            <div className="container flex flex-col gap-5 items-center mx-auto py-5 text-center">
                <div className='flex justify-between gap-10'>
                    <div className='space-y-8'>
                        <div className='bg-base-200 rounded-xl p-5'>
                            <h2 className="text-3xl">Contest<span className="font-bold ">Hub</span> </h2>
                            <p className="text-sm opacity-70">
                                Empowering creativity through contests.
                            </p>
                        </div>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://linkedin.com/tanzir-ahmed-sami"
                                className="text-xl hover:text-primary transition"
                            >
                                <FaLinkedin className='text-4xl' />
                            </a>
                            <a
                                href="https://github.com/sami157"
                                className="text-xl hover:text-primary transition"
                            >
                                <FaGithub className='text-4xl' />
                            </a>
                            <a
                                href="https://facebook.com/tanzirahmeds1"
                                className="text-xl hover:text-primary transition"
                            >
                                <FaSquareFacebook className='text-4xl' />
                            </a>
                        </div>
                    </div>
                    <Lottie
                        className='mask-b-from-70% w-80 mask-b-to-90% mask-t-from-70% mask-t-to-90%'
                        animationData={welcome} loop={true} />
                </div>
                <div className="bg-base-200 rounded-full w-full py-2 text-sm opacity-70">
                    © 2025 ContestHub — All Rights Reserved
                </div>

            </div>
        </footer>
    );
};

export default Footer;
