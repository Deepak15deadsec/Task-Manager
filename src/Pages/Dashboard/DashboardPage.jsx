import React, { useEffect, useState } from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import Style from "../Dashboard/DashboardPage.module.css";
import BoardPage from "../Board/BoardPage";
import AnalyticsPage from "../Analytics/AnalyticsPage";
import SettingPage from "../Settings/SettingPage";
import LogoutPopup from "../../Components/Logout/LogoutPopup";
import layout from "../../assets/images/layout.png";
import analytics from "../../assets/images/database.png";
import Settings from "../../assets/images/settings.png";
import layoutD from "../../assets/images/layoutD.png";
import analyticsD from "../../assets/images/databaseD.png";
import SettingsD from "../../assets/images/settingsD.png";
import proManage from "../../assets/images/codesandbox.png";
import logout from "../../assets/images/logout.png"

export default function DashboardPage() {
    const [isLogoutConfirmationPopupOpen,setIsLogoutConfirmationPopupOpen]=useState(false);
    const [clickedLink, setClickedLink]=useState('board');
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('board');
    },[]);

    const handleBoard = () => {
        setClickedLink('board')
        navigate('board');
        
    }

    const handleAnalytics = () => {
        setClickedLink('analytics')
        navigate('analytics');
    }

    const handleSetting = () => {
        setClickedLink('setting')
        navigate('setting');
    }

    const handleLogout=async()=>{        
        setIsLogoutConfirmationPopupOpen(true);
        
    }

  

    return (
        <div className={Style.Dashboard}>
            {isLogoutConfirmationPopupOpen&&<LogoutPopup
            setIsLogoutConfirmationPopupOpen={setIsLogoutConfirmationPopupOpen}/>}
            <div className={Style.Sidebar}>
                <div className={Style.SidebarLink}>
                    <div style={{margin:'10px 0px', color:'black'}}><span><img className={Style.Image} src={proManage} alt=""/></span>Pro Manage</div>
                    <div className={clickedLink==='board'?Style.ClickedLink:''} onClick={handleBoard}><span><img className={Style.Image} src={clickedLink==='board'?layoutD:layout} alt=""/></span>Board</div>
                    <div className={clickedLink==='analytics'?Style.ClickedLink:''} onClick={handleAnalytics}><span><img className={Style.Image} src={clickedLink==='analytics'?analyticsD:analytics} alt=""/></span>Analytics</div>
                    <div className={clickedLink==='setting'?Style.ClickedLink:''} onClick={handleSetting}><span><img className={Style.Image} src={clickedLink==='setting'?SettingsD:Settings} alt=""/></span>Setting</div>
                </div>
                <div className={Style.Logout}>
                    <div onClick={handleLogout}><span><img style={{marginBottom:'-5px', marginRight:'5px'}} src={logout} alt=""/></span>Log out</div>
                </div>
            </div>
            <Routes>
                <Route path="board" element={<BoardPage />} />
                <Route path='analytics' element={<AnalyticsPage />} />
                <Route path="setting" element={<SettingPage />} />
            </Routes>
        </div>

    )
}