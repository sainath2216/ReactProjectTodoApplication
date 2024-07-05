import {Component} from "react"
import {v4} from 'uuid'
import './index.css'
import TaskList from "../TaskList"

class TaskInput extends Component{
    state = {todoList : [],
        taskInput: "",
        editingTaskTitle: "",
        editingTaskId: null,
        
    }

    componentDidMount(){
        const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
        if(savedTodoList){
            this.setState({todoList: savedTodoList})
        }
    }

    componentDidUpdate(prevState){
        if(prevState.todoList !== this.state.todoList){
            localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        }
    }

    toggleCheckbox = id =>{
        this.setState(prevState=>({
            todoList: prevState.todoList.map(eachTodo =>{
                if(eachTodo.id === id){
                    return{...eachTodo, isChecked: !eachTodo.isChecked}
                }
                return eachTodo
            })
        }))
    }
    onAddTask = event =>{
        event.preventDefault()
        const {taskInput} = this.state

        const newTask = {
            id: v4(),
            title: taskInput,
            isChecked: false,
        }
        this.setState(prevState=>({
            todoList: [...prevState.todoList, newTask],
            taskInput: "",
        }))
    } 
    onChangeTittle= event =>{
        this.setState({taskInput: event.target.value})
    }

    deleteTodo = id =>{
        const {todoList} = this.state
        const updateTodoList = todoList.filter(eachTodo => eachTodo.id !== id )

        this.setState({
            todoList: updateTodoList,
        })
    }
    editMode= (id,title) =>{
        this.setState({
            editingTaskId: id,
            editingTaskTitle: title
        })
    }
    onChangeEditingTaskTitle= event=>{
        this.setState({editingTaskTitle: event.target.value})
    }
    saveEditedTask=id=>{
        const {editingTaskTitle,todoList} = this.state
        this.setState({
            todoList: todoList.map(eachTodoId => {
                if(eachTodoId.id === id){
                    return{...eachTodoId, title: editingTaskTitle }
                }
                return eachTodoId
            }),
            editingTaskId : null,
            editingTaskTitle: ""
        })
    }

    render(){
        const {todoList, taskInput, editingTaskTitle, editingTaskId} = this.state
        return(
            <div className="app-container">
                <div className="card-container">
                    <div className="task-container">
                        <h1 className="My-heading">My <span className="to-do-heading">To-Do List</span> </h1>
                        <div className="add-task-container">
                            <form className="form" onSubmit={this.onAddTask}>
                                <label htmlFor="task" className="label">
                                    <span className="create-heading">Create</span> Task
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Task"
                                    id="task"
                                    className="input"
                                    value={taskInput}
                                    onChange={this.onChangeTittle}
                                />
                                <button type="submit" className="button-btn">Add</button>
                                
                            </form>
                            <img
                                src="https://th.bing.com/th/id/OIP.0aRkG7SSk6ziGRrjkgPRfwAAAA?w=163&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                                alt="todoimage"
                                className="img"
                            />
                        </div>
                        <hr className="line"/>
                        <h1 className="my-task-heading"><span  className="my-heading">My</span> Tasks</h1>
                        <ul className="todo-list">
                        {todoList.map(todoDetails=>(
                            <TaskList 
                            key = {todoDetails.id}
                            todoDetails = {todoDetails}
                            deleteTodo={this.deleteTodo}
                            toggleCheckbox={this.toggleCheckbox}
                            editMode={this.editMode}
                            onChangeEditingTaskTitle={this.onChangeEditingTaskTitle}
                            saveEditedTask={this.saveEditedTask}
                            editingTaskId={editingTaskId}
                            editingTaskTitle={editingTaskTitle}
                            />
                        ))}
                        </ul>
                        
                    </div>    
                </div>
            </div>
        )
    }
}

export default TaskInput
