import cross from '../Assets/cross.png'
import rightArrowWhite from '../Assets/rightArrowWhite.png'
import uploadCSV from '../Assets/uploadCSV.png'
import download from '../Assets/download.png'
import titlePlaceholderIcon from '../Assets/titlePlaceholderIcon.png'
import employeeNameIcon from '../Assets/employeeNameIcon.png'
import profilePhotoPlaceholder from '../Assets/profilePhotoPlaceholder.png'
import emailPlaceholderIcon from '../Assets/emailPlaceholderIcon.png'
import locationPlaceholderIcon from '../Assets/locationPlaceholderIcon.png'
import {useContext, useState} from "react";
import StyledInput from "./StyledInput";
import axios from "axios";
export default function  AddEmployee({extendedEmployeeRef,addEmployeeRef, open, setOpen, newEmployee, setNewEmployee, treeData, setTreeData}){
    // const [newEmployee, setNewEmployee] = useState({
    //     first_name: '',
    //     last_name: '',
    //     profile_pic: null,
    //     type: '',
    //     reporting_manager: '',
    //     department_head: '',
    //     date_of_joining: '',
    //     office_email: '',
    //     personal_email: '',
    //     phone: '',
    //     gender: '',
    //     date_of_birth: '',
    //     organization: '1',
    //     department: '',
    //     designation: '',
    //     subDepartment: '',
    // });
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
                addEmployeeRef.current.classList.add('hidden');
            }).catch(e1 => {
                console.log(e1);
            })
        }).catch(e => {
            console.log(e, ' is the error')
        })
    }
    return (
        <div className='w-[38%] px-5 relative py-5 bg-white flex flex-col rounded-xl'>
            <button className='w-[1.5rem] top-3 absolute right-3 h-[1.5rem] bg-[#F3F4F6] rounded-full flex justify-center items-center'
                onClick={() => {
                    console.log(newEmployee, ' is the addEmployeeRef');
                    addEmployeeRef.current.classList.add('hidden');
                    addEmployeeRef.current.style.zIndex = 0;
                    window.location.reload();
                }}
            >
                <img className='w-[0.8rem]' src={cross} />
            </button>
            <p className='font-InB font-bold text-[#1F2A37] text-lg mb-0'>Add an Employee</p>
            <p className='font-InR text-[#4B5563] text-sm mb-5'>Lorem ipsum is a dummy text.</p>
            <hr style={{width:"100%", textAlign:"left", marginRight:"1.8rem", height:"1.35px", backgroundColor:"#D9D9D9"}}/>
            <div className='w-full flex justify-between mt-6' >
                <div className='w-[25%] p-4 flex justify-start items-center'>
                    <img src={profilePhotoPlaceholder} className='w-full' />
                </div>
                <div className='w-[75%] flex flex-col justify-center items-start border-l-[1.4px] pl-5'>
                    {/*<p className='font-InB text-[#1F2A37] text-sm mb-0'>Name <span className='ml-0 text-red-500 text-sm'>*</span></p>*/}
                    <StyledInput isRequired={true} type='text' fieldValue={"first_name"} value={newEmployee.first_name} employee={newEmployee} setValue={setNewEmployee} placeholder='Enter Employee First Name' label='First Name' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"last_name"} value={newEmployee.last_name} employee={newEmployee} setValue={setNewEmployee} placeholder='Enter Employee Last Name' label='Last Name' icon={employeeNameIcon} />
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center mb-7'>
                <div className='flex w-full justify-between'>
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"title"} type='text' value={newEmployee.title} employee={newEmployee} setValue={setNewEmployee} placeholder='Title' label='Title' icon={titlePlaceholderIcon} />
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"email"} type='email' value={newEmployee.email} employee={newEmployee} setValue={setNewEmployee} placeholder='name@example.com' label='Work Email' icon={emailPlaceholderIcon} />
                </div>
                <div className='flex w-full justify-between my-5'>
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"phone"} type='text' value={newEmployee.phone} employee={newEmployee} setValue={setNewEmployee} placeholder='10 digit phone number' label='Phone number' icon={titlePlaceholderIcon} />
                    <StyledInput isRequired={false} style={{
                        width:"49%",
                    }} fieldValue={"reporting_manager"} type='text' value={newEmployee.reporting_manager} employee={newEmployee} setValue={setNewEmployee} placeholder='Manager Name' label='Reporting Manager' icon={employeeNameIcon} />
                </div>
                <div className='flex w-full justify-between'>
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"date_of_birth"} type={'date'} value={newEmployee.date_of_birth} employee={newEmployee} setValue={setNewEmployee} placeholder='Eg: Mumbai, India.' label='Office Location' icon={locationPlaceholderIcon} />
                    <StyledInput isRequired={false} style={{
                        width:"49%",
                    }} fieldValue={"profile_pic"} type={'file'} value={newEmployee.profile_pic} employee={newEmployee} setValue={setNewEmployee} placeholder='Eg: https://www.linkedin.com...' label='LinkedIn Profile' icon={null} />
                </div>
            </div>
            <hr style={{width:"100%", textAlign:"left", marginRight:"1.8rem", height:"1.35px", backgroundColor:"#D9D9D9"}}/>
            <div className='flex relative justify-end w-full mt-5'>
                <button className='w-[7.5rem] mr-2 h-[2.5rem] bg-white border-[1.4px] border-[#1F2A37] rounded-lg flex justify-center items-center'
                    onClick={() => {
                        addEmployeeRef.current.classList.add('hidden');
                        addEmployeeRef.current.style.zIndex = 0
                        window.location.reload();
                    }}
                >
                    <p className='font-InM text-[#1F2A37] text-sm mb-0'>Cancel</p>
                </button>
                <button type='submit' className='w-[7.5rem] h-[2.5rem] bg-[#7E3AF2] rounded-lg flex justify-center items-center' onClick={() => {
                    addEmployee(newEmployee)
                }}>
                    <p className='font-InM text-white text-sm mb-0'>Save</p>
                </button>
                <button className='absolute left-0 top-0 w-[7.5rem] h-[2.5rem] bg-[#7E3AF2] rounded-lg flex justify-center items-center'
                    onClick={() => {
                        // console.log("clicked and value of open ", open)
                        console.log(extendedEmployeeRef.current.classList, ' is the extendedEmployeeRef');
                        // extendedEmployeeRef.current.classList.remove('hidden');
                        // extendedEmployeeRef.current.classList.add('block');
                        addEmployeeRef.current.classList.add('hidden');
                        addEmployeeRef.current.style.zIndex = 0;
                        // extendedEmployeeRef.current.classList.remove('-z-10');
                        // extendedEmployeeRef.current.classList.add('z-40');
                        setOpen(true);
                    }}
                >
                    <p className='font-InM text-white text-sm mb-0'>Add More Info</p>
                </button>
            </div>
        </div>
    )
}