import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registration = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/user/register", {
        'fullName': fullName,
        'userName': userName,
        'email': email,
        'password': password,
      })
      .then((res) => {
        console.log(res.data);
        setFullName("");
        setUserName("");
        setEmail("");
        setPassword("");
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex box-border justify-center items-center bg-black p-4 rounded-xl w-[60%]">
      <h1 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl flex-1 text-center">
        Register Now!
      </h1>
      <div className="flex-1 text-white">
        <form onSubmit={registration}>
          <div>
            <label
              htmlFor="fullName"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl"
            >
              Full Name
            </label>
            <input
              type="text"
              name="full-name"
              id="fullName"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div className="mt-4 mb-4">
            <label
              htmlFor="userName"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl"
            >
              User Name
            </label>
            <input
              type="text"
              name="user-name"
              id="userName"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4 mt-4">
            <label
              htmlFor="password"
              className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-[#242424] outline-none p-1 rounded"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="cursor-pointer">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
