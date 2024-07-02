import { useDispatch } from "react-redux";
import {startGetAllTasksLoading,
    getAllTaskSuccess,
    getAllTasksError,
    startCreateTaskLoading,
    createTaskSuccess,
    createTaskError,
    startTaskByIdLoading,
    taskByIdSuccess,
    taskByIdError,    
    getTasksDetailsError,
    startGetTasksDetailsLoading,
    getTasksDetailsSuccess,
    } from "../../Store/Slice/TaskSlice";

import { createTask } from "../../Service/task/createTask";
import { deleteTasksById } from "../../Service/task/deleteTaskById";
import { getAllTasks } from "../../Service/task/getAllTasks";
import { getTaskById } from "../../Service/task/getTaskById";
import { getTasksAnalytics } from "../../Service/task/getTasksAnalytics";
import { updateTask } from "../../Service/task/updateTask";
import { getAllTaskByDate } from "../../Service/task/getAllTaskByDate";

    const useTask = () => {
        const dispatch = useDispatch();
        
        const handleGetAllTasks = async () => {
            try {
                dispatch(startGetAllTasksLoading());                
                const res = await getAllTasks();                           
                dispatch(getAllTaskSuccess(res.data));                                            
            } catch (error) {              
                dispatch(getAllTasksError(error));                
            }
        };

        const handleGetAllTaskByDate = async (date) => {
          try {
              dispatch(startGetAllTasksLoading());                
              const res = await getAllTaskByDate(date);                           
              dispatch(getAllTaskSuccess(res.data));                                            
          } catch (error) {              
              dispatch(getAllTasksError(error));                
          }
      };
    
        const handleDeleteTaskById = async (taskId) => {
             try {             
               const res = await deleteTasksById(taskId); 
               await handleGetAllTasks();             
               return res.data;                                   
             } catch (error) {            
               return error;
             }
          };

          const handleCreateTask = async (data) => {
            try {
              dispatch(startCreateTaskLoading());
              const res = await createTask(data);
              await handleGetAllTasks();
              dispatch(createTaskSuccess(res.data));

            } catch (error) {
              dispatch(createTaskError(error));
            }
          };

          const handleGetTaskById=async (taskId)=>{
            try{
                dispatch(startTaskByIdLoading());
                const res=await getTaskById(taskId);
                dispatch(taskByIdSuccess(res.data));
            }catch(error){
                dispatch(taskByIdError(error))
            }
          }

          const handleGetTaskDetails=async()=>{
            try{
              dispatch(startGetTasksDetailsLoading());
              const res=await getTasksAnalytics();
              dispatch(getTasksDetailsSuccess(res.data));
            }catch(error){
              dispatch(getTasksDetailsError(error))
            }
          }

          const handleUpdateTask=async(taskId,data)=>{
            try{
              const res=await updateTask(taskId,data);
              await handleGetAllTasks();
              return res.data;
            }catch(error){
              return error;
            }
          }
          
        return{
          handleGetAllTasks,
          handleGetAllTaskByDate,
            handleDeleteTaskById,
            handleCreateTask,
            handleGetTaskById,                       
            handleGetTaskDetails,
            handleUpdateTask,
        };
    }
    export default useTask;