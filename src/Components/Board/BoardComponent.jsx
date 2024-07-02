import React, { useEffect, useState } from "react";
import Style from "../Board/BoardComponent.module.css";
import save from "../../assets/images/save.png"
import CreateTodoComponent from "../Todo/CreateTodoComponent";
import CardComponent from "../Card/CardComponent";
import useTask from "../Hook/useTask";
import { useSelector } from "react-redux";
export default function BoardComponent() {
    const [createTodoPopupOpen, setCreateTodoPopupOpen]=useState(false);
    const [backlogs,setBacklogs]=useState([]);
    const [todos,setTodos]=useState([]);
    const [inProgress,setInProgress]=useState([]);
    const [done,setDone]=useState([]);
    const {handleGetAllTasks}=useTask();
    const {allTasks}=useSelector(state=>state.task);
    console.log(allTasks)

    useEffect(()=>{
        const initial=async()=>{
            await handleGetAllTasks();
        }

        initial();
    },[]);

     useEffect(()=>{
        let backlogs=allTasks?.tasks?.map(item=>item?.BACKLOG);
        let todos=allTasks?.tasks?.map(item=>item?.TODO);
        let inprogress=allTasks?.tasks?.map(item=>item?.INPROGRESS);
        let done=allTasks?.tasks?.map(item=>item?.DONE);
        setBacklogs(backlogs?backlogs[0]:[]);
        setTodos(todos?todos[0]:[]);
        setInProgress(inprogress?inprogress[0]:[]);
        setDone(done?done[0]:[]);
        console.log(todos?todos[0]?.length:'10');
        console.log(todos);
     },[allTasks]);

    const handleCreateTodo=()=>{
        setCreateTodoPopupOpen(true);
    }

    
    return (<>
    {createTodoPopupOpen&&<CreateTodoComponent setCreateTodoPopupOpen={setCreateTodoPopupOpen}/>}
        <div className={Style.Container}>
            <div className={Style.BoardSection}>
                <div className={Style.Header}>
                    <div>Backlog</div>
                    <div><img src={save} alt="icon" /></div>
                </div>
                <div className={Style.CardContainer}>
                {backlogs?.length>0&&
                    backlogs?.map((item,indx)=>(<CardComponent key={indx} item={item}/> ))
                    }
                </div>
            </div>
            <div className={Style.BoardSection}>
                <div className={Style.Header}>
                    <div>To Do</div>
                    <div><span onClick={handleCreateTodo} style={{fontSize:"24px", cursor:"pointer"}}>+&nbsp;&nbsp;</span><img src={save} alt="icon" /></div>
                </div>
                <div className={Style.CardContainer}>
                    {todos?.length>0&&
                    todos?.map((item,indx)=>(<CardComponent key={indx} item={item}/> ))
                    }                                   
                </div>
            </div>
            <div className={Style.BoardSection}>
                <div className={Style.Header}>
                    <div>In Progress</div>
                    <div><img src={save} alt="icon" /></div>
                </div>
                <div className={Style.CardContainer}>
                {inProgress?.length>0&&
                    inProgress?.map((item,indx)=>(<CardComponent key={indx} item={item}/> ))
                    }                
                </div>
            </div>
            <div className={Style.BoardSection}>
                <div className={Style.Header}>
                    <div>Done</div>
                    <div><img src={save} alt="icon" /></div>
                </div>
                <div className={Style.CardContainer}>
                {done?.length>0&&
                    done?.map((item,indx)=>(<CardComponent key={indx} item={item}/> ))
                    } 
                </div>
            </div>
        </div>
        </>
    )
}