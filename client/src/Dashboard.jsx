import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
  const [sugar, setSugar] = useState({});
  const [fasting, setFasting] = useState(0);
    const [random, setRandom] = useState(0);
    const navigate = useNavigate();

  useEffect(() => {
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
      });
  }, []);

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
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
          console.log(res.data);
          navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-black p-4 rounded-xl w-[70%] mx-auto">
      <div className="flex justify-between">
        <button className="text-white">Add new reading</button>
        <button className="text-white">See all readings</button>
      </div>
      {/* <div className="bg-black p-4 rounded-xl">
        <form onSubmit={addSugar}>
          <div>
            <label
              htmlFor="fasting"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
            >
              Fasting
            </label>
            <input
              type="number"
              name="fasting"
              id="fasting"
              className="bg-[#242424] outline-none p-1 rounded text-white"
              onChange={(event) => setFasting(event.target.value)}
            />
          </div>
          <div className="mt-4 mb-4">
            <label
              htmlFor="random"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
            >
              Random
            </label>
            <input
              type="number"
              name="random"
              id="random"
              className="bg-[#242424] outline-none p-1 rounded text-white"
              onChange={(event) => setRandom(event.target.value)}
            />
          </div>
          <button className="cursor-pointer text-white" type="submit">Add Sugar</button>
        </form>
      </div> */}
          <div className="flex justify-around items-center">
              <div>
                  {
                  sugar && (<p className="text-white text-5xl">Fasting: {sugar.fasting}</p>)
              }
              </div>
              <div>
                  {
                  sugar && (<p className="text-white text-5xl">Random: {sugar.random}</p>)
              }
              </div>
      </div>
    </div>
  );
}

export default Dashboard;
