import teamTreeLogo from '../Assets/teamTreeLogo.png'
import home from '../Assets/home.png'
import employeeDetails from '../Assets/employeeDetails.png'
import logout from '../Assets/logout.png'
export default function Sidebar() {
    return (
        <div className='relative flex flex-col w-full items-center pt-0'>
            <div className='w-full bg-[#DCD7FE] flex justify-center px-2 py-7'>
                <img src={teamTreeLogo} className='w-[2rem]' />
                <p className='text-[#7E3AF2] text-lg pl-5 font-MoR'><span className='font-MoB'>Team</span> Tree</p>
            </div>
            <div className='w-full bg-[#F9FAFB] flex flex-col py-7 pl-5'>
                <div className='w-full flex py-2'>
                    <img src={home} className='w-[1.5rem]' />
                    <p className='text-[0.9rem] pl-3 font-InM'>Home</p>
                </div>
                <div className='w-full flex py-2'>
                    <div className='w-[1.5rem]'>
                        <img src={employeeDetails} className='w-full' />
                    </div>
                    <p className='text-[0.9rem] pl-3 font-InM'>Employee Details</p>
                </div>
            </div>
            <div className='pt-4 w-full'>
                <p className='font-bold font-InM tracking-wide text-base pl-5 pb-2'>Recents</p>
                <p className='text-sm pl-5 pb-0 text-[#6B7280]'>No Charts,</p>
                <p className='text-sm pl-5 pb-0 text-[#6B7280] underline'>Create One Now</p>
            </div>
            <div className='absolute bottom-0 px-2 w-full'>
                <button className='text-black font-InM text-sm w-full px-4 py-2 rounded-lg border-[#1F2A37] border-[1.9px] flex justify-center items-center min-w-fit'>
                    <img src={logout} className='w-[1.2rem]' />
                    <p className='pl-2 mb-0 font-InM text-[#1F2A37]'>Logout</p>
                </button>
            </div>
        </div>
    )
}