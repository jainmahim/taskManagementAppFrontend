import React, { useEffect, useState,useContext } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import axios from "axios";
import { StateContext } from "../globalVariable";
const Tasks = () => {
  const { loggedIn, setLoggedIn} = useContext(StateContext);
  const { loginEmail, setLoginEmail} = useContext(StateContext);


  console.log("LoggedStatus(Task) :"+loggedIn);
  console.log("LoginEmail(Task) :"+loginEmail);
  const [showpopup, setShowpopup] = useState(false);
  const [size, setSize] = useState(0);
  const [filter, setFilter] = useState("All");
  const [mytasks, setMyTasks] = useState([]);
  useEffect(() => {
    console.log("entered in useeffect");
    const fetchdata = async (email) => {
      try {
        const response = await axios.post(
          'https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/getTask',
          { filter: filter, email:email } // Data to send in the request body
        );
        setMyTasks(response.data);
        setSize(response.data.length); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchdata(loginEmail);
  }, [filter]);
  const handleSortingPriority = () => {
    const tempdata = [].concat(mytasks);
    tempdata.sort((a, b) => a.priority - b.priority);
    setMyTasks(tempdata);
    // mytasks.sort((a, b) => b.priority - a.priority);
  };
  return (
    <div>
      {/* heading of the App */}
      <div className="text-3xl text-center p-10 font-bold   ">
        <h1>Task Manager App</h1>
      </div>
      {/* tasks */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/6 ">
          <div className="btn">
            <button onClick={() => setShowpopup(true)}>Add Task</button>
          </div>
          <div className="btn">
            <button onClick={handleSortingPriority}>Sort priority</button>
          </div>
          <div className="filter">
            <select id="filter-task" onChange={(e) => setFilter(e.target.value)}>
              <option value={"All"}>All</option>
              <option value={"Completed"}>Completed</option>
              <option value={"Incomplete"}>Incomplete</option>
            </select>
          </div>
        </div>
        <div className="w-5/6 mx-10 mt-5">
          <div className="">
            {mytasks.length === 0
              ? "No tasks available"
              : mytasks.map((ob) => (
                <Task
                  key={ob._id}
                  id={ob._id}
                  title={ob.title}
                  priority={ob.priority}
                  description={ob.decription}
                  startdatetime={ob.StartDateTime}
                  enddatetime={ob.EndDateTime}
                  status={ob.status}
                  filter={filter}
                  updateTasks={setMyTasks}
                />
              ))}
          </div>
        </div>
      </div>
      {showpopup ? (
        <AddTask
          t=""
          pr=""
          st=""
          en=""
          sta=""
          show={setShowpopup}
          Add={true}
          updateTasks={setMyTasks}
          filter={filter}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Tasks;
