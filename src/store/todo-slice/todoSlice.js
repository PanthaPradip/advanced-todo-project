import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todos : []
}

const loadTodosFromLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const todoSlice = createSlice({
    name : 'Todos',
    initialState : {
        todos: loadTodosFromLocalStorage()
    },
    reducers : {
        addTodo : (state,action)=>{
            const todo = {
                id:Date.now(),
                time: new Date(),
                text:action.payload
            }
            state.todos.push(todo);
            saveTodosToLocalStorage(state.todos);
        },
        removeTodo : (state,action)=>{
            state.todos = state.todos.filter(todo=>todo.id !== action.payload);
            saveTodosToLocalStorage(state.todos);
        },
        updateTodo : (state,action)=>{
            const {id, text} = action.payload;
            const todoIndex = state.todos.findIndex(todo=>todo.id===id);
            state.todos[todoIndex].text = text;
            saveTodosToLocalStorage(state.todos);
        }
    }
})


export const {addTodo,removeTodo, updateTodo} = todoSlice.actions;
export default todoSlice.reducer