import React from "react";
import { useNavigate } from "react-router";
import { useHealthData } from "./HealthDataContext";

function AddBP() {
  const navigate = useNavigate();

  const { setSystolic, setDiastolic, setTiming, addBpRecord } = useHealthData();

  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
      <form onSubmit={addBpRecord}>
        <div>
          <label
            htmlFor="systolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
          >
            Systolic
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
        <div>
          <label
            htmlFor="diastolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
          >
            Diastolic
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
        <div>
          <label htmlFor="timing" className="text-white">
            Timing
          </label>
          <select
            name="timing"
            id="timing"
            onChange={(e) => setTiming(e.target.value)}
            value={timing}
            className="text-white"
          >
            <option value="morning">morning</option>
            <option value="afternoon">afternoon</option>
            <option value="evening">evening</option>
          </select>
        </div>
        <button type="submit" className="cursor-pointer text-white">
          Add
        </button>
      </form>
      <button
        type="button"
        className="cursor-pointer text-white"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
}

export default AddBP;
