import React, { useState } from "react";
import Style from '../Todo/Dropdown.module.css';
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
export default function Dropdown({setAssignee}) {
    const [isOpen, setIsOpen] = useState(false);
    const [assignTo, setAssignTo]=useState('');
    const item = ['atulverma2861@gmail.com', 'atulverma2861@gmail.com', 'atulverma2861@gmail.com', 'atulverma2861@gmail.com', 'atulverma2861@gmail.com'];

    const getTwoCharFromStart=(str)=>{
        return str.substring(0, 2).toUpperCase();
    }

    const handleAssignTo=(value)=>{
        setAssignee(value);
        setAssignTo(value);
        setIsOpen(false);
    }
    return (
        <div className={Style.Wrapper}>
            <button className={Style.DropdownBtn} onClick={e => setIsOpen(prev => !prev)}>{assignTo?assignTo:'Add a assignee'}
                {!isOpen ? (<AiOutlineCaretUp />) : (<AiOutlineCaretDown />)}
            </button>
            {isOpen && (
                <div className={Style.DropdownItem}>
                    {item.map((value, index) => (
                        <div className={Style.DropdownField} key={index}>
                            <div style={{padding:'10px',borderRadius:'50%', backgroundColor:'orange'}}>{getTwoCharFromStart(value)}</div>
                            <div>{value}</div>
                            <div><button onClick={e=>handleAssignTo(value)} className={Style.AssignToBtn}>Assign</button></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}