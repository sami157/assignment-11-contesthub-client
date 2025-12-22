import React, { useEffect } from 'react'
import PopularContests from '../components/PopularContests'
import BannerSearch from '../components/BannerSearch'
import Winners from '../components/Winners'
import PlatformStats from '../components/PlatformStats'
import Aos from 'aos'
import 'aos/dist/aos.css';

export default function Home() {
    useEffect(() => {
        Aos.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className='flex flex-col gap-4'>
            <BannerSearch/>
            <PopularContests/>
            <Winners/>
            <PlatformStats/>
        </div>
    )
}
