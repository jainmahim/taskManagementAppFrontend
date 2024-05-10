import React, { useState } from "react";
import img from "../images/signup.avif";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  function onSubmit() {
    axios
      .post("https://taskmanagerappbackend-tb48.onrender.com/auth/signup", { email: email, password: password })
      .then(function (response) {
        console.log(response.data);
        if (response.data == "exist") {
          alert("Account Already Exist");
        } else if(response.data == "registered"){
          alert("Registered Successfully.")
          navigate("/");
        }
        else{
          alert("Something went wrong");
        }
      });
  }

  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div>
      <section className="containers m-auto">
        <div className="h-full w-full bg-white">
          <div className="g-6 flex h-full bg-white flex-wrap items-center justify-center lg:justify-between">
            <div className="w-1/2 hidden bg-white lg:block">
              <img src={img} className="w-full" alt="image" />
            </div>

            <div className="md:w-5/12 w-full bg-white  flex flex-col text-center">
              <h1 className="my-12 text-black font-semibold text-3xl bg-white">
                Sign Up
              </h1>
              <div
                className={`flex flex-row bg-white relative mb-4 ${
                  email ? "active" : ""
                }`}
                data-te-input-wrapper-init
              >
                <input
                  type="email"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                  className={`w-10/12 peer bg-white block min-h-[auto]  rounded-xl ${
                    email ? "border-primary" : "border-gray-300"
                  } border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200`}
                  id="exampleFormControlInput2"
                  placeholder=""
                  value={email}
                />

                <label
                  htmlFor="exampleFormControlInput2"
                  className={`pointer-events-none bg-white absolute left-3 ${
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
                  className={`w-10/12 bg-white peer block min-h-[auto]  rounded-xl ${
                    password ? "border-primary" : "border-gray-300"
                  } border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200`}
                  id="exampleFormControlInput22"
                  placeholder=""
                  value={password}
                />
                <label
                  for="exampleFormControlInput22"
                  className={`pointer-events-none bg-white absolute left-3 ${
                    password ? "-top-4 text-sm" : "top-[0.37rem]"
                  } mb-0 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-neutral-500 transition-all duration-200 ease-out motion-reduce:transition-none dark:text-neutral-200`}
                >
                  Enter password
                </label>
              </div>
              {/* 
              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-black checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-black checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck2"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    for="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>

                <a href="#!">Forgot password?</a>
              </div> */}

              <div className="text-center my-6 bg-white ">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="text-white  bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Register
                </button>

                <p className="mb-0 bg-white mt-2 pt-1 text-sm font-semibold">
                  Already have account?
                  <Link
                    to="/"
                    className="text-danger bg-white text-rose-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    &nbsp; Login
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
