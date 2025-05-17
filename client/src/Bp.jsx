import { useNavigate } from "react-router";
import React, { useEffect } from "react";
import { useHealthData } from "./HealthDataContext.jsx";
import editImage from "./assets/images/edit.svg";
import deleteImage from "./assets/images/delete.svg";

function BP({ isDashBoard }) {
  const navigate = useNavigate();

  const { loading, error, bpData, getLatestBp, fetchBpData } = useHealthData();

  useEffect(() => {
    fetchBpData();
  },[])

  // for DashBoard view
  const latestBp = getLatestBp();

  if (loading.bp) {
    return <p className="text-white">Loading BP data...</p>;
  }

  if (error.bp) {
    return <p>{error.bp}</p>;
  }

  if (bpData.length === 0) {
    console.log("BP array: ", bpData);
    return (
      <p className="text-white">No Blood Pressure data records found :(</p>
    );
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
          ? // DashBoard view - only latest BP
            latestBp && (
              <>
                <p className="text-white text-2xl">
                  Systolic: {latestBp.systolic}
                </p>
                <p className="text-white text-2xl">
                  Diastolic: {latestBp.diastolic}
                </p>
                <p className="text-white">Date & Time: {latestBp.createdAt}</p>
              </>
            )
          : // full BP page view, shows all records
            bpData.map((data) => {
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
