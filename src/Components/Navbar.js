import logo from '../Assets/cohesiveLogo.png';
import {useState} from "react";
import {useLocation} from "react-router-dom";
import profileImage from '../Assets/profileImage.png';
import menuDots from '../Assets/menuDots.png';
import requests from '../Assets/requests.png';
import invite from '../Assets/invite.png';
export default function NavBar() {
    const currentPage = useLocation().pathname.split('/')[1];
    // console.log(location.pathname.split("/")[1])

    return (
        <div className='w-full z-10 flex justify-center pt-5'>
            <div className='flex w-[96.5%] items-center justify-between'>
                <div className='w-[11.5%]'>
                    <img src={logo} className='w-[100%] min-w-[7rem]'/>
                </div>
                <div className='flex w-auto justify-evenly items-center min-w-fit'>
                    <div className='rounded-lg flex justify-center border-[#E4E7E6] border-[1.75px] py-1 px-4 mr-3'>
                        <img src={requests} className='w-[1.35rem]'/>
                        <p className='text-[#03170E] font-InM text-sm pl-1 '>3 requests</p>
                    </div>
                    <div className='rounded-lg flex justify-center border-[#E4E7E6] border-[1.75px] py-1 px-4 mr-3'>
                        <img src={invite} className='w-[1.35rem]'/>
                        <p className='text-[#03170E] font-InM text-sm pl-1 '>Invite</p>
                    </div>
                    <div className='rounded-lg border-[#E4E7E6] border-[1.75px] py-1 px-1 mr-3'>
                        <img src={menuDots} className='w-[1.35rem]'/>
                    </div>
                    <div className='rounded-2xl '>
                        <img src={profileImage} className='w-[2rem] h-[2rem] rounded-full'/>
                    </div>
                </div>
            </div>
        </div>
    )
}