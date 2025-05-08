import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddBP({ accessToken, setIsAddBP }) {
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [timing, setTiming] = useState("morning");
  const navigate = useNavigate();

  const addBP = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/bp/add",
        {
          systolic: parseInt(systolic),
          diastolic: parseInt(diastolic),
          timing: timing,
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
        setIsAddBP(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-black p-4 rounded-xl">
      <form onSubmit={addBP}>
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
    </div>
  );
}

export default AddBP;
