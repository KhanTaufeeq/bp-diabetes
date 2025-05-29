import React from "react";
import { useNavigate } from "react-router";
import AddBP from "./AddBP";
import AddSugar from "./AddSugar";
import BP from "./Bp";
import Sugar from "./Sugar";
import { useHealthData } from "./useHealthData";

export default function Dashboard() {
  const { isAddSugar, isAddBP, toggleAddBP, toggleAddSugar } = useHealthData();
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  return (
    <div className="w-[90%] sm:w-[90%] md:w-[70%] lg:w-[40%]">
      <h1 className="text-white text-center mb-4 text-3xl bg-black p-2 rounded-xl">
        Hi <span className="italic">{userName}</span>, Welcome!
      </h1>
      <div className="w-[100%] gap-5 mb-4">
        <div className="bg-black p-8 rounded-xl mb-5">
          <div className="flex justify-between">
            <button className="text-white cursor-pointer bg-[#5e63b6] px-4 py-2 hover:font-bold rounded-xl hover:bg-indigo-500" onClick={toggleAddBP}>
              Add BP
            </button>
            <button
              className="text-white cursor-pointer bg-[#2e94b9] px-4 py-2 hover:font-bold rounded-xl hover:bg-sky-500"
              onClick={() => navigate("/bp")}
            >
              Get All BP
            </button>
          </div>
          {isAddBP && (
            <AddBP />
          )}
            <div className="text-center mt-5">
            <BP isDashBoard={true}/>
            </div>
        </div>
        <div className="bg-black p-8 rounded-xl">
          <div className="flex justify-between">
            <button
              className="text-white cursor-pointer bg-[#5e63b6] px-4 py-2 hover:font-bold rounded-xl hover:bg-indigo-500"
              onClick={toggleAddSugar}
            >
              Add Sugar
            </button>
            <button
              className="text-white cursor-pointer bg-[#2e94b9] px-4 py-2 hover:font-bold rounded-xl hover:bg-sky-500"
              onClick={() => navigate("/sugar")}
            >
              Get All Sugar
            </button>
          </div>
          {isAddSugar && (
            <AddSugar />
          )}
          <div className="text-center mt-5">
            <Sugar isDashBoard={true}/>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={logout}
        className="cursor-pointer text-white mb-5 bg-red-700 p-1 w-25 rounded-xl hover:bg-red-500 hover:font-bold"
      >
        Logout
      </button>
    </div>
  );
}
