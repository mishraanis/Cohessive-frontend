import NavBar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import createNewChart from "../Assets/createNewChart.png";
import logout from "../Assets/logout.png";
import createNewChartButton from "../Assets/createNewChartButton.png";
import CreateNewChart from "../Components/CreateNewChart";
import {useRef, createContext, useState} from "react";
import AddEmployee from "../Components/AddEmployee";
import AddEmployeeExtended from "../Components/AddEmployeeExtended";

export const CreateNewChartContext = createContext('');
export default function Dashboard(){
    const createNewChartRef = useRef(null);
    // const [createNewChartOpen, setCreateNewChartOpen] = useState(false);
    return(
        <div className='w-full h-full '>
            {/*<NavBar />*/}
            <div className='w-full flex'>
                <div className='absolute left-0 w-[17.5%] h-[90vh] flex'>
                    <Sidebar />
                </div>
                <div ref={createNewChartRef} className='absolute h-full hidden backdrop-brightness-50  flex justify-center items-center top-0 w-full z-10'>
                    <CreateNewChartContext.Provider value={createNewChartRef}>
                        <CreateNewChart ref={createNewChartRef} />
                    </CreateNewChartContext.Provider>
                </div>
                <div className='flex flex-grow relative w-auto h-[90vh] flex-col items-center justify-center'>
                    <div className='w-[20%] absolute top-[15vh]'>
                        <img src={createNewChart} className='w-full' alt='createNewChart'/>
                    </div>
                    <p className='text-[#4B5563] absolute top-[65vh] font-InM text-lg text-center w-[30%]'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <div className='absolute bottom-9 px-2 w-[17%]'>
                        <button  className='text-white bg-[#7E3AF2] font-InM text-sm w-full px-4 py-3.5 rounded-lg flex justify-center items-center min-w-fit'
                            onClick={() => {
                                createNewChartRef.current.classList.remove('hidden');
                                createNewChartRef.current.style.zIndex = 10
                            }}>
                            <img src={createNewChartButton} className='w-[1.2rem]' />
                            <p className='pl-2 mb-0 font-InM'>Create a New Chart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}