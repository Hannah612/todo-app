import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { OrderType, SortType, Task } from "../scenes/shared/types";
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

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (filtersOrSort: {sortBy:SortType, order:OrderType}) => {
    try {
        const response = await axios.get("http://localhost:8080/tasks/sort/" + filtersOrSort.sortBy + "/" + filtersOrSort.order, {
            headers: {
            "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Could not retrieve data:", error);
    }
})

//searching and fetching tasks with sort/filtering 
// - maybe make fetchTasks able to do all 3 things, url = "/task/search?q={q}?filter=?sort?"
export const searchTasks = createAsyncThunk("tasks/searchTasks", async (url: string) => {
    try {
        const response = await axios.get("http://localhost:8080/tasks/search?q=" + url, {
            headers: {
            "Content-Type": "application/json",
            },
        });
        console.log(url);
        return response.data;
    } catch (error) {
        console.error("Could not retrieve data:", error);
    }
})

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
      })

      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },

});

export default taskSlice.reducer;