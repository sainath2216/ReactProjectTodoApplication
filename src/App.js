import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import TaskInput from "./components/TaskInput";

import "./App.css";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/home" component={TaskInput} /> 
      </Switch>
    </Router>
  );
}

export default App;
