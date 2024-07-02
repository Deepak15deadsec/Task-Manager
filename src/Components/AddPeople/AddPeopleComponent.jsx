import React, { useState } from "react";
import Style from "../AddPeople/AddPeopleComponent.module.css";
import AddEmailConfirmationPopup from "./AddEmailConfirmationPopup";
import useUser from "../Hook/useUser";
export default function AddPeopleComponent({setIsAddPeoplePopupOpen}){
    const [isAddEmailConfirmationPopupOpen,setIsAddEmailConfirmationPopupOpen]=useState(false);
    const [fieldErrors, setFieldErrors] = useState();
    const {handleCreateEmails}=useUser();
    const [userDetails, setUserDetails] = useState({
        email: '',
        
    });
    const handleCancelAddPeople=()=>{
        setIsAddPeoplePopupOpen(false);
    }

    const handleAddEmail=async()=>{
        const res = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const fieldErrors = {};
        if (!userDetails?.email.trim()) {
            fieldErrors.email = "Email shouldn't be empty!";
        }
        if (userDetails?.email.trim() && !res.test(userDetails?.email)) {
            fieldErrors.email = "Email is not correct!";
        }
       
        if (Object.keys(fieldErrors).length > 0) {
            setFieldErrors(fieldErrors);
            return;
        }
        //console.log(userDetails?.email)
        const data={email:userDetails?.email}
        await handleCreateEmails(data)
        setIsAddEmailConfirmationPopupOpen(true);        
    }

    const handleUserDetails = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    }

    return(
        <div className={Style.Container}>
            {isAddEmailConfirmationPopupOpen&&<AddEmailConfirmationPopup
            setIsAddEmailConfirmationPopupOpen={setIsAddEmailConfirmationPopupOpen}
            setIsAddPeoplePopupOpen={setIsAddPeoplePopupOpen}
            email={userDetails?.email}
            />}
            <div style={{fontSize:'20px', fontWeight:'400', marginBottom:'7px'}}>Add people to the board</div>
            <div><input 
            className={Style.Inputbox} 
            placeholder='Enter the email' 
            type="text"
            name='email'
            value={userDetails?.email}
            onChange={e=>handleUserDetails(e)}
            />
            </div>
            {fieldErrors?.email ? <p className={Style.Error}>{fieldErrors?.email}</p> : ''}
            <div className={Style.Btn}>
                <button className={Style.Button} style={{border:'2px solid red',color:'red', fontWeight:'400', backgroundColor:'#fff'}} onClick={handleCancelAddPeople}>Cancel</button>
                <button className={Style.Button} style={{border:'none',color:'#fff', fontWeight:'400', backgroundColor:'#17A2B8'}} onClick={handleAddEmail}>Add Email</button>
            </div>
        </div>
    )
}