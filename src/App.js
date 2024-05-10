import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Task from "./components/Tasks"
import { StateProvider } from "./globalVariable";


function App() {
  return (
    <StateProvider>
        <BrowserRouter>
      <div className="App ">
      
          <Routes>
            <Route path="/task" index  element={<Task/>} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
  
      </div>
        </BrowserRouter>
    </StateProvider>
  );
}

export default App;
