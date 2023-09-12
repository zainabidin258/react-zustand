import { useState } from 'react';
import styles from '@/styles/TodoItem.module.css';
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useTodosStore } from '@/store';


const TodoItem=({itemProp})=>{

  const handleChange = useTodosStore((state) => state.handleChange);
  const delTodo = useTodosStore((state) => state.delTodo);
  const setUpdate = useTodosStore((state) => state.setUpdate);

    const [updateInput,setUpdateInput]=useState(itemProp.title);
    const [editing,setEditing]=useState(false);
    const handleEditing=()=>{
        setEditing(true);
    }

    let viewMode={};
    let editMode={};
    
    if(editing){viewMode.display='none';}
    else{editMode.display='none';}

    const handleUpdateDone = (event) => {
        if (event.key === "Enter"){
            setUpdate(updateInput,itemProp.id);
            setEditing(false);
        }
    };

    const completedStyle = {
        fontStyle: 'italic',
        color: '#595959',
        opacity: 0.4,
        textDecoration: 'line-through',
      };

    return (
    
    <li className={styles.item}>
        <div className={styles.content} style={viewMode}>
        <input 
         type="checkbox" 
         checked={itemProp.completed} 
         onChange={()=>handleChange(itemProp.id)}/>

         <button onClick={handleEditing}>
            <AiFillEdit 
             style={{
                color: '#5e5e5e',
                fontSize: '20px',
              }}/></button>

         <button onClick={()=>delTodo(itemProp.id)}>
            <FaTrash
            style={{
                color: '#5e5e5e',
                fontSize: '16px',
              }}/>
         </button>

        <span style={itemProp.completed ? completedStyle : null}>
            {updateInput}
        </span>
        </div>
        <input
         type='text'
         value={updateInput}
         className={styles.textInput}
         style={editMode}
         onChange={(e)=>{setUpdateInput(e.target.value)}}

         onKeyDown={handleUpdateDone}
        />
    </li>

    );

};

export default TodoItem;