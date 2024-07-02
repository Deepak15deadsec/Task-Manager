import React, { useEffect } from 'react';
import Style from "../Analytics/AnalyticsComponent.module.css";
import useTask from '../Hook/useTask';
import { useSelector } from 'react-redux';
export default function AnalyticsComponent() {
    const { handleGetTaskDetails } = useTask();
    const { taskDetails } = useSelector(state => state.task);    
    useEffect(() => {
        const initial = async () => {
            await handleGetTaskDetails();
        }
        initial();
    }, []);

    return (
        <div className={Style.Container}>
            <div className={Style.Card}>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>Backlog Tasks</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byCurrentStatus?.BACKLOG}</div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>To do Tasks</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byCurrentStatus?.TODO}</div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>In Progress Tasks</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byCurrentStatus?.INPROGRESS}</div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>Completed Tasks</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byCurrentStatus?.DONE}</div>
                </div>
            </div>
            <div className={Style.Card}>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>Low Priority</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byPriority?.LOW_PRIORITY}</div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>Moderate Priority</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byPriority?.MODERATE_PRIORITY}</div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>High Priority</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.byPriority?.HIGH_PRIORITY}</div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.Tasks}>
                        <div className={Style.Circel}></div>
                        <div>Due Date Tasks</div>
                    </div>
                    <div>{taskDetails?.tasks[0]?.dueCount}</div>
                </div>
            </div>
        </div>
    )
}