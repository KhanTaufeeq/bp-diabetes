import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import editImage from './assets/images/edit.svg';
import deleteImage from './assets/images/delete.svg';

function Sugar() {
  const [sugar, setSugar] = useState([]);
  const navigate = useNavigate();

  let accessToken;

  useEffect(() => {
    accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/signin");
    }
  }, [navigate]);

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


  return (
    <div className="h-screen p-4">
      <button className="cursor-pointer text-white mb-5 bg-black p-1 w-30 rounded-xl" onClick={() => navigate('/dashboard')}>
        My Dashboard
      </button>
      <div>
        {sugar.map((data) => {
          return (
            <div key={data._id} className="bg-black p-4 rounded-xl mb-2 relative">
              <p className="text-white">Fasting: {data.fasting}</p>
              <p className="text-white">Random: {data.random}</p>
              <p className="text-white">Date & Time: {data.createdAt}</p>
              <img src={editImage} alt="menu" className="absolute top-2 right-2 w-[20px] cursor-pointer"/>
              <img src={deleteImage} alt="delete" className="absolute top-2 right-9 w-[20px] cursor-pointer"/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sugar;
