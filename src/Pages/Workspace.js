import NavBar from "../Components/Navbar";
import OrganizationTree from "../Components/OrganizationTree/Home";
import AddEmployee from "../Components/AddEmployee";
import {createContext, useEffect, useRef, useState} from "react";
import '../../src/Components/OrganizationTree/styles.css'
import axios from "axios";
import UpdateEmployee from "../Components/UpdateEmployee";
import {useLocation} from "react-router-dom";
import AddEmployeeExtended from "../Components/AddEmployeeExtended";
export default function Workspace() {
    const addEmployeeRef = useRef(null);
    const updateEmployeeRef = useRef(null);
    const [clickedEmployee, setClickedEmployee] = useState(null);
    const extendedEmployeeRef = useRef(null);
    const [newEmployee, setNewEmployee] = useState({
        first_name: '',
        last_name: '',
        profile_pic: null,
        type: '',
        reporting_manager: '',
        department_head: '',
        date_of_joining: '',
        office_email: '',
        personal_email: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        organization: '1',
        department: '',
        designation: '',
        subDepartment: '',
    });
    // const [treeData, setTreeData] = useState(null);
    const [treeData, setTreeData] = useState(useLocation().state);
    const [open, setOpen] = useState(false);
    return(
        <div className='w-full h-full relative overflow-clip'>
            {/*<NavBar />*/}
            <OrganizationTree addEmpRef={addEmployeeRef} updateEmpRef={updateEmployeeRef} newEmployee={newEmployee} setNewEmployee={setNewEmployee} treeData={treeData} clickedEmployee={clickedEmployee} setClickedEmployee={setClickedEmployee} />
            <div className='w-full top-0 absolute h-screen hidden backdrop-brightness-50'  ref={addEmployeeRef}>
                <div className='absolute top-[2%] left-1/3 w-full h-full fadeIn'>
                    <AddEmployee reference={addEmployeeRef} newEmployee={newEmployee} setNewEmployee={setNewEmployee} treeData={treeData} setTreeData={setTreeData} />
                </div>
            </div>
            <div className='w-full top-0 absolute h-screen hidden backdrop-brightness-50'  ref={updateEmployeeRef}>
                <div className='absolute top-[2%] left-1/3 w-full h-full fadeIn'>
                    <UpdateEmployee reference={updateEmployeeRef} employeeId={clickedEmployee} setClickedEmployee={setClickedEmployee} />
                </div>
            </div>
            <div className={`w-full top-0 absolute h-screen hidden backdrop-brightness-50`} ref={extendedEmployeeRef}>
                <div className={`right-sidebar ${open ? 'right-sidebar-open' : ''} absolute top-0 w-1/4 h-full fadeIn`}>
                    <AddEmployeeExtended reference={extendedEmployeeRef} employeeId={clickedEmployee} setClickedEmployee={setClickedEmployee} />
                </div>
            </div>

        </div>
    )
}