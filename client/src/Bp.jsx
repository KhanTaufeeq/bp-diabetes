import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import editImage from "./assets/images/edit.svg";
import deleteImage from "./assets/images/delete.svg";

function BP({ accessToken, isDashBoard}) {
  const [bp, setBp] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:5000/api/bp", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('checking bp data...')
        console.log(res.data.bp);
        setBp(res.data.bp);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load blood pressure data");
        setLoading(false);
      });
  }, [accessToken,isDashBoard]);

  const deleteBP = () => {
    axios
      .delete("http://localhost:5000/api/bp/delete", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <p className="text-white">Loading BP data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (bp.length === 0) {
    console.log('BP array: ', bp);
    return <p className="text-white">No Blood Pressure data records found :(</p>;
  }

  return (
    <div className={isDashBoard ? "" : "h-screen p-4"}>
      {!isDashBoard && (
        <button
          className="cursor-pointer text-white mb-5 bg-black p-1 w-30 rounded-xl"
          onClick={() => navigate("/dashboard")}
        >
          My Dashboard 
          {console.log(isDashBoard)}
        </button>
      )}
      <div>
        {isDashBoard
          ? bp[0] && (
              <>
                <p className="text-white text-2xl">Systolic: {bp[0].systolic}</p>
                <p className="text-white text-2xl">Diastolic: {bp[0].diastolic}</p>
                <p className="text-white">Date & Time: {bp[0].createdAt}</p>
              </>
            )
          : bp.map((data) => {
              return (
                <div
                  key={data._id}
                  className="bg-black p-4 rounded-xl mb-2 relative"
                >
                  <p className="text-white">Systolic: {data.systolic}</p>
                  <p className="text-white">Diastolic: {data.diastolic}</p>
                  <p className="text-white">Date & Time: {data.createdAt}</p>
                  <img
                    src={editImage}
                    alt="menu"
                    className="absolute top-2 right-2 w-[20px] cursor-pointer"
                  />
                  <img
                    src={deleteImage}
                    alt="delete"
                    className="absolute top-2 right-9 w-[20px] cursor-pointer"
                    onClick={deleteBP}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default BP;
