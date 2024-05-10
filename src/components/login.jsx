import React, { useContext, useState } from "react";
import img from "../images/login.avif";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../globalVariable";
export default function Login() {
  const { loggedIn, setLoggedIn} = useContext(StateContext);
  const { loginEmail, setLoginEmail} = useContext(StateContext);
  const navigate = useNavigate();

  console.log("LoggedStatus :"+loggedIn);
  console.log("LoginEmail :"+loginEmail);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
 async function onSubmit() {
await axios
      .post("https://taskmanagerappbackend-tb48.onrender.com/auth/login", { email: email, password: password })
      .then(function (response) {
        console.log(response.data);
         if (response.data == "exist") {
          alert("Login Successfully!!");
          setLoginEmail(email);
          
          setLoggedIn(true);
          navigate("/task");
        }
        else if(response.data == "notexist"){
          alert('Wrong Authentication')
        }
        else{
          alert('Something went wrong, please login again')
        }
      });
  }

 

  return (
    <div className="bg-white">
      <section className="containers m-auto bg-white">
        <div className="h-full w-full bg-white">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between bg-white">
            <div className="w-1/2 hidden lg:block ">
              <img src={img} className="w-full" alt="image" />
            </div>

            <div className="md:w-5/12 w-full flex flex-col text-center bg-white ">
              <h1 className="my-12 text-black font-semibold text-3xl bg-white">
            Login
              </h1>
              <div
                className={`flex flex-row relative mb-4 bg-white ${
                  email ? "active" : ""
                }`}
                data-te-input-wrapper-init
              >
                <input
                  type="email"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                  className={`w-10/12 peer block min-h-[auto]  rounded-xl ${
                    email ? "border-primary" : "border-gray-300"
                  } border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200`}
                  id="exampleFormControlInput2"
                  placeholder=""
                  value={email}
                />

             

                <label
                  htmlFor="exampleFormControlInput2"
                  className={`pointer-events-none absolute bg-white left-3 ${
                    email ? "-top-4 text-sm" : "top-[0.37rem]"
                  } mb-0 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-neutral-500 transition-all duration-200 ease-out motion-reduce:transition-none dark:text-neutral-200`}
                >
                  Email
                </label>
              </div>

              <div
                className={`relative bg-white mb-6" ${password ? "active" : ""}`}
                data-te-input-wrapper-init
              >
                <input
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                  type="text "
                  className={`w-10/12 peer block min-h-[auto] bg-white rounded-xl ${
                    password ? "border-primary" : "border-gray-300"
                  } border-2 bg-transparent bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200`}
                  id="exampleFormControlInput22"
                  placeholder=""
                  value={password}
                />
                <label
                  for="exampleFormControlInput22"
                  className={`pointer-events-none bg-white absolute left-3 ${
                    password ? "-top-4 text-sm" : "top-[0.37rem]"
                  } mb-0 max-w-[90%] origin-[0_0]  truncate leading-[2.15] text-neutral-500 transition-all duration-200 ease-out motion-reduce:transition-none dark:text-neutral-200`}
                >
                  Password
                </label>
              </div>
                  
              <div className="text-center my-6 bg-white ">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                 Login
                </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold bg-white">
                 Don't Have Account?
                  <Link
                    to="/signup"
                    className="text-danger bg-white text-rose-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    &nbsp; Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
