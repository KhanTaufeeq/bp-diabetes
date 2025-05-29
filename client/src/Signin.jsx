import React from "react";
import { Link } from "react-router";
import { useHealthData } from "./useHealthData";

function Signin() {
  const { signInUser, authError, authLoading, setUserName, setPassword } = useHealthData();

  if (authLoading) {
    return <p className="text-white">Loading Login...!</p>
  }

  if (authError) {
    return <p className="text-white">{authError}</p>
  }

  return (
    <div className="box-border pl-4 pr-4 rounded-xl w-[90%] md:w-[70%] lg:w-[40%]">
      <h1 className="text-white text-2xl flex-1 text-center bg-black mb-5 pt-2 pb-2 rounded-xl font-bold">
        Login Please!
      </h1>
      <div className="flex-1 text-white bg-black pt-4 pb-4 pl-2 pr-2 rounded-xl">
        <form onSubmit={(e) => signInUser(e)}>
          <div className="flex items-center justify-between w-[95%] ml-auto mr-auto">
            <label
              htmlFor="userName"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold"
            >
              UserName
            </label>
            <input
              type="text"
              name="user-name"
              id="userName"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Enter User Name..."
            />
          </div>
          <div className="mt-4 mb-6 flex items-center justify-between w-[95%] ml-auto mr-auto">
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
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter Password..."
            />
          </div>
          <div className="flex justify-center items-center gap-5 mt-10">
          <button type="submit" className="cursor-pointer bg-[#242424] p-2 w-[30%] rounded-xl font-bold">
            Login
          </button>
          <Link to='/' className="underline">Not a member?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
