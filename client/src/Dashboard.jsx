import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const [sugar, setSugar] = useState([]);
  const [bp, setBP] = useState([]);
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [timing, setTiming] = useState("morning");
  const [fasting, setFasting] = useState(0);
  const [random, setRandom] = useState(0);
  const [isAddSugar, setIsAddSugar] = useState(false);
  const [isAddBP, setIsAddBP] = useState(false);
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

  useEffect(() => {
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
    <div className="flex w-[70%]">
      <div className="bg-black p-8 rounded-xl mx-auto">
        <div className="flex justify-between">
          <button className="text-white cursor-pointer" onClick={toggleAddBP}>
            Add BP
          </button>
          <button className="text-white cursor-pointer">
            Get BP
          </button>
        </div>
        {isAddBP && (
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
                <label htmlFor="timing" className="text-white">Timing</label>
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
                Add BP
              </button>
            </form>
          </div>
        )}
        <div className="text-center mt-5">
          {
          bp[0] && (<p className="text-white text-2xl">Systolic: { bp[0].systolic}</p>)
          }
          {
          bp[0] && (<p className="text-white text-2xl mt-2 mb-2">Diastolic: { bp[0].diastolic}</p>)
          }
          {
          bp[0] && (<p className="text-white text-2xl mb-2">when: { bp[0].timing}</p>)
          }
          {
          bp[0] && (<p className="text-white">Date & Time: { bp[0].createdAt}</p>)
        }
        </div>
      </div>
      <div className="bg-black p-8 rounded-xl mx-auto">
        <div className="flex justify-between">
          <button className="text-white cursor-pointer" onClick={toggleAddSugar}>
            Add Sugar
          </button>
          <button className="text-white cursor-pointer">
            Get Sugar
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
                Add Sugar
              </button>
            </form>
          </div>
        )}
        <div className="text-center mt-5">
          {
          sugar[0] && (<p className="text-white text-2xl">Fasting: { sugar[0].fasting}</p>)
          }
          {
          sugar[0] && (<p className="text-white text-2xl mt-2 mb-2">Random: { sugar[0].random}</p>)
          }
          {
          sugar[0] && (<p className="text-white">Date & Time: { sugar[0].createdAt}</p>)
          }
        </div>
      </div>
    </div>
  );
}
