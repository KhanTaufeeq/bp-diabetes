import React from "react";
import { useHealthData } from "./useHealthData";

function AddBP() {

  const { setSystolic, setDiastolic, setTiming, addBpRecord, timing, setIsAddBP } = useHealthData();

  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
      <form onSubmit={addBpRecord}>
        <div className="flex justify-between item-center">
          <label
            htmlFor="systolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Systolic:
          </label>
          <input
            type="number"
            name="systolic"
            id="systolic"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => setSystolic(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between mt-5 mb-5 item-center">
          <label
            htmlFor="diastolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Diastolic:
          </label>
          <input
            type="number"
            name="diastolic"
            id="diastolic"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => setDiastolic(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-5 item-center mb-5">
          <label htmlFor="timing" className="text-white font-bold">
            Timing
          </label>
          <select
            name="timing"
            id="timing"
            onChange={(e) => setTiming(e.target.value)}
            value={timing}
            className="text-white"
          >
            <option value="morning" className="text-black">morning</option>
            <option value="afternoon" className="text-black">afternoon</option>
            <option value="evening" className="text-black">evening</option>
          </select>
        </div>
        <button type="submit" className="cursor-pointer text-white font-bold">
          Add
        </button>
        <button
        type="button"
          className="cursor-pointer text-white ml-10 font-bold"
          onClick={() => setIsAddBP(false)}
      >
        Cancel
      </button>
      </form>
    </div>
  );
}

export default AddBP;
