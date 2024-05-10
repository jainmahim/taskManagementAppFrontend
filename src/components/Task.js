import React, { useState,useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import AddTask from "./AddTask";
import axios from "axios";
import { StateContext } from "../globalVariable";

const Task = ({
  id,
  priority,
  description,
  title,
  startdatetime,
  enddatetime,
  status,
  filter,
  updateTasks,
}) => {
  const [show, setShow] = useState(false);
  const { loggedIn, setLoggedIn} = useContext(StateContext);
  const { loginEmail, setLoginEmail} = useContext(StateContext);
  console.log("LoggedStatus(Task) :"+loggedIn);
  console.log("LoginEmail(Task) :"+loginEmail);
  const handleDeleteTask = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let data = await axios.delete(
        "https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/deleteTask",
        {
          data: {
            id,
            title,
            description,
            startdatetime,
            enddatetime,
            priority,
            status,
          },
        },
        config
      );
      // console.log(data.data);
      data = await axios.post(
        'https://taskmanagerappbackend-tb48.onrender.com/api/taskcontroll/getTask',
        { filter: filter, email:loginEmail } // Data to send in the request body
      );
      // console.log(data.data);
      updateTasks(data.data);
    } catch (error) {
      console.log("error occured");
    }
  };
  return (
    <>
      {show ? (
        <AddTask
          id={id}
          pr={priority}
          d={description}
          t={title}
          st={startdatetime}
          en={enddatetime}
          sta={status}
          show={setShow}
          Add={false}
          updateTasks={updateTasks}
          filter={filter}
        />
      ) : (
        ""
      )}
      <div className="flex  bg-[#00203FFF] p-5 mb-10 justify-between rounded-md">
      <div className="flex flex-col text-clip overflow-hidden">
        <p className="bg-[#00203FFF]  text-white text-xl">{title}</p>
        <p className="bg-[#00203FFF] text-white">Start Date :  {startdatetime}</p>
        <p className="bg-[#00203FFF] text-white">End Date : {enddatetime}</p>
        <p className="bg-[#00203FFF] text-white">Status : {status}</p>
        <p className="bg-[#00203FFF] text-white">Priority : {priority}</p>

          </div>
              <div className="ml-10 flex bg-[#00203FFF] space-x-9 mt-10">
         <FaTrashAlt className="icons bg-[#00203FFF]" onClick={handleDeleteTask} />
          <AiFillEdit className="icons bg-[#00203FFF]" onClick={() => setShow(true)} />
          </div>
      </div>
    </>
  );
};
export default Task;
