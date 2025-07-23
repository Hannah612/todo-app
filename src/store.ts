import { configureStore } from "@reduxjs/toolkit";
import getTasksSlice from "../src/scenes/tasks/getTasksSlice.ts";
//store for redux

export const store = configureStore({
  reducer: {
    tasks: getTasksSlice,
  },
});



export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;