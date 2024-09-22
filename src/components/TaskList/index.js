import "./index.css"

const TaskList = props=>{
    const {todoDetails,deleteTodo,toggleCheckbox,
        editMode,
        onChangeEditingTaskTitle,
        saveEditedTask,
        editingTaskId,
        editingTaskTitle} = props
    const {id, title, isChecked} = todoDetails

    const onDeleteTodo = () =>{
        deleteTodo(id)
        
    }

    const onToggleCheckbox = () => {
        toggleCheckbox(id);
      };

    const onClickEdit= ()=>{
        editMode(id,title)
    }
    const onClickSave = () =>{
        saveEditedTask(id)
    }

    const isCompleted = isChecked ? "checked" : ""
    
    return(
        <li className="todo-item">
            <input type="checkbox" className="checkbox-input" id="checkboxId" onChange={onToggleCheckbox} />
            <div className="label-container">
                {editingTaskId === id ? (
                    <>
                    <input type="text" value={editingTaskTitle} className="edit-input" onChange={onChangeEditingTaskTitle} />
                    <button type="button" className="save-btn" onClick={onClickSave}>Save</button>
                    </>
                    ) : (
                        <>
                            <label htmlFor="checkboxId" className={`${isCompleted} checkbox-label`}>{title}</label>
                            <button type="button" className="edit-btn" onClick={onClickEdit}>
                                <img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png" alt="edit task" 
                                className="edit-icon" />
                            </button>

                        </>
                    )   
                }
                
                <button type="button" className="button" onClick={onDeleteTodo}>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                    className="delete-logo"
                    alt="delete icon"
                />
                </button>
              
            </div>
            
        </li>
    )
}

export default TaskList