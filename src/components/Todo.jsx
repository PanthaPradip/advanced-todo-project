import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo} from '../store/todo-slice/todoSlice';

function AddTodo() {

    const todos = useSelector(state=>state.todoData.todos);
    const dispatch = useDispatch();

    const [input, setInput] = useState('')
    const [editId, setEditId] = useState(null);

    const addTodoHandler = (e)=>{
        e.preventDefault();
        if(input=='') return;
        
        if(editId) {
            dispatch(updateTodo({id:editId, text:input}));
            setEditId(null);
        }
        else {
            dispatch(addTodo(input));
        }

        setInput('');
    }
    
    const handleDelete =(id)=>{
        dispatch(removeTodo(id));
    }

    const handleEdit =(todo)=>{
        setInput(todo.text);
        setEditId(todo.id);
    }

    const [selectedValue, setSelectedValue] = useState({});

    const handleDropDown =(e,id)=>{
        const option = e.target.value;
        setSelectedValue(prev => ({ ...prev, [id]: option }));
    }
    

    const [rangeValue, setRangeValue] = useState({});
    const handleRange = (e,id)=>{
        const value = e.target.value;
        setRangeValue(prev=>({...prev,[id]:value}));
    }


    const [modifyId, setModifyId] = useState(null);
    const handleModify=(id)=>{
        setModifyId(id);
    }




  return (
    <div className='bg-slate-600 min-h-screen w-full flex flex-col justify-start items-center gap-6'>



        <div className='w-[40vw] mt-20 relative'>
            <form onSubmit={addTodoHandler}>
                <input className='bg-zinc-300 py-3 pl-6 pr-28 w-full focus:outline-none rounded-md focus:bg-zinc-50' 
                type='text'
                placeholder='Enter a todo ...'
                value={input}
                onChange={(e)=>setInput(e.target.value)}/>

                <button type='submit' className='absolute bg-zinc-700 px-6 py-2 rounded-md right-2 top-1 text-white hover:bg-zinc-600 transition-all ease-in duration-150'>Add</button> 
            </form>
        </div> 



        <div className='flex flex-col gap-5 relative'>
            {todos.map((todo)=>
            <div key={todo.id} className='flex bg-[#F5EFFF] gap-10 w-[40vw] px-4 py-6 rounded-md relative' >
                
                
        <div className='flex-1'>
                <div className='flex flex-col gap-2'>
                <a className='mb-2 ml-24 text-zinc-500'>{(todo.time).toLocaleString()}</a>

                <a className={`break-words whitespace-normal 
                
                ${rangeValue[todo.id] === '2' ? 'text-sm' :
                    rangeValue[todo.id] === '3' ? 'text-md' :
                    rangeValue[todo.id] === '4' ? 'text-lg' :
                    rangeValue[todo.id] === '5' ? 'text-xl' :
                    rangeValue[todo.id] === '6' ? 'text-2xl' :
                    rangeValue[todo.id] === '7' ? 'text-3xl' : ''}

                    ${
                    selectedValue[todo.id] === 'uppercase' ? 'uppercase' : 
                    selectedValue[todo.id] === 'lowercase' ? 'lowercase' : 
                    selectedValue[todo.id] === 'capitalize' ? 'capitalize' : 
                    selectedValue[todo.id] === 'fontnormal' ? 'font-normal' : 
                    selectedValue[todo.id] === 'fontbold' ? 'font-bold' : 
                    selectedValue[todo.id] === 'fontlight' ? 'font-light' :
                   ''}
                    `}>
                        {todo.text}
                </a>
            </div>
        </div>
                
            
                
                

                <button onClick={()=>handleDelete(todo.id)} className='bg-cyan-600 px-4 py-2 rounded-md text-white hover:bg-cyan-700 transition-all ease-in duration-150 w-[5rem] h-[2rem] flex items-center justify-center'>Delete</button>



                <button onClick={()=>handleEdit(todo)} className='bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition-all ease-in duration-150 flex items-center justify-center w-[5rem] h-[2rem]'>Edit</button>
                
                <select className={`rounded-sm absolute bg-red-400 px-6 py-1 top-0 right-[-10rem] cursor-pointer ${modifyId == todo.id ? 'opacity-100' : 'opacity-0 '} 
                `} 

                    
                    onChange={(e)=>handleDropDown(e, todo.id)}>

                    <option disabled>Modify</option>
                    <option value='uppercase'>Uppercase</option>
                    <option value='lowercase'>Lowercase</option>
                    <option value='capitalize'>Capitalize</option>
                    <option value='fontlight'>Font Light</option>
                    <option value='fontbold'>Font Bold</option>
                    <option value='fontnormal'>Font Normal</option>
                </select>

                <input 
                    type='range'
                    min='2'
                    max='7'
                    step='1'
                    defaultValue={3} 
                    className='absolute text-blue-700 right-5 top-20'
                    onChange={(e)=>handleRange(e,todo.id)}
                    />

                <div className='text-sm absolute bg-yellow-400 px-4 py-1 rounded-md cursor-pointer' onClick={()=>handleModify(todo.id)}>
                    <p>Modify</p>
                </div>
               
            </div>)}
        </div>
   
    </div>
  )
}

export default AddTodo;