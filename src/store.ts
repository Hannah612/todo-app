import { configureStore } from "@reduxjs/toolkit";
import getTasksSlice from "./slices/getTasksSlice.ts";
import postTaskSlice from "./slices/postTaskSlice.ts";
import removeTasksSlice from "./slices/removeTaskSlice.ts";
import updateTaskSlice from "./slices/updateTaskSlice.ts";
//store for redux

export const store = configureStore({
  reducer: {
    tasks: getTasksSlice,
    postTask: postTaskSlice,
    removeTask: removeTasksSlice,
    updateTask: updateTaskSlice,
  },
});



export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
