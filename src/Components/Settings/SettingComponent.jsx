import React,{useState} from "react";
import Style from "../Settings/SettingComponent.module.css";
import profile from "../../assets/images/Profile.png";
import email from "../../assets/images/email.png";
import lock from "../../assets/images/lock.png";
import view from "../../assets/images/view.png";
export default function SettingComponent() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        oldPassword: '',
        newPassword: ''
    });

    const handleUserDetails = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    }

    const handleToggleOldPassword = (e) => {
        setShowOldPassword(!showOldPassword);
    }

    const handleToggleNewPassword = (e) => {
        setShowNewPassword(!showNewPassword);
    }

    const handleUpdateUserDetails=()=>{
        console.log(userDetails);
    }
    return (
        <div className={Style.Container}>
            <div className={Style.InputContainer}>
                <img src={profile} alt="" />
                <input
                    className={Style.InputBox}
                    type='text'
                    placeholder="Name"
                    name='name'
                    value={userDetails?.name}
                    onChange={e => handleUserDetails(e)}
                />
            </div>
            <div className={Style.InputContainer}>
                <img style={{ paddingLeft: '7px' }} src={email} alt="" />
                <input
                    className={Style.InputBox}
                    style={{ paddingLeft: '10px' }}
                    type='text'
                    placeholder="Update Email"
                    name='email'
                    value={userDetails?.email}
                    onChange={e => handleUserDetails(e)}
                />
            </div>
            <div className={Style.InputContainer}>
                <img src={lock} alt="" />
                <input
                    className={Style.InputBox}
                    type={showOldPassword?'text':'password'}
                    placeholder="Old Password"
                    name='oldPassword'
                    value={userDetails?.oldPassword}
                    onChange={e => handleUserDetails(e)}
                />
                <img src={view} onClick={handleToggleOldPassword} alt='' />
            </div>
            <div className={Style.InputContainer}>
                <img src={lock} alt="" />
                <input
                    className={Style.InputBox}
                    type={showNewPassword?'text':'password'}
                    placeholder="New Password"
                    name='newPassword'
                    value={userDetails?.newPassword}
                    onChange={e => handleUserDetails(e)}
                /><img src={view} onClick={handleToggleNewPassword} alt='' />
            </div>
            <div><button onClick={handleUpdateUserDetails} className={Style.Button}>Update</button></div>
        </div>
    )
}