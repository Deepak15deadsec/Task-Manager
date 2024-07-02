import React from "react";
import Style from '../AddPeople/AddEmailConfirmationPopup.module.css';

export default function AddEmailConfirmationPopup(
    { setIsAddEmailConfirmationPopupOpen,
        setIsAddPeoplePopupOpen,
        email
    }) {

    const handleConfirm = () => {
        setIsAddEmailConfirmationPopupOpen(false);
        setIsAddPeoplePopupOpen(false);
    }

    return (
        <div className={Style.Container}>
            <div style={{ fontSize: '18px', fontWeight: '400', marginBottom: '10px' }}>{email} added to board</div>
            <div><button onClick={handleConfirm} className={Style.Button}>Okey, got it!</button></div>
        </div>
    )
}