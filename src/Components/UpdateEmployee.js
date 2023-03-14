import cross from '../Assets/cross.png'
import titlePlaceholderIcon from '../Assets/titlePlaceholderIcon.png'
import employeeNameIcon from '../Assets/employeeNameIcon.png'
import profilePhotoPlaceholder from '../Assets/profilePhotoPlaceholder.png'
import emailPlaceholderIcon from '../Assets/emailPlaceholderIcon.png'
import locationPlaceholderIcon from '../Assets/locationPlaceholderIcon.png'
import {useState} from "react";
import StyledInput from "./StyledInput";
import axios from "axios";
export default function  UpdateEmployee({extendedEmployeeRef, updateEmployeeRef, open, setOpen, employeeId, setClickedEmployee}){
    const [updatedEmployee, setUpdatedEmployee] = useState({
        first_name: null,
        last_name: null,
        profile_pic1: null,
        profile_pic2: null,
        type: null,
        reporting_manager: null,
        department_head: null,
        date_of_joining: null,
        office_email: null,
        personal_email: null,
        phone: null,
        gender: null,
        date_of_birth: null,
        organization: '1',
        department: null,
        designation: null,
        subDepartment: null,
    });
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const updateEmployee = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/chart/organizations/users/'+employeeId+'/').then(r => {
            setCurrentEmployee(r.data);
        }).catch(e => {
            console.log(e, ' is the error')
        })

        // if(updatedEmployee['first_name']===null){
        //     setUpdatedEmployee({
        //         ...updatedEmployee,
        //         first_name: currentEmployee['first_name']
        //     })
        // }
        // if(updatedEmployee['last_name']===null){
        //     setUpdatedEmployee({
        //         ...updatedEmployee,
        //         last_name: currentEmployee['last_name']
        //     })
        // }
        // // if(updatedEmployee['profile_pic1']===null){
        // //     setUpdatedEmployee({
        // //         ...updatedEmployee,
        // //         profile_pic1: currentEmployee['profile_pic']
        // //     })
        // // }
        // if(updatedEmployee['type']===null){
        //     setUpdatedEmployee({
        //         ...updatedEmployee,
        //         type: currentEmployee['type']
        //     })
        // }
        // if(updatedEmployee['reporting_manager']===null){
        //     setUpdatedEmployee({
        //         ...updatedEmployee,
        //         reporting_manager: currentEmployee['reporting_manager']
        //     })
        // }
        // if(updatedEmployee['department_head']===null){
        //     setUpdatedEmployee({
        //         ...updatedEmployee,
        //         department_head: currentEmployee['department_head']
        //     })
        // }
        axios.patch(process.env.REACT_APP_BACKEND_URL + '/chart/organizations/users/'+employeeId+'/', updatedEmployee, {
            headers: {
                'Content-Type': "multipart/form-data",
            },
        }).then(r => {
            console.log(r.data);
        })
    }
    return (
        <div className='w-[38%] px-5 relative py-5 bg-white flex flex-col rounded-xl'>
            <button className='w-[1.5rem] top-3 absolute right-3 h-[1.5rem] bg-[#F3F4F6] rounded-full flex justify-center items-center'
                onClick={() => {
                    console.log(updateEmployeeRef, ' is the updateEmployeeRef');
                    updateEmployeeRef.current.classList.add('hidden');
                    updateEmployeeRef.current.style.zIndex = 0;
                    setClickedEmployee(null);
                    window.location.reload();
                }}
            >
                <img className='w-[0.8rem]' src={cross} />
            </button>
            <p className='font-InB font-bold text-[#1F2A37] text-lg mb-0'>Update Employee</p>
            <p className='font-InR text-[#4B5563] text-sm mb-5'>Lorem ipsum is a dummy text.</p>
            <hr style={{width:"100%", textAlign:"left", marginRight:"1.8rem", height:"1.35px", backgroundColor:"#D9D9D9"}}/>
            <div className='w-full flex justify-between mt-6' >
                <div className='w-[25%] p-4 flex justify-start items-center'>
                    <img src={profilePhotoPlaceholder} className='w-full' />
                </div>
                <div className='w-[75%] flex flex-col justify-center items-start border-l-[1.4px] pl-5'>
                    {/*<p className='font-InB text-[#1F2A37] text-sm mb-0'>Name <span className='ml-0 text-red-500 text-sm'>*</span></p>*/}
                    <StyledInput isRequired={true} type='text' fieldValue={"first_name"} value={updatedEmployee.first_name} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Enter Employee First Name' label='First Name' icon={employeeNameIcon} />
                    <StyledInput isRequired={true} type='text' fieldValue={"last_name"} value={updatedEmployee.last_name} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Enter Employee Last Name' label='Last Name' icon={employeeNameIcon} />
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center mb-7'>
                <div className='flex w-full justify-between'>
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"title"} type='text' value={updatedEmployee.title} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Title' label='Title' icon={titlePlaceholderIcon} />
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"office_email"} type='email' value={updatedEmployee.office_email} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='name@example.com' label='Work Email' icon={emailPlaceholderIcon} />
                </div>
                <div className='flex w-full justify-between my-5'>
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"phone"} type='text' value={updatedEmployee.phone} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='10 digit phone number' label='Phone number' icon={titlePlaceholderIcon} />
                    <StyledInput isRequired={false} style={{
                        width:"49%",
                    }} fieldValue={"reporting_manager"} type='text' value={updatedEmployee.reporting_manager} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Manager Name' label='Reporting Manager' icon={employeeNameIcon} />
                </div>
                <div className='flex w-full justify-between'>
                    <StyledInput isRequired={true} style={{
                        width:"49%",
                    }} fieldValue={"date_of_birth"} type={'date'} value={updatedEmployee.date_of_birth} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Eg: Mumbai, India.' label='Office Location' icon={locationPlaceholderIcon} />
                    <StyledInput isRequired={false} style={{
                        width:"49%",
                    }} fieldValue={"profile_pic1"} type={'file'} value={updatedEmployee.profile_pic1} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Eg: https://www.linkedin.com...' label='LinkedIn Profile' icon={null} />
                    <StyledInput isRequired={false} style={{
                        width:"49%",
                    }} fieldValue={"profile_pic2"} type={'text'} value={updatedEmployee.profile_pic2} employee={updatedEmployee} setValue={setUpdatedEmployee} placeholder='Eg: https://www.linkedin.com...' label='LinkedIn Profile' icon={null} />

                </div>
            </div>
            <hr style={{width:"100%", textAlign:"left", marginRight:"1.8rem", height:"1.35px", backgroundColor:"#D9D9D9"}}/>
            <div className='flex relative justify-end w-full mt-5'>
                <button className='w-[7.5rem] mr-2 h-[2.5rem] bg-white border-[1.4px] border-[#1F2A37] rounded-lg flex justify-center items-center'
                    onClick={() => {
                        updateEmployeeRef.current.classList.add('hidden');
                        updateEmployeeRef.current.style.zIndex = 0;
                        window.location.reload();
                    }}
                >
                    <p className='font-InM text-[#1F2A37] text-sm mb-0'>Cancel</p>
                </button>
                <button type='submit' className='w-[7.5rem] h-[2.5rem] bg-[#7E3AF2] rounded-lg flex justify-center items-center' onClick={() => {
                    updateEmployee(updatedEmployee);
                    updateEmployeeRef.current.classList.add('hidden');
                    updateEmployeeRef.current.style.zIndex = 0;
                    window.location.reload();
                }}>
                    <p className='font-InM text-white text-sm mb-0'>Save</p>
                </button>
                <button className='absolute left-0 top-0 w-[7.5rem] h-[2.5rem] bg-[#7E3AF2] rounded-lg flex justify-center items-center'
                    onClick={() => {
                        // extendedEmployeeRef.current.classList.remove('hidden');
                        // extendedEmployeeRef.current.classList.add('block');
                        updateEmployeeRef.current.style.zIndex = 0;
                        updateEmployeeRef.current.classList.add('hidden');
                        setOpen(true);
                    }}
                >
                    <p className='font-InM text-white text-sm mb-0'>Add More Info</p>
                </button>
            </div>
        </div>
    )
}