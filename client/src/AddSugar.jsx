import React from "react";
import { useNavigate } from "react-router";
import { useHealthData } from "./useHealthData";

function AddSugar() {
  const { setFasting, setRandom, addSugarRecord, setIsAddSugar } = useHealthData();
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
      <form onSubmit={addSugarRecord}>
        <div className="flex justify-between item-center">
          <label
            htmlFor="fasting"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Fasting:
          </label>
          <input
            type="number"
            name="fasting"
            id="fasting"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => setFasting(e.target.value)}
          />
        </div>
        <div className="flex justify-between item-center mt-5 mb-5">
          <label
            htmlFor="random"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Random:
          </label>
          <input
            type="number"
            name="random"
            id="random"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => setRandom(e.target.value)}
          />
        </div>
        <button type="submit" className="cursor-pointer text-white font-bold">
          Add
        </button>
        <button
        type="button"
        onClick={() => {
          setIsAddSugar(false);
        }}
        className="cursor-pointer text-white ml-10 font-bold"
      >
        Cancel
      </button>
      </form>
    </div>
  );
}

export default AddSugar;
