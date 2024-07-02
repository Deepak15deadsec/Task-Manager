import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTasks: null,
    isGetAllTasksLoading: false,
    getAllTasksError:null,

    createdTask:null,
    isCreateTaskLoading: false,    
    createTaskError: null,

    taskById:null,
    isTaskByIdLoading:false,
    taskByIdError:null,

    taskDetails:null,
    isGetTaskDetailsLoading:false,    
    getTaskDetailsError:null,

 

};

const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers: {
        // Get All Tasks
        startGetAllTasksLoading: (state) => {
            state.isGetAllTasksLoading = true;
            state.getAllTasksError = null;
        },
        getAllTaskSuccess: (state, { payload }) => {
            state.isGetAllTasksLoading = false;                     
            state.allTasks = payload;
            state.getAllTasksError=null;
        },
        getAllTasksError: (state, { payload }) => {
            state.isGetAllTasksLoading = false;
            state.getAllTasksError = payload;
        },
        
        // Create Task
        startCreateTaskLoading: (state) => {
            state.isCreateTaskLoading = true;
            state.createTaskError = null;
        },
        createTaskSuccess: (state,{payload}) => {
            state.isCreateTaskLoading = false;
            state.createdTask=payload;
            
        },
        createTaskError: (state, { payload }) => {
            state.isCreateTaskLoading = false;
            state.createTaskError = payload;
        },

        //Get task by taskId
        startTaskByIdLoading: (state) => {
            state.isTaskByIdLoading = true;
            state.taskByIdError = null;
        },
        taskByIdSuccess: (state,{payload}) => {
            state.isTaskByIdLoading = false;
            state.taskById=payload
            state.taskByIdError=null;
            
        },
        taskByIdError: (state, { payload }) => {
            state.isTaskByIdLoading = true;
            state.taskByIdError = payload;
        },

        // Get tasks details
        startGetTasksDetailsLoading: (state) => {
            state.isGetTaskDetailsLoading = true;
            state.getTaskDetailsError = null;
        },
        getTasksDetailsSuccess: (state, { payload }) => {
            state.isGetTaskDetailsLoading = false;                     
            state.taskDetails = payload;
            state.getTaskDetailsError=null;
        },
        getTasksDetailsError: (state, { payload }) => {
            state.isGetTaskDetailsLoading = false;
            state.getTaskDetailsError = payload;
        },
     
    }
});

export default taskSlice.reducer;

export const {
    startGetAllTasksLoading,
    getAllTaskSuccess,
    getAllTasksError,
    
    startGetTasksDetailsLoading,
    getTasksDetailsSuccess,
    getTasksDetailsError,
    startCreateTaskLoading,
    createTaskSuccess,
    createTaskError,
    startTaskByIdLoading,
    taskByIdSuccess,
    taskByIdError,
}=taskSlice.actions;