import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import AddBP from "./AddBP";

export default function Dashboard() {
  const [sugar, setSugar] = useState([]);
  const [bp, setBP] = useState([]);
  const [fasting, setFasting] = useState(0);
  const [random, setRandom] = useState(0);
  const [isAddSugar, setIsAddSugar] = useState(false);
  const [isAddBP, setIsAddBP] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("third useEffect");
    if (accessToken) {
      axios
        .get("http://localhost:5000/api/bp", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.bp);
          setBP(res.data.bp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  const addSugar = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/sugar/add",
        {
          fasting: parseInt(fasting),
          random: parseInt(random),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
        setIsAddSugar(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(accessToken);
      });
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
            {bp[0] && (
              <p className="text-white text-2xl">Systolic: {bp[0].systolic}</p>
            )}
            {bp[0] && (
              <p className="text-white text-2xl mt-2 mb-2">
                Diastolic: {bp[0].diastolic}
              </p>
            )}
            {bp[0] && (
              <p className="text-white text-2xl mb-2">when: {bp[0].timing}</p>
            )}
            {bp[0] && (
              <p className="text-white">Date & Time: {bp[0].createdAt}</p>
            )}
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
            <div className="bg-black p-4 rounded-xl">
              <form onSubmit={addSugar}>
                <div>
                  <label
                    htmlFor="fasting"
                    className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
                  >
                    Fasting:
                  </label>
                  <input
                    type="number"
                    name="fasting"
                    id="fasting"
                    className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
                    onChange={(e) => setFasting(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="random"
                    className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
                  >
                    Random:
                  </label>
                  <input
                    type="number"
                    name="random"
                    id="random"
                    className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
                    onChange={(e) => setRandom(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="cursor-pointer text-white">
                  Add
                </button>
              </form>
            </div>
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
