import React from 'react';
import Style from "../SignInAndSignUp/SignUpPage.module.css"
import logo from "../../assets/images/logo.png"
import SignUpFormComponent from '../../Components/SignInAndSignUp/SignUpFormComponent';
export default function SignUpPage() {

    return (
        <div className={Style.Container}>
            <div className={Style.SignUpContainer}>
                <img src={logo} alt="logo" />
                <h1>Welcome aboard my friend</h1>
                <p>just a couple of clicks and we start</p>
            </div>
            <div className={Style.SignUp}>
                <SignUpFormComponent/>
            </div>
        </div>
    )
}