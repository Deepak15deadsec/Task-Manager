import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/UserSlice";
import taskSlice from "./Slice/TaskSlice";
export const store = configureStore({
    reducer: {        
        user:userSlice,
        task:taskSlice
    }
});