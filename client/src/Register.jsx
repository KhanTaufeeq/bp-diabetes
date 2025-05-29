import React from "react";
import { Link } from "react-router";
import { useHealthData } from "./useHealthData";

function Register() {

  const { registration, setFullName, setEmail, setRegisterPassword, setRegisterUserName, authLoading, authError } = useHealthData();

  if (authLoading) {
    return <p className="text-white">Loading Login...!</p>
  }

  if (authError) {
    return <p className="text-white">{authError}</p>
  }

  return (
    <div className="box-border pl-4 pr-4 rounded-xl w-[90%] md:w-[70%] lg:w-[40%]">
      <h1 className="text-white text-2xl flex-1 text-center bg-black mb-5 pt-2 pb-2 rounded-xl font-bold">
        Register Now!
      </h1>
      <div className="flex-1 text-white bg-black pt-5 pb-5 pl-2 pr-2 rounded-xl">
        <form onSubmit={(e) => registration(e)}>
          <div className="flex items-center justify-between w-[95%] ml-auto mr-auto">
            <label
              htmlFor="fullName"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold"
            >
              Full Name
            </label>
            <input
              type="text"
              name="full-name"
              id="fullName"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter Full Name..."
            />
          </div>
          <div className="mt-4 mb-4 flex items-center justify-between w-[95%] ml-auto mr-auto">
            <label
              htmlFor="userName"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold"
            >
              User Name
            </label>
            <input
              type="text"
              name="user-name"
              id="userName"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setRegisterUserName(event.target.value)}
              placeholder="Enter User Name..."
            />
          </div>
          <div className="flex items-center justify-between w-[95%] ml-auto mr-auto">
            <label
              htmlFor="email"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Email..."
            />
          </div>
          <div className="mb-4 mt-4 flex items-center justify-between w-[95%] ml-auto mr-auto">
            <label
              htmlFor="password"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setRegisterPassword(event.target.value)}
              placeholder="Enter Password..."
            />
          </div>
          <div className="flex items-center justify-center gap-5 mt-10">
          <button type="submit" className="cursor-pointer bg-[#242424] w-[30%] font-bold rounded-xl pt-2 pb-2">
            Register
          </button>
          <Link to='/signin' className="underline">Already a member?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
