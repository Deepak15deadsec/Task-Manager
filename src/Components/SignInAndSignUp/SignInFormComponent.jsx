import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from "../SignInAndSignUp/SignInFormComponent.module.css"
import email from "../../assets/images/email.png";
import lock from "../../assets/images/lock.png";
import view from "../../assets/images/view.png";
import useUser from '../Hook/useUser';
import { toast } from 'react-toastify';
import { setStorage } from '../../Service/StorageService';
import { useSelector } from 'react-redux';
export default function SignInFormComponent() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
    });

    const {handleLoginUser} =useUser();
    const {userData}=useSelector(state=>state.user);
    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogin = async () => {
        const res = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const fieldErrors = {};
        if (!userDetails?.email.trim()) {
            fieldErrors.email = "Email shouldn't be empty!";
        }
        if (userDetails?.email.trim() && !res.test(userDetails?.email)) {
            fieldErrors.email = "Email is not correct!";
        }
        if (!userDetails?.password.trim()) {
            fieldErrors.password = "Password shouldn't be empty!";
        }

        if (Object.keys(fieldErrors).length > 0) {
            setFieldErrors(fieldErrors);
            return;
        }
        const data = {
            email: userDetails?.email,
            password: userDetails?.password,
        }
        
        const result = await handleLoginUser(data);
        if (result?.status === 200) {
            toast.success('Logged-In successfully!')
            navigate('/dashboard');
            return;
        }
        if (result.status === 404) {
            toast.error(result?.data?.message)
            return;
        }
        toast.error("Something went wrong!");
        
    }

    useEffect(() => {
        const initial = () => {
            if (userData?.isLoggedIn) {                
                setStorage("accessToken", JSON.stringify(userData.accessToken));
                setStorage("user", JSON.stringify(userData.user));                           
            }
        }
        if (userData)
            initial();
    }, [userData]);

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

    return (
        <div className={Style.SignInForm}>
            <h1>Login</h1>
            <div className={Style.Container}>
                <div className={Style.InputContainer}>
                    <img style={{ paddingLeft: '7px' }} src={email} alt="" />
                    <input
                        className={Style.InputBox}
                        style={{ paddingLeft: '10px' }}
                        type='text'
                        placeholder="Email"
                        name='email'
                        value={userDetails.email}
                        onChange={handleUserDetails}
                    />
                </div>
                {fieldErrors?.email ? <p className={Style.Error}>{fieldErrors?.email}</p> : ''}
                <div className={Style.InputContainer}>
                    <img src={lock} alt="" />
                    <input
                        className={Style.InputBox}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name='password'
                        value={userDetails.password}
                        onChange={handleUserDetails}
                    /><img onClick={handleTogglePassword} src={view} alt='' />
                </div>
                {fieldErrors?.password ? <p className={Style.Error}>{fieldErrors?.password}</p> : ''}
            </div>
            <button className={Style.Button} onClick={handleLogin}>Log In</button>
            <p>Have no account yet?</p>
            <button className={Style.Btn} onClick={handleRegister}>Register</button>
        </div>
    )
}