import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todo-slice/todoSlice';

export const store = configureStore({
    reducer : {
       todoData : todoReducer
    }
})