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

export const postTask = createAsyncThunk("tasks/postTasks", async (task: Input) => {
    try {
        const response = await axios.post("http://localhost:8080/tasks", task, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Could not add task:", error);
       return error
    }
})

const postTaskSlice = createSlice({
    name: "PostTask",
    initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTask.fulfilled, (state) => {
        state.loading = false;
        console.log("post tasks fullfiled");
      })
      .addCase(postTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add tasks";
      });
  },

});

//actions 
export default postTaskSlice.reducer;