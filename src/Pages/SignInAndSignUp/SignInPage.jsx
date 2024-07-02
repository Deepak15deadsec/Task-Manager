import React from 'react';
import Style from "../SignInAndSignUp/SignInPage.module.css"
import logo from "../../assets/images/logo.png"
import SignInFormComponent from '../../Components/SignInAndSignUp/SignInFormComponent';
export default function SignInPage() {

    return (
        <div className={Style.Container}>
            <div className={Style.SignInContainer}>
                <img src={logo} alt="logo" />
                <h1>Welcome aboard my friend</h1>
                <p style={{marginTop:'-10px'}}>just a couple of clicks and we start</p>
            </div>
            <div className={Style.SignIn}>
                <SignInFormComponent/>
            </div>
        </div>
    )
}