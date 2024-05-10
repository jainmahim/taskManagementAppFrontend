import React, { useState,useContext } from "react";
import axios from "axios";
import "./Task.css";
import { StateContext } from "../globalVariable";
const AddTask = ({
  
  id,
  t,
  d,
  st,
  en,
  pr,
  sta,
  show,
  Add,
  updateTasks,
  filter,
}) => {
  const [title, setTitle] = useState(t);
  const [description, setDescription] = useState(d);
  const [startdatetime, setStart] = useState(st);
  const [enddatetime, setEnd] = useState(en);
  const [priority, setPriority] = useState(pr);
  const [status, setStatus] = useState("completed"); // Default status to "completed"
  const { loggedIn, setLoggedIn} = useContext(StateContext);
  const { loginEmail, setLoginEmail} = useContext(StateContext);
  console.log("LoggedStatus(addTask) :"+loggedIn);
  console.log("LoginEmail(addTask) :"+loginEmail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Add) {
      // Logic for adding a new task
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        let data = await axios.post(
          "https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/addTask",
          {
            mail:loginEmail,
            title,
            description,
            startdatetime,
            enddatetime,
            priority,
            status,
          },
          config
        );
        data =await axios.post(
          'https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/getTask',
          { filter: filter, email:loginEmail } // Data to send in the request body
        );
        updateTasks(data.data);
      } catch (error) {
        console.log("Error occurred:", error.message);
      }
    } else {
      // Logic for updating a task
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        let data = await axios.put(
          "https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/updateTask",
          {
            mail:loginEmail,
            id,
            title,
            description,
            startdatetime,
            enddatetime,
            priority,
            status,
          },
          config
        );
        data =  await axios.post(
          'https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/getTask',
          { filter: filter, email:loginEmail } // Data to send in the request body
        );
        updateTasks(data.data);
      } catch (error) {
        console.log("Error occurred:", error.message);
      }
    }
    // Reset form fields and close the modal
    setTitle("");
    setDescription("");
    setEnd("");
    setPriority("");
    setStart("");
    setStatus("completed"); // Reset status to "completed"
    show(false);
  };

  return (
    <div className="pop-box">
      <div className="form-input">
        <label>{Add ? "Add Task" : "Update Task"}</label>
        <form className="bg-white" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="input-field bg-white"
            type="text"
            placeholder="Title of the Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="input-field bg-white"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="input-field-date">
            <span>Start Date</span>
            <input
              type="date"
              placeholder="Start Date"
              value={startdatetime}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="input-field-date">
            <span>End Date</span>
            <input
              type="date"
              placeholder="End Date"
              value={enddatetime}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          <input
            className="input-field bg-white"
            type="number"
            min={0}
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          />
          <select
            className="input-field bg-white"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option className="input-field" value="completed">
              Task Completed
            </option>
            <option className="input-field" value="incomplete">
              Task Incomplete
            </option>
          </select>
          <input className="submit-btn text-white" type="submit" value="Submit" />
        </form>
        <button className="cancil-btn" onClick={() => show(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTask;
