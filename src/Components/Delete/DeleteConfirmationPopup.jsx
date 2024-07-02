import React from "react";
import Style from "../Delete/DeleteConfirmationPopup.module.css";
import useTask from "../Hook/useTask";
export default function DeleteConfirmationPopup({ setIsOpenDeletePopup,taskId }) {
    const { handleDeleteTaskById } = useTask();
    const handleCancelDeletePopup = () => {
        setIsOpenDeletePopup(false);
    }

    const handleDeleteTodo = async () => {
        await handleDeleteTaskById(taskId);
    }

    return (
        <div className={Style.Container}>
            <div style={{ marginBottom: '20px' }}>Are you sure you want to Delete?</div>
            <div><button onClick={handleDeleteTodo} style={{ marginBottom: '10px', color: '#fff', backgroundColor: '#17A2B8' }} className={Style.Btn}>Yes, Delete</button></div>
            <div><button onClick={handleCancelDeletePopup} style={{ marginBottom: '10px', color: 'red', backgroundColor: '#fff', border: '2px solid red' }} className={Style.Btn}>Cancel</button></div>
        </div>
    )
}