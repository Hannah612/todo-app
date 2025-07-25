import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Input, Task } from "../scenes/shared/types";
import axios from 'axios'
//post a task to server

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const removeTasks = createAsyncThunk("tasks/removeTasks", async (tasks: Record<string, string>[]) => {
    try {
        const response = await axios.post("http://localhost:8080/tasks/delete-multiple-tasks", tasks, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Could not remove task(s):", error);
        return error;
    }
})

const removeTasksSlice = createSlice({
    name: "RemoveTasks",
    initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTasks.fulfilled, (state) => {
        state.loading = false;
        console.log("remove tasks fullfiled");
      })
      .addCase(removeTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove task(s)";
      });
  },

});

//actions 
export default removeTasksSlice.reducer;