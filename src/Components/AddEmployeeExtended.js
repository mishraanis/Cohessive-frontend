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
import employeeNameIcon from "../Assets/employeeNameIcon.png";
import axios from "axios";

export default function AddEmployeeExtended({setTreeData, setOpen, employeeId, setClickedEmployee, newEmployee, setNewEmployee}) {
    const addEmployee = () => {
        console.log(newEmployee, ' is the new employee')

        axios.post(process.env.REACT_APP_BACKEND_URL + '/chart/organizations/users/', newEmployee, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(r1 => {
            console.log(r1, ' is the response')
            axios.get(process.env.REACT_APP_BACKEND_URL + '/chart/organizations/getEmployees/'+'1', {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(r => {
                console.log(r.data);
                setTreeData(r.data[0]);
                // addEmployeeRef.current.classList.add('hidden');
                setOpen(false);
            }).catch(e1 => {
                console.log(e1);
            })
        }).catch(e => {
            console.log(e, ' is the error')
        })
    }
    return(
        <div className='relative flex flex-col w-full items-center'>
            <div className='w-full flex flex-col items-start px-4 justify-evenly border-b-2 border-[#E5E7EB] pt-5 pb-0'>
                <button className='w-[1.5rem] h-[1.5rem] flex justify-center items-center' onClick={() => {
                    setOpen(false);
                }}>
                    <img src={backIcon} className='w-full' alt='back'/>
                </button>
                <p className='font-InB text-[#1F2A37] text-lg mb-2 mt-4'>{newEmployee.first_name + " " + newEmployee.last_name}</p>
            </div>
            <div className='pt-2 pb-4 border-b-2 border-[#E5E7EB] flex flex-col w-full px-4 items-start justify-evenly'>
                <p className='font-InB text-[#1F2A37] text-base mb-5'>Personal Details</p>
                <div className='w-full flex items-center justify-between'>
                    <StyledInput isRequired={true} type='text' fieldValue={"first_name"} value={newEmployee.first_name} employee={newEmployee} setValue={setNewEmployee} placeholder='First Name' label='First Name' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"last_name"} value={newEmployee.last_name} employee={newEmployee} setValue={setNewEmployee} placeholder='Last Name' label='Last Name' icon={employeeNameIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput isRequired={true} type='text' fieldValue={"designation"} value={newEmployee.designation} employee={newEmployee} setValue={setNewEmployee} placeholder='Designation' label='Designation' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"type"} value={newEmployee.type} employee={newEmployee} setValue={setNewEmployee} placeholder='Full Time/Part Time' label='Type' icon={employeeNameIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput isRequired={true} type='text' fieldValue={"department"} value={newEmployee.department} employee={newEmployee} setValue={setNewEmployee} placeholder='Department' label='Department' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"subDepartment"} value={newEmployee.subDepartment} employee={newEmployee} setValue={setNewEmployee} placeholder='Sub-Department' label='Sub-Department' icon={employeeNameIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput isRequired={true} type='text' fieldValue={"reporting_manager"} value={newEmployee.reporting_manager} employee={newEmployee} setValue={setNewEmployee} placeholder='Reporting Manager' label='Reporting Manager' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"department_head"} value={newEmployee.department_head} employee={newEmployee} setValue={setNewEmployee} placeholder='Department Head' label='Department Head' icon={employeeNameIcon} />
                </div>
            </div>
            <div className='pt-4 pb-1.5 flex flex-col w-full px-4 items-start justify-evenly'>
                <p className='font-InB text-[#1F2A37] text-base mb-5'>Work Details</p>
                <div className='w-full flex items-center justify-between'>
                    <StyledInput isRequired={true} type='date' fieldValue={"date_of_joining"} value={newEmployee.date_of_joining} employee={newEmployee} setValue={setNewEmployee} placeholder='DD/MM/YYYY' label='Date of Joining' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='email' fieldValue={"office_email"} value={newEmployee.office_email} employee={newEmployee} setValue={setNewEmployee} placeholder='abc@def.com' label='Office Email' icon={employeeNameIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput isRequired={true} type='email' fieldValue={"personal_email"} value={newEmployee.personal_email} employee={newEmployee} setValue={setNewEmployee} placeholder='abc@def.com' label='Personal Email' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"phone"} value={newEmployee.phone} employee={newEmployee} setValue={setNewEmployee} placeholder='1234567890' label='Phone Number' icon={employeeNameIcon} />
                </div>
                <div className='w-full mt-4 flex items-center justify-between'>
                    <StyledInput isRequired={true} type='text' fieldValue={"gender"} value={newEmployee.gender} employee={newEmployee} setValue={setNewEmployee} placeholder='Male or Female' label='Gender' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='date' fieldValue={"date_of_birth"} value={newEmployee.date_of_birth} employee={newEmployee} setValue={setNewEmployee} placeholder='DD/MM/YYYY' label='Date of Birth' icon={employeeNameIcon} />
                </div>
                <button type='submit' className='w-[7.5rem] h-[2.5rem] bg-[#7E3AF2] rounded-lg flex justify-center items-center' onClick={() => {
                    addEmployee(newEmployee)
                }}>
                    <p className='font-InM text-white text-sm mb-0'>Save</p>
                </button>
            </div>
        </div>
    )
}