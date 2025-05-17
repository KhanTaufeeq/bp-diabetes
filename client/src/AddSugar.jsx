import React from "react";
import { useNavigate } from "react-router";
import { useHealthData } from "./HealthDataContext";

function AddSugar() {
  const { setFasting, setRandom, addSugarRecord } = useHealthData();
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
      <form onSubmit={addSugarRecord}>
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
