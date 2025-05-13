import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import editImage from './assets/images/edit.svg';
import deleteImage from './assets/images/delete.svg';

function BP({accessToken}) {
  const [bp, setBp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bp", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.bp);
        setBp(res.data.bp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    const deleteSugar = () => {
      axios.delete('http://localhost:5000/api/bp/delete', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
      })
    }

  return (
    <div className="h-screen p-4">
      <button className="cursor-pointer text-white mb-5 bg-black p-1 w-30 rounded-xl" onClick={() => navigate('/dashboard')}>
        My Dashboard
      </button>
      <div>
        {bp.map((data) => {
          return (
            <div key={data._id} className="bg-black p-4 rounded-xl mb-2 relative">
              <p className="text-white">Systolic: {data.systolic}</p>
              <p className="text-white">Diastolic: {data.diastolic}</p>
              <p className="text-white">Date & Time: {data.createdAt}</p>
               <img src={editImage} alt="menu" className="absolute top-2 right-2 w-[20px] cursor-pointer"/>
               <img src={deleteImage} alt="delete" className="absolute top-2 right-9 w-[20px] cursor-pointer" onClick={deleteSugar}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BP;
