import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from "../SignInAndSignUp/SignUpFormComponent.module.css";
import profile from "../../assets/images/Profile.png";
import email from "../../assets/images/email.png";
import lock from "../../assets/images/lock.png";
import view from "../../assets/images/view.png";
import useUser from "../Hook/useUser";
import { toast } from 'react-toastify';
export default function SignUpFormComponent() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
const {handleRegisterUser}=useUser();

    const handleRegister = async () => {
        const res = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const fieldErrors = {};
        if (!userDetails?.name.trim()) {
            fieldErrors.name = "Name shouldn't be empty!";
        }
        if (!userDetails?.email.trim()) {
            fieldErrors.email = "Email shouldn't be empty!";
        }        
        if (userDetails?.email.trim() && !res.test(userDetails?.email)) {
            fieldErrors.email = "Email is not correct!";
        }
        if (!userDetails?.password.trim()) {
            fieldErrors.password = "Password shouldn't be empty!";
        }
        if (!userDetails?.confirmPassword.trim()) {
            fieldErrors.confirmPassword = "Confirm password shouldn't be empty!";
        }
        if (userDetails?.password.trim() !== userDetails?.confirmPassword.trim()) {
            fieldErrors.confirmPassword = "Confirm password doesn't match!";
        }

        if (Object.keys(fieldErrors).length > 0) {
            setFieldErrors(fieldErrors);
            return;
        }
        const data = {
            name: userDetails?.name,
            email: userDetails?.email,
            password: userDetails?.password,
        }        
        const result=await handleRegisterUser(data);                  
        if(result?.status===201){
            toast.success(result?.data?.message)            
            navigate('/login');
            return;
        }
        if(result?.status===409){
            toast.error(result?.data?.message)  
            return;          
        }
        toast.error("Something went wrong!")        
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleUserDetails = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    }

    const handleTogglePassword = (e) => {
        setShowPassword(!showPassword);
    }

    const handleToggleConfirmPassword = (e) => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    return (
        <div className={Style.SignUpForm}>
            <h1>Register</h1>          
            <div className={Style.Container}>
                <div className={Style.InputContainer}>
                    <img src={profile} alt="" />
                    <input
                        name='name'
                        className={Style.InputBox}
                        type='text'
                        placeholder="Name"
                        onChange={e => handleUserDetails(e)}
                        value={userDetails?.name}
                    />
                </div>
                {fieldErrors?.name ? <p className={Style.Error}>{fieldErrors?.name}</p> : ''}
                <div className={Style.InputContainer}>
                    <img style={{ paddingLeft: '7px' }} src={email} alt="" />
                    <input
                        name='email'
                        className={Style.InputBox}
                        style={{ paddingLeft: '10px' }}
                        type='text'
                        placeholder="Email"
                        onChange={e => handleUserDetails(e)}
                        value={userDetails?.email}
                    />
                </div>
                {fieldErrors?.email ? <p className={Style.Error}>{fieldErrors?.email}</p> : ''}
                <div className={Style.InputContainer}>
                    <img src={lock} alt="" />
                    <input
                        name='password'
                        className={Style.InputBox}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        onChange={e => handleUserDetails(e)}
                        value={userDetails?.password}
                    />
                    <img src={view} onClick={handleTogglePassword} alt='' />
                </div>
                {fieldErrors?.password ? <p className={Style.Error}>{fieldErrors?.password}</p> : ''}
                <div className={Style.InputContainer}>
                    <img src={lock} alt="" />
                    <input
                        name='confirmPassword'
                        className={Style.InputBox}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        onChange={e => handleUserDetails(e)}
                        value={userDetails?.confirmPassword}
                    /><img src={view} onClick={handleToggleConfirmPassword} alt='' />
                </div>
                {fieldErrors?.confirmPassword ? <p className={Style.Error}>{fieldErrors?.confirmPassword}</p> : ''}
            </div>            
            <button className={Style.Button} onClick={handleRegister}>Register</button>
            <p>Have an account?</p>
            <button className={Style.Btn} onClick={handleLogin}>Login</button>

        </div>
    )
}