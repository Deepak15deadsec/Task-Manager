import React from "react";
import Style from "../Settings/SettingPage.module.css"
import SettingComponent from "../../Components/Settings/SettingComponent";

export default function SettingPage(){

    return(
        <div className={Style.Container}>
        <div style={{ fontSize: '28px', fontWeight: '600', marginRight: '10px', marginBottom:'10px' }}>Settings</div>
        <div>
            <SettingComponent/>
        </div>
        </div>
    )
};