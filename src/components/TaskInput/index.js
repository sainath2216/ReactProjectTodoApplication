import { Component } from "react";
import { v4 } from "uuid";
import { withRouter } from "react-router-dom"; // Import withRouter
import Cookies from "js-cookie";
import "./index.css";
import TaskList from "../TaskList";

class TaskInput extends Component {
  state = {
    todoList: [],
    taskInput: "",
    editingTaskTitle: "",
    editingTaskId: null,
  };

  componentDidMount() {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodoList) {
      this.setState({ todoList: savedTodoList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoList !== this.state.todoList) {
      localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
    }
  }

  toggleCheckbox = (id) => {
    this.setState((prevState) => ({
      todoList: prevState.todoList.map((eachTodo) => {
        if (eachTodo.id === id) {
          return { ...eachTodo, isChecked: !eachTodo.isChecked };
        }
        return eachTodo;
      }),
    }));
  };

  onAddTask = (event) => {
    event.preventDefault();
    const { taskInput } = this.state;
    if (taskInput === "") {
      alert("Task cannot be empty!");
      return;
    }

    const newTask = {
      id: v4(),
      title: taskInput,
      isChecked: false,
    };
    this.setState((prevState) => ({
      todoList: [...prevState.todoList, newTask],
      taskInput: "",
    }));
  };

  onChangeTittle = (event) => {
    this.setState({ taskInput: event.target.value });
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const updatedTodoList = todoList.filter((eachTodo) => eachTodo.id !== id);

    this.setState({
      todoList: updatedTodoList,
    });
  };

  editMode = (id, title) => {
    this.setState({
      editingTaskId: id,
      editingTaskTitle: title,
    });
  };

  onChangeEditingTaskTitle = (event) => {
    this.setState({ editingTaskTitle: event.target.value });
  };

  saveEditedTask = (id) => {
    const { editingTaskTitle, todoList } = this.state;
    this.setState({
      todoList: todoList.map((eachTodoId) => {
        if (eachTodoId.id === id) {
          return { ...eachTodoId, title: editingTaskTitle };
        }
        return eachTodoId;
      }),
      editingTaskId: null,
      editingTaskTitle: "",
    });
  };

  handleSignOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/')// Redirect to the root path
  };

  render() {
    const { todoList, taskInput, editingTaskTitle, editingTaskId } = this.state;

    return (
      <div className="app-container">
        <div className="card-container">
          <div className="task-container">
            <h1 className="My-heading">
              My <span className="to-do-heading">To-Do List</span>{" "}
            </h1>
            <div className="add-task-container">
              <form className="form" onSubmit={this.onAddTask}>
                <label htmlFor="task" className="label">
                  <span className="create-heading">Create</span> Task
                </label>
                <input
                  type="text"
                  placeholder="Enter Task"
                  id="task"
                  className="task-input"
                  value={taskInput}
                  onChange={this.onChangeTittle}
                />
                <button type="submit" className="button-btn">
                  Add
                </button>
              </form>
              <img
                src="https://th.bing.com/th/id/OIP.ZXdr-EvzI83oxt1ccO6oNAHaFY?rs=1&pid=ImgDetMain"
                alt="todoimage"
                className="img"
              />
            </div>
            <hr className="line" />
            <h1 className="my-task-heading">
              <span className="my-heading">My</span> Tasks
            </h1>
            <ul className="todo-list">
              {todoList.map((todoDetails) => (
                <TaskList
                  key={todoDetails.id}
                  todoDetails={todoDetails}
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
            <button className="signout" onClick={this.handleSignOut}>
              Signout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TaskInput); // Wrap the component with withRouter
