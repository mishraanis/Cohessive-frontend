import cross from '../Assets/cross.png'
import rightArrowWhite from '../Assets/rightArrowWhite.png'
import uploadCSV from '../Assets/uploadCSV.png'
import download from '../Assets/download.png'
import {useContext, useRef, useState} from "react";
import {CreateNewChartContext} from '../Pages/NUXDashboard'
import {useNavigate} from "react-router-dom";
import axios from "axios";
export default function  CreateNewChart(props){
    const createNewChartRef = useContext(CreateNewChartContext);
    let navigate = useNavigate();
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const hiddenFileInputButton = useRef(null);
    const [chartData, setChartData] = useState(null);
    const getChartData = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/chart/organizations/getEmployees/'+'1').then(res => {
            console.log(res.data)
            setChartData(res.data[0])
            navigate('/workspace', {state: [chartData, setChartData]})
        }).catch(err => {
            console.log(err)
        })
    }
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        if(fileUploaded){
            hiddenFileInputButton.current.classList.add('hidden');
        }
        setFile(fileUploaded);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/chart/upload-csv/', fileUploaded,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
            console.log(res)
            getChartData();
        }).catch(err => {
            console.log(err)
        })

        console.log(fileUploaded)
    };
    return (
        <div className='w-5/12 px-5 relative py-5 bg-white flex flex-col rounded-xl'>
            <button className='w-[1.5rem] top-3 absolute right-3 h-[1.5rem] bg-[#F3F4F6] rounded-full flex justify-center items-center'
                onClick={() => {
                    createNewChartRef.current.classList.add('hidden');
                    createNewChartRef.current.style.zIndex = 0;
                }
                }
            >
                <img className='w-[0.8rem]' src={cross} />
            </button>
            <p className='font-InB font-bold text-[#1F2A37] text-lg mb-0'>Create New Chart</p>
            <p className='font-InR text-[#4B5563] text-sm mb-5'>Add Manually/Upload a CSV or import a weblink</p>
            <div className='w-full p-2 flex justify-between items-center rounded-lg border-[1.9px] border-[#D1D5DB]'>
                <div className='flex w-1/2 flex-col justify-center'>
                    <p className='font-InS text-[#1F2A37] text-base mb-0'>Blank Canvas</p>
                    <p className='font-InR text-[#535354] text-sm tracking-tight mb-0'>Create a new chart from scratch</p>
                </div>
                <div className='w-1/2 flex justify-end items-center'>
                    <button className='min-w-fit px-4 bg-[#7E3AF2] rounded-lg flex justify-center py-2 items-center'
                        onClick={() => {
                            navigate('/workspace', {state:null});
                        }}
                    >
                        <p className='font-InM text-white text-[0.8rem] mb-0'>Get Started </p>
                        <img className='w-[1.1rem] ml-2' src={rightArrowWhite} />
                    </button>
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <hr style={{width:"42%", textAlign:"left", marginRight:"1.8rem", height:"1.5px", backgroundColor:"#D9D9D9"}}/>
                <p className='font-InS text-[#374151] text-sm tracking-tight mb-2 mt-2'>Or</p>
                <hr style={{width:"42%", textAlign:"left", marginLeft:"1.8rem", height:"1.5px", backgroundColor:"#D9D9D9"}}/>
            </div>
            <div className='w-full p-2 flex flex-col items-center rounded-lg border-[1.9px] border-[#D1D5DB]'>
                <div className='flex w-full flex-col justify-center pb-3'>
                    <p className='font-InS text-[#1F2A37] text-base mb-0'>Upload CSV</p>
                    <p className='font-InR text-[#535354] text-sm tracking-tight mb-2'>Upload and attach file</p>
                </div>
                <div className='w-full flex justify-center border-[1.9px] border-[#D1D5DB] border-dashed rounded-lg flex-col items-center'>
                    <div className='flex justify-center items-center w-full h-full px-2 mb-2 h-24'>
                        <button
                            type='button'
                            onClick={handleClick}
                            ref={hiddenFileInputButton}
                            className='flex justify-center items-center'
                        >
                            <img src={uploadCSV} className='w-[5.5rem] mt-7 mb-4 cursor-pointer'/>
                        </button>
                        <input type='file' className='hidden' ref={hiddenFileInput} onChange={handleChange}/>
                    </div>

                    <p className='font-InR text-[#535354] text-xs tracking-tight mb-5'><span className='font-InB underline cursor-pointer' onClick={handleClick} ref={hiddenFileInputButton}>Click to Upload</span> or drag and drop</p>
                </div>
                <div className='w-full flex items-center mt-2'>
                    <img src={download} className='w-[1.3rem]' />
                    <p className='font-InS text-[#374151] text-xs tracking-tight mb-0 ml-1'>Download CSV Template</p>
                </div>
            </div>

        </div>
    )
}