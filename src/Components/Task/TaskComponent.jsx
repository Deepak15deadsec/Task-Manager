import React, { useEffect } from "react";
import Style from "../Task/TaskComponent.module.css";
import useTask from "../Hook/useTask";
import { useSelector } from "react-redux";
export default function TaskComponent({taskId}) {
const{handleGetTaskById}=useTask();
const {taskById}=useSelector(state=>state.task);
console.log(taskById)
useEffect(()=>{
    const initial=async()=>{
        await handleGetTaskById(taskId);
    }
    initial();
},[]);

const handleCheckedItem = () => {
    const noOfCheckList=taskById?.task?.checkList?.filter(item=>item?.isChecked===true);       
    return noOfCheckList&&noOfCheckList?.length;
     //setIsOpen(false);
 }

 function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // For 11th, 12th, 13th, etc.
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function convertToRequiredFormat(data) {        
    const date = new Date(data);        
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const formatedDate = `${month} ${day}${getOrdinalSuffix(day)}`;

    return formatedDate;
}

    return (
        <div className={Style.Card}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            {taskById?.task?.priority==='LOW PRIORITY'&&<div className={Style.Circel} style={{background: '#63C05B'}}></div>}
                    {taskById?.task?.priority==='MODERATE PRIORITY'&&<div className={Style.Circel} style={{background: '#18B0FF'}}></div>}
                    {taskById?.task?.priority==='HIGH PRIORITY'&&<div className={Style.Circel} style={{background: '#FF2473'}}></div>}
                <div style={{ marginLeft: '10px', fontSize: '12px' }}>{taskById?.task?.priority}</div>
            </div>
            <div style={{ margin: '10px 10px', fontSize: 'large', fontWeight: 'bold' }}>
                {taskById?.task?.task}
            </div>
            <div style={{fontSize:'18px', fontWeight:'450', marginLeft:'10px'}}>
            {`Checklist(${handleCheckedItem()}/${taskById?.task?.checkList?.length})`}
            </div>
            <div>
                {taskById?.task?.checkList?.length>0&&
                taskById?.task?.checkList?.map((item,indx)=>
                <div className={Style.TaskItem} key={indx}>
                    <input type='checkbox' checked={item?.isChecked} style={{ marginLeft: '10px' }} readOnly />
                    <input type='text' value={item?.value} placeholder='Task to be done' readOnly className={Style.TaskInput} />
                </div>)}               
            </div>
            <div className={Style.Duedate}>
                <div style={{fontSize:'18px', fontWeight:'450', marginLeft:'10px'}}>Due Date</div>
                <div className={Style.Date}>{convertToRequiredFormat(taskById?.task?.dueDate)}</div>
            </div>
        </div>
    )
}