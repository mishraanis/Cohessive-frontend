import teamTreeLogo from "../Assets/teamTreeLogo.png";
import home from "../Assets/home.png";
import employeeDetails from "../Assets/employeeDetails.png";
import logout from "../Assets/logout.png";
import employeeIdPlaceholderIcon from "../Assets/employeeIdPlaceholderIcon.png";
import phonePlaceholderIcon from "../Assets/phonePlaceholderIcon.png";
import emailPlaceholderIcon from "../Assets/emailPlaceholderIcon.png";
import {useContext, useState} from "react";
import {CreateNewChartContext} from "../Pages/NUXDashboard";
import backIcon from "../Assets/backIcon.png";
import StyledInput from "./StyledInput";

export default function AddEmployeeExtended(props) {
    const createNewChartRef = useContext(CreateNewChartContext);

    return(
        <div className='relative flex flex-col w-full items-center '>
            <div className='w-full flex flex-col items-start px-4 justify-evenly border-b-2 border-[#E5E7EB] pt-5 pb-2'>
                <button className='w-[1.5rem] h-[1.5rem] flex justify-center items-center' onClick={() => createNewChartRef.current.style.display = 'none'}>
                    <img src={backIcon} className='w-full' alt='back'/>
                </button>
                <p className='font-InB text-[#1F2A37] text-lg mb-2 mt-4'>[Employee Name]</p>
            </div>
            <div className='pt-2 pb-4 border-b-2 border-[#E5E7EB] flex flex-col w-full px-4 items-start justify-evenly'>
                <p className='font-InB text-[#1F2A37] text-base mb-5'>Personal Details</p>
                <div className='w-full flex items-center justify-between'>
                    <StyledInput  starStyle={{display:"none"}} style={{width:"48.5%"}} label='First Name' placeholder='Eg: Talha' icon={null} />
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Last Name' placeholder='Eg: Anjum' icon={null} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Employee ID' placeholder='Eg: AB34C56' icon={employeeIdPlaceholderIcon} />
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Phone Number' placeholder='10 digit phone number' icon={phonePlaceholderIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput type='email' starStyle={{display:"none"}} style={{width:"48.5%"}} label='Work Email' placeholder='name@example.com' icon={emailPlaceholderIcon} />
                    <StyledInput type='email' starStyle={{display:"none"}} style={{width:"48.5%"}} label='Personal Email' placeholder='name@example.com' icon={emailPlaceholderIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Gender' placeholder='Select Gender' icon={null} />
                    <StyledInput type='date' starStyle={{display:"none"}} style={{width:"48.5%",}} label='Last Name' placeholder='Eg: Anjum' icon={null} />
                </div>
            </div>
            <div className='pt-4 pb-1.5 flex flex-col w-full px-4 items-start justify-evenly'>
                <p className='font-InB text-[#1F2A37] text-base mb-5'>Work Details</p>
                <div className='w-full flex items-center justify-between'>
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Type' placeholder='Eg: Fulltime' icon={null} />
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Designation' placeholder='Employee Designation' icon={null} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Department' placeholder='Eg: IT' icon={employeeIdPlaceholderIcon} />
                    <StyledInput starStyle={{display:"none"}} style={{width:"48.5%"}} label='Sub Department' placeholder='Eg: ' icon={phonePlaceholderIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput type='email' starStyle={{display:"none"}} style={{width:"48.5%"}} label='Department Head(Email ID)' placeholder='name@example.com' icon={emailPlaceholderIcon} />
                    <StyledInput type='email' starStyle={{display:"none"}} style={{width:"48.5%"}} label='Reporting Manager' placeholder='Manager Name' icon={null} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput type='date' starStyle={{display:"none"}} style={{width:"48.5%"}} label='Date of joining' placeholder='MM/DD/YYYY' icon={null} />
                </div>
            </div>
        </div>
    )
}