import React from "react";
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
    <div className="flex box-border justify-center items-center bg-black p-4 rounded-xl w-[60%]">
      <h1 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl flex-1 text-center">
        Login Please!
      </h1>
      <div className="flex-1 text-white">
        <form onSubmit={(e) => signInUser(e)}>
          <div>
            <label
              htmlFor="userName"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl"
            >
              UserName
            </label>
            <input
              type="text"
              name="user-name"
              id="userName"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="mt-4 mb-4">
            <label
              htmlFor="password"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="cursor-pointer">
            Login
          </button>
        </form>
        <button type="button" className="cursor-pointer ml-5" onClick={() => navigate('/')}>
            Not a member?
          </button>
      </div>
    </div>
  );
}

export default Signin;
