import React,{useEffect} from "react";
import Style from "../Logout/LogoutPopup.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useUser from "../Hook/useUser";
import { removeStorage } from "../../Service/StorageService";
import { toast } from "react-toastify";

export default function LogoutPopup({setIsLogoutConfirmationPopupOpen}){
    const navigate=useNavigate();
    const {handleLogoutUser}=useUser();
    const { userData } = useSelector((state) => state.user);
    const handleCancelLogoutPopup=()=>{
        setIsLogoutConfirmationPopupOpen(false);
    }

    const handleLogoutPopup=async ()=>{        
        setIsLogoutConfirmationPopupOpen(false);
        await handleLogoutUser();
        removeStorage("accessToken");
        removeStorage("user");        
        navigate('/'); 
        toast.success('User logout successfully!');        
    }

    // useEffect(() => {
    //     console.log(userData)
    //     const initial = () => {
    //         if (userData?.isLogout) {                 
    //             removeStorage("accessToken");
    //             removeStorage("user");               
    //             navigate('/');                
    //         }
    //     }       
    //         initial();
    // }, [userData]);

    return(
        <div className={Style.Container}>
            <div style={{marginBottom:'20px'}}>Are you sure you want to Logout?</div>
            <div><button onClick={handleLogoutPopup} style={{marginBottom:'10px', color:'#fff', backgroundColor:'#17A2B8'}} className={Style.Btn}>Yes, Logout</button></div>
            <div><button onClick={handleCancelLogoutPopup} style={{marginBottom:'10px', color:'red', backgroundColor:'#fff', border:'2px solid red'}} className={Style.Btn}>Cancel</button></div>
        </div>
    )
}