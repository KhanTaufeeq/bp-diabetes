import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const [sugar, setSugar] = useState([]);
  const [bp, setBP] = useState([]);
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [timing, setTiming] = useState('morning');
  const [fasting, setFasting] = useState(0);
  const [random, setRandom] = useState(0);
  const [isAddSugar, setIsAddSugar] = useState(false);
  const [isAddBP, setIsAddBP] = useState(false)
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
  }
  const toggleAddBP = () => {
    if (isAddBP == true) {
      setIsAddBP(false);
    } else {
      setIsAddBP(true);
    }
  }

  return (
    <div className="flex w-[70%]">
      <div className="bg-black p-5 rounded-xl mx-auto">
      <div className="flex justify-between">
        <button className="text-white cursor-pointer" onClick={toggleAddBP}>Add new bp reading</button>
        <button className="text-white cursor-pointer">See all bp readings</button>
      </div>
      {isAddBP && <div className="bg-black p-4 rounded-xl">
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
                required
              />
              </div>
