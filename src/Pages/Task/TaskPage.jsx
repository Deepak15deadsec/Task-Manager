import React from 'react';
import Style from "../Task/TaskPage.module.css";
import proManage from "../../assets/images/codesandbox.png";
import TaskComponent from '../../Components/Task/TaskComponent';
import { useParams } from 'react-router-dom';
export default function TaskPage(){
const {taskId}=useParams();

    return(<>
    <div className={Style.Navbar}><span><img style={{marginBottom:'-5px', marginRight:'5px'}} src={proManage} alt=""/></span>Pro Manage</div>
    <div className={Style.Container}>
        <TaskComponent taskId={taskId}/>
    </div>
    </>)
}