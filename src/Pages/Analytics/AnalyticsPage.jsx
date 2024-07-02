import React from "react";
import Style from "../Analytics/AnalyticsPage.module.css"
import AnalyticsComponent from "../../Components/Analytics/AnalyticsComponent";

export default function AnalyticsPage(){

    return(
        <div className={Style.Container}>
        <div style={{ fontSize: '28px', fontWeight: '600', marginRight: '10px' }}>Analytics</div>
        <div>
            <AnalyticsComponent/>
        </div>
        </div>
    )
};