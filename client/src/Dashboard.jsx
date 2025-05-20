import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router";
import AddBP from "./AddBP";
import AddSugar from "./AddSugar";
import BP from "./Bp";
import Sugar from "./Sugar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isAddSugar, setIsAddSugar] = useState(false);
  const [isAddBP, setIsAddBP] = useState(false);

  const userName = localStorage.getItem('userName');

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  const toggleAddSugar = () => {
    if (isAddSugar == true) {
      setIsAddSugar(false);
    } else {
      setIsAddSugar(true);
    }
  };
  const toggleAddBP = () => {
    if (isAddBP == true) {
      setIsAddBP(false);
    } else {
      setIsAddBP(true);
    }
  };

  return (
    <div>
      <h1 className="text-white text-center mb-4 text-3xl bg-black p-2 rounded-xl">
        Hi {userName}, Welcome!
      </h1>
      <div className="flex w-[100%] gap-5 mb-4">
        <div className="bg-black p-8 rounded-xl">
          <div className="flex justify-between">
            <button className="text-white cursor-pointer" onClick={toggleAddBP}>
              Add BP
            </button>
            <button
              className="text-white cursor-pointer"
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
              className="text-white cursor-pointer"
              onClick={toggleAddSugar}
            >
              Add Sugar
            </button>
            <button
              className="text-white cursor-pointer"
              onClick={() => navigate("/sugar")}
            >
              Get All Sugar
            </button>
          </div>
          {isAddSugar && (
            <AddSugar/>
          )}
          <div className="text-center mt-5">
            <Sugar isDashBoard={true}/>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={logout}
        className="cursor-pointer text-white mb-5 bg-black p-1 w-25 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}
