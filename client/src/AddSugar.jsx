import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddSugar({ accessToken, setIsAddSugar }) {
  const [fasting, setFasting] = useState(0);
  const [random, setRandom] = useState(0);
  const navigate = useNavigate();

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
      });
  };
  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
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
      <button
        type="button"
        onClick={() => {
          navigate("/dashboard");
        }}
        className="cursor-pointer text-white"
      >
        Cancel
      </button>
    </div>
  );
}

export default AddSugar;
