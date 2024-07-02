import React, { useState } from "react";
import Style from "../Todo/CreateTodoComponent.module.css";
import { useRef, useEffect } from "react";
import delete1 from '../../assets/images/delete.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dropdown from "./Dropdown";
import useTask from "../Hook/useTask";
import useUser from "../Hook/useUser";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
export default function CreateTodoComponent({ setCreateTodoPopupOpen, item }) {
    const inputRef = useRef(null);
    const [fieldErrors, setFieldErrors] = useState();
    const [taskItem, setTaskItem] = useState([]);
    const [isCalenderOpen, setIsCalenderOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(0);
    const [date, setDate] = useState(new Date());
    const [assignee, setAssignee] = useState('');
    const [noOfCheckList,setNoOfChecklist]=useState(0);
    const[checkedCheckbox,setCheckedCheckbox]=useState(0);
    const { handleCreateTask } = useTask();
    const { handleGetAllEmails } = useUser();


    const { allEmails } = useSelector(state => state?.user);
    console.log(allEmails?.peopleMail?.emails)
    const [todos, setTodos] = useState([{
        task: "",
        priority: "",
        assignTo: "",
        checkList: [],
        dueDate: "",
        currentStatus: 'TODO',
    }]);

    //Dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [assignTo, setAssignTo] = useState('');
    const item1 = ['atulverma2861@gmail.com', 'atulverma2861@gmail.com', 'atulverma2861@gmail.com', 'atulverma2861@gmail.com', 'atulverma2861@gmail.com'];

    const getTwoCharFromStart = (str) => {
        return str.substring(0, 2).toUpperCase();
    }

    const handleAssignTo = (value) => {
        setAssignee(value);
        setAssignTo(value);
        setIsOpen(false);
    }
    //------------end---------------------
    useEffect(() => {
        const initial = async () => {
            await handleGetAllEmails();
        }
        initial();
    }, []);

    useEffect(() => {
        let values = [...todos];
        values[0] = {
            ...values[0],
            assignTo: assignee,
        };
        setTodos(values);
    }, [assignee]);

    useEffect(() => {
        const editTodo = async () => {
            console.log(item)
            setTodos([{
                task: item?.task,
                priority: item?.priority,
                assignTo: item?.assignTo,
                checkList: item?.checkList,
                dueDate: item?.dueDate,
                currentStatus: item?.currentStatus,
            }])

        }
        if (item) {
            editTodo();
        }
    }, []);

    const handleAddNewTaskItem = () => {
        const newTodos = [...todos];
        newTodos[0].checkList.push({
            isChecked: false,
            value: ""
        });
        setNoOfChecklist(newTodos[0]?.checkList?.length);
        setTodos(newTodos);

    }

    const handleRemoveTaskItem = (indx, e) => {
        const newTodos = [...todos];
        newTodos[0].checkList.splice(indx, 1);
        console.log(newTodos[0].checkList)
        setTodos(newTodos);
        setNoOfChecklist(newTodos[0]?.checkList?.length);
        const noOfCheckList=newTodos[0]?.checkList?.filter(item=>item?.isChecked===true);       
        setCheckedCheckbox(noOfCheckList&&noOfCheckList?.length);
    }


    const handleDueDate = (e) => {
        setIsCalenderOpen(!isCalenderOpen);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        return `${year}/${month}/${day}`;
    }

    const handleSelectDate = (date) => {
        console.log(date)
        setDate(date)
        setSelectedDate(formatDate(date));
        setIsCalenderOpen(false);
        let values = [...todos];
        values[0] = {
            ...values[0],
            dueDate: date,
        };
        setTodos(values);
    }

    const handleCancelCreateTodo = () => {
        setCreateTodoPopupOpen(false);

    }

    const handleTodosChange = (e) => {
        let values = [...todos];
        if (e?.target?.name === 'task') {
            values[0] = {
                ...values[0],
                task: e.target.value,
            };
        } else if (e?.target?.name === 'priority') {
            values[0] = {
                ...values[0],
                priority: e.target.innerText,
            };
        }
        setTodos(values);
    }

    const handleCheckListChange = (indx, e) => {
        // let values = [...todos];
        // if (e?.target?.name === 'checkList') {
        //     if (values[0].checkList[indx]) {
        //         values = values.map((item, itemIndex) => {
        //             const updatedOptions = item.checkList.map((option, optionIndex) => {
        //                 if (optionIndex === indx) {
        //                     return { ...option, isChecked: e.target.checked };
        //                 }
        //                 return option;
        //             });
        //             return { ...item, checkList: updatedOptions };
        //         });
        //     } else {
        //         values = values?.map((item, itemIndex) => {
        //             const updatedOptions = [...item.checkList];
        //             updatedOptions[indx] = { 'isChecked': e.target.checked };
        //             return { ...item, isChecked: updatedOptions };

        //         });
        //     }

        // } else if (e?.target?.name === 'checkListValue') {

        //     if (values[0].checkList[indx]) {
        //         values = values.map((item, itemIndex) => {
        //             const updatedOptions = item.checkList.map((option, optionIndex) => {
        //                 if (optionIndex === indx) {
        //                     return { ...option, value: e.target.value };
        //                 }
        //                 return option;
        //             });
        //             return { ...item, value: updatedOptions };
        //         });
        //     } else {
        //         values = values?.map((item, itemIndex) => {
        //             const updatedOptions = [...item.checkList];
        //             updatedOptions[indx] = { 'value': e.target.value };
        //             return { ...item, value: updatedOptions };

        //         });
        //     }
        // }

        const newTodos = [...todos];
        if (e.target.name === "checkbox") {
            newTodos[0].checkList[indx].isChecked = e.target.checked;
            const noOfCheckList=newTodos[0]?.checkList?.filter(item=>item?.isChecked===true);       
            setCheckedCheckbox(noOfCheckList&&noOfCheckList?.length); 
        } else {
            newTodos[0].checkList[indx].value = e.target.value;
        }
        setTodos(newTodos);
    }

    const handleCreateTodo = async () => {
        await handleCreateTask(...todos)
        toast.success('Task created successfully!');       
    }

   
    return (<>

        <div className={Style.Container}>
            {isCalenderOpen && <div className={Style.CalendarStyle}><Calendar onChange={handleSelectDate} value={date} /></div>}
            <div className={Style.Label}>Title<span style={{ color: 'red' }}>*</span></div>
            <div className={Style.InputContainer}>
                <input
                    type="text"
                    placeholder="Enter Task Title"
                    className={`${Style.InputBox} ${fieldErrors?.question && Style.ErrorMsg}`}
                    name="task"
                    ref={inputRef}
                    onChange={e => handleTodosChange(e)}
                    value={todos[0]['task']}
                />
            </div>
            <div className={Style.PriorityContainer}>
                <div className={Style.PriorityHeading}>Select Priority<span style={{ color: 'red', marginRight: '50px' }}>*</span></div>
                <div className={Style.PriorityType}>
                    <div className={Style.PriorityBtn}><div className={Style.Circel} style={{background: '#63C05B'}}></div><button name='priority' onClick={e => handleTodosChange(e)} className={Style.PriorityTypeBtn}>HIGH PRIORITY</button></div>
                    <div className={Style.PriorityBtn}><div className={Style.Circel} style={{background: '#18B0FF'}}></div><button name='priority' onClick={e => handleTodosChange(e)} className={Style.PriorityTypeBtn}>MODERATE PRIORITY</button></div>
                    <div className={Style.PriorityBtn}><div className={Style.Circel} style={{background: '#FF2473'}}></div><button name='priority' onClick={e => handleTodosChange(e)} className={Style.PriorityTypeBtn}>LOW PRIORITY</button></div>
                </div>
            </div>
            <div className={Style.AssignContainer}>
                <div className={Style.AssignTo}>Assign To</div>
                <div className="">
                    {/* <Dropdown setAssignee={setAssignee} item={allEmails?.peopleMail?.emails}/> */}
                    <div className={Style.Wrapper}>
                        <button className={Style.DropdownBtn} onClick={e => setIsOpen(prev => !prev)}>{assignTo ? assignTo : 'Add a assignee'}
                            {!isOpen ? (<AiOutlineCaretUp />) : (<AiOutlineCaretDown />)}
                        </button>
                        {isOpen && (
                            <div className={Style.DropdownItem}>
                                {allEmails?.peopleMail?.emails?.map((value, index) => (
                                    <div className={Style.DropdownField} key={index}>
                                        <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'orange' }}>{getTwoCharFromStart(value)}</div>
                                        <div>{value}</div>
                                        <div><button onClick={e => handleAssignTo(value)} className={Style.AssignToBtn}>Assign</button></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={Style.Checklist}>{`Checklist(${checkedCheckbox}/${noOfCheckList})`}<span style={{ color: 'red' }}>*</span></div>
            <div className={Style.Task}>
                {todos[0]?.checkList?.length > 0 &&
                    todos[0]?.checkList?.map((item, indx) => (
                        <div className={Style.TaskItem} key={indx}>
                            <div>
                                <input type='checkbox' name='checkbox' checked={item?.isChecked} onChange={e => handleCheckListChange(indx, e)} style={{ marginLeft: '10px' }} />
                                <input type='text' name='checkListValue' onChange={e => handleCheckListChange(indx, e)} value={item?.value} placeholder='Task to be done' className={Style.TaskInput} />
                            </div>
                            <div><button className={Style.DeleteBtn}><img onClick={e => handleRemoveTaskItem(indx, e)} src={delete1} alt='' /></button></div>
                        </div>
                    ))}

            </div>
            <div><button className={Style.AddCheckList} onClick={handleAddNewTaskItem}>+ Add New</button></div>
            <div className={Style.Btngrp}>
                <div><button name='dueDate' className={Style.Btn} onClick={e => { handleDueDate(e) }}>{selectedDate ? selectedDate : `Select Due Date`}</button></div>
                <div className={Style.SaveAndCancelBtn}>
                    <div><button onClick={handleCancelCreateTodo} className={Style.Btn} style={{ border: 'none', outline: '2px solid red' }}>Cancel</button></div>
                    <div><button onClick={handleCreateTodo} className={Style.Btn} style={{ border: 'none', backgroundColor: '#17A2B8', outline: '2px solid #17A2B8' }}>Save</button></div>
                </div>
            </div>
        </div>
    </>
    )
}