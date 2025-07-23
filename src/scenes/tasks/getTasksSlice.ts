import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../shared/types";
import axios from 'axios'
//Get Tasks from server

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



//just a dummy json post, to show how requests can be made 
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    // await fetch('http://localhost:8080/tasks', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));

    try {
        const response = await axios.get("http://localhost:8080/tasks", {
            headers: {
            "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Could not retrieve data:", error);
    }
})

//store = db, slice = table for db
const taskSlice = createSlice({
    name: "GetTasks",
    initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },

});

//actions 
export default taskSlice.reducer;