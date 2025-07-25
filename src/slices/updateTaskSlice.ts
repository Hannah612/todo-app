import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Input, Task } from "../scenes/shared/types";
import axios from 'axios'

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

export const updateTask = createAsyncThunk("tasks/updateTask", async (task: {id:number, body:Input}) => {
    try {
        const response = await axios.put("http://localhost:8080/tasks/" + task.id, task.body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Could not update task:", error);
        return error;
    }
})

const updateTaskSlice = createSlice({
    name: "UpdateTask",
    initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      });
  },

});

export default updateTaskSlice.reducer;