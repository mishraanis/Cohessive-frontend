import cross from "../../Assets/cross.png";
import chartNameLogo from "../../Assets/chartNameLogo.png";
import syncLogo from "../../Assets/sync.png";
import {useState} from "react";
import adminOptions from "../../Assets/adminOptions.png";
import rightArrowGray from "../../Assets/rightArrowGray.png";
import exportLogo from "../../Assets/exportLogo.png";
import dropDownIconClosed from "../../Assets/dropDownIconClosed.png";
import dropDownIconOpen from "../../Assets/dropDownIconOpen.png";
import doneSymbolWhite from "../../Assets/doneSymbolWhite.png";
import Select from "react-select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
export default function ChartSidebar({setIsOpen, chartReference}) {
    const [chartName, setChartName] = useState('');
    const [sync, setSync] = useState(false);
    const [exportTab, setExportTab] = useState(false);
    const [adminOptionsTab, setAdminOptionsTab] = useState(false);
    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ]
    const [selectedOption, setSelectedOption] = useState(null);
    const [csvData, setCsvData] = useState(null);
    const [selectedExportOption, setSelectedExportOption] = useState(null);

    const exportChart = () => {
        console.log(chartReference.current, ' chart reference')
        if(selectedExportOption === 'csv'){
            axios.get(process.env.REACT_APP_BACKEND_URL + '/chart/export-csv/').then((res) => {
                console.log(res.data);
                setCsvData(res.data);
                const blob = new Blob([res.data], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                console.log(url, ' link');
                link.href = url;
                link.setAttribute('download', 'data.csv');
                link.click();
            }).catch((err) => {
                console.log(err);
            })
        }else if(selectedExportOption === 'pdf'){

            html2canvas(chartReference.current).then((canvas) => {
            // Create a new PDF document
                console.log(canvas, ' canvas')
                const pdf = new jsPDF();
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                // Add the image to the PDF
                pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0);
                // Save the PDF
                pdf.save('chart.pdf');
            });
        }else if(selectedExportOption === 'png'){
            // create a png image of the chart
            html2canvas(chartReference.current).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.setAttribute('download', 'chart.png');
                link.click();
            });
        }
    }
    return(
        <div className='relative flex flex-col w-full justify-center items-center pt-0'>
            <button className='w-[1.5rem] top-5 absolute right-3 rounded-full flex justify-center items-center'
                onClick={() => {
                    setIsOpen(false);
                    setSync(false);
                    setExportTab(false);
                    setAdminOptionsTab(false);
                }}
            >
                <img className='w-[0.8rem]' src={cross} />
            </button>
            <div className='w-full flex flex-col items-start'>
                <div className='w-full flex items-center pl-3 pr-10 py-5 border-b-[#F3F4F6] border-b-2'>
                    <img src={chartNameLogo} className='w-6 ml-2' />
                    <input className='w-40 ml-2 focus:outline-0 pl-2 text-sm font-InM' placeholder='Untitled Chart' onChange={
                        (e) => {
                            setChartName(e.target.value);
                        }
                    } />
                </div>
                <div className={`w-full relative flex flex-col pt-5 ${sync ? 'pb-28' : 'pb-0'}  items-center border-b-[#F3F4F6] border-b-2`}>
                    <div className='w-full flex relative items-center pl-3 pr-10 pb-5 z-10'>
                        <img src={syncLogo} className='w-6 ml-2' />
                        <img src={sync ? dropDownIconClosed : dropDownIconOpen} className='z-10 absolute w-6 right-6 cursor-pointer' onClick={
                            (e) => {
                                setSync(!sync);
                                setExportTab(false);
                                setAdminOptionsTab(false);
                            }}/>
                        <p className='ml-2 mb-0 text-sm font-InM'>Sync</p>
                    </div>
                    <div className={`dropdown-sync ${sync ? 'open-dropdown-sync fadeIn' : ''}`}>
                        <div className='w-[90%] bg-[#F8F8F8] px-5 py-5 flex'>
                            <p className='font-InM text-sm mb-0'>File <span className='font-InB underline'>https://example-sheets.com</span> is updating.</p>
                        </div>
                    </div>

                </div>
                <div className='w-full flex flex-col items-center pl-3 pr-3 py-5 border-b-[#F3F4F6] border-b-2'>
                    <p className='ml-2 mb-2 text-sm font-InB w-full'>Admin Options</p>
                    <div className='w-[95%] flex justify-between items-center px-4 bg-[#E5E7EB] py-2 rounded-xl'>
                        <img src={adminOptions} className='w-20' />
                        <img src={rightArrowGray} className='w-6 z-10 cursor-pointer' onClick={
                            (e) => {
                                setAdminOptionsTab(!adminOptionsTab);
                                setExportTab(false);
                                setSync(false);
                            }
                        } />
                    </div>
                    <div className={`dropdown-adminOption ${adminOptionsTab ? 'open-dropdown-adminOption fadeIn' : ''}`}>
                        <div className='w-full bg-[#F8F8F8] px-5 py-5 flex flex-col rounded-md'>
                            <p className={`text-xl font-InB mb-0 `}>Access Control</p>
                            <div className={`w-full mt-5 flex flex-col items-center`}>
                                <div className={`w-full flex justify-between `}>
                                    <div className={`w-10 flex mr-2 items-center`}>
                                        <img src={rightArrowGray} className={`w-6 mr-2`} />
                                        <p className={`text-sm font-InM mb-0`}>[Name]</p>
                                    </div>
                                  <Select id="dropdown" options={options} value={selectedOption} className={`z-10 w-40 font-InM border-black`} onChange={
                                        (option) => {
                                            setSelectedOption(option);
                                        }
                                  } placeholder={`${selectedOption}`}
                                          styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: 'black',
                                                    borderStyle: 'solid',
                                                    borderWidth: '1.5px',
                                                    borderRadius: '0.75rem',
                                                    boxShadow: 'none',
                                                })
                                          }}
                                  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-full relative flex flex-col items-center pt-5 ${exportTab ? 'pb-52' : 'pb-0'} border-b-[#F3F4F6] border-b-2`}>
                    <div className='w-full flex items-center pl-3 pr-10 pb-5'>
                        <img src={exportLogo} className='w-6 ml-2' />
                        <img src={exportTab ? dropDownIconClosed : dropDownIconOpen} className='absolute w-6 right-6 z-10 cursor-pointer' onClick={
                            (e) => {
                                setExportTab(!exportTab);
                                setSync(false);
                                setAdminOptionsTab(false);
                            }
                        } />
                        <p className='ml-2 text-sm font-InM mb-0'>Export</p>
                        <div className={`dropdown-export ${exportTab ? 'open-dropdown-export fadeIn' : ''}`}>
                            <div className='w-[90%] bg-[#F8F8F8] px-5 py-4 flex flex-col rounded-md'>
                                <div className='flex w-full font-InM text-sm items-center pt-1 pb-1'>
                                    <input type={'radio'} name={'exportOptions'} value={'png'} className='w-4 h-4'
                                       onChange={
                                          (e) => {
                                            setSelectedExportOption(e.target.value);
                                          }
                                       }
                                    />
                                    <p className='font-InM text-sm mb-0 ml-1.5'>PNG</p>
                                </div>
                                <div className='flex w-full font-InM text-sm items-center py-1'>
                                    <input type={'radio'} name={'exportOptions'} value={'pdf'} className='w-4 h-4'
                                        onChange={
                                            (e) => {
                                                setSelectedExportOption(e.target.value);
                                            }
                                        }
                                    />
                                    <p className='font-InM text-sm mb-0 ml-1.5'>PDF</p>
                                </div>
                                <div className='flex w-full font-InM text-sm items-center py-1'>
                                    <input type={'radio'} name={'exportOptions'} value={'csv'} className='w-4 h-4'
                                        onChange={
                                            (e) => {
                                                setSelectedExportOption(e.target.value);
                                            }
                                        }
                                    />
                                    <p className='font-InM text-sm mb-0 ml-1.5'>CSV</p>
                                </div>
                                <div className='flex w-full font-InM text-sm items-center pt-1 pb-2'>
                                    <input type={'radio'} name={'exportOptions'} value={'jpeg'} className='w-4 h-4'
                                        onChange={
                                            (e) => {
                                                setSelectedExportOption(e.target.value);
                                            }
                                        }
                                    />
                                    <p className='font-InM text-sm mb-0 ml-1.5'>JPEG</p>
                                </div>
                                <button className='min-w-fit mt-2 px-4 bg-[#7E3AF2] rounded-lg flex justify-center py-2 items-center'
                                    onClick={() => {
                                        // navigate('/workspace');
                                        exportChart(selectedExportOption);
                                    }}
                                >
                                    <p className='font-InM text-white text-[0.8rem] mb-0'>Export </p>
                                    <img className='w-[1.1rem] ml-2' src={doneSymbolWhite} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}