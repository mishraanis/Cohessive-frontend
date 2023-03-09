import moment from "moment";

export default function StyledInput(props) {
    return (
        <div className='w-full relative flex flex-col justify-start items-start' style={props.style}>
            <p className='font-InM text-[#1F2A37] text-sm mb-2'>{props.label} <span style={props.starStyle} className='ml-0 text-red-500 text-sm'>*</span></p>
            <input type={props.type} onChange={
                (e) => {
                    if(props.type === 'date'){
                        props.setValue({...(props.employee), [props.fieldValue]: moment(e.target.value).format('YYYY-MM-DD')});
                    }else if (props.type === 'file'){
                        props.setValue({...(props.employee), [props.fieldValue]: e.target.files[0]});
                        console.log(e.target.files[0]);
                    }
                    else{
                        props.setValue({...(props.employee), [props.fieldValue]: e.target.value});
                    }
                }
            } required={props.isRequired} className='font-InR bg-[#F9FAFB] tracking-tighter flex items-center w-full border-[#D1D5DB] border-[1px] rounded-lg py-2.5 text-[#4B5563] text-sm mb-0' style={
                props.icon ? {paddingLeft: '2.5rem', paddingRight:'1rem'} : {paddingLeft: '0.75rem', paddingRight:'0.75rem'}
            } placeholder={props.placeholder}/>
            <img className={'w-[1.2rem] absolute left-3.5 top-[57%]'} style={props.icon ? {display:"block"} : {display:"none"}} src={props.icon} alt={props.label} />
        </div>
    )
}