import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import AddBP from "./AddBP";
import AddSugar from "./AddSugar";
import BP from "./Bp";
import { useHealthData } from "./HealthDataContext";

export default function Dashboard() {
  const [sugar, setSugar] = useState([]);
  const location = useLocation();
  const [accessToken, setAccessToken] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [isAddSugar, setIsAddSugar] = useState(false);
  const [isAddBP, setIsAddBP] = useState(false);

  const isDashBoard = location.pathname === '/dashboard';

  useEffect(() => {
    console.log("first useEffect");
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    setUserName(name);
    console.log(token);
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("accessToken");
        navigate("/signin");
      } else {
        setAccessToken(token);
      }
    } catch (error) {
      // invalid token format
      localStorage.removeItem("accessToken");
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    console.log("second useEffect");
    if (accessToken) {
      axios
        .get("http://localhost:5000/api/sugar", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.sugar);
          setSugar(res.data.sugar);
        })
        .catch((error) => {
          console.log(error);
          console.log(accessToken);
        });
    }
  }, [accessToken]);

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
            <AddBP accessToken={accessToken} setIsAddBP={setIsAddBP} />
          )}
            <div className="text-center mt-5">
            <BP accessToken={accessToken} isDashBoard={isDashBoard}/>
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
            <AddSugar accessToken={accessToken} setIsAddSugar={setIsAddSugar} />
          )}
          <div className="text-center mt-5">
            {sugar[0] && (
              <p className="text-white text-2xl">Fasting: {sugar[0].fasting}</p>
            )}
            {sugar[0] && (
              <p className="text-white text-2xl mt-2 mb-2">
                Random: {sugar[0].random}
              </p>
            )}
            {sugar[0] && (
              <p className="text-white">Date & Time: {sugar[0].createdAt}</p>
            )}
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
