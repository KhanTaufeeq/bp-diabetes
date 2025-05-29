import { useNavigate } from "react-router";
import React from "react";
import { useHealthData } from "./useHealthData";
import editImage from "./assets/images/edit.svg";
import deleteImage from "./assets/images/delete.svg";

function BP({ isDashBoard }) {
  const navigate = useNavigate();

  const { loading, error, bpData, getLatestBp, handleEditClick, deleteBPRecord, normalizeTimeStamp} = useHealthData();

  // for DashBoard view
  const latestBp = getLatestBp();

  console.log(latestBp);

  if (loading.bp) {
    return <p className="text-white">Loading BP data...</p>;
  }

  if (error.bp) {
    return <p className="text-white">{error.bp}</p>;
  }

  if (bpData.length === 0) {
    console.log("BP array: ", bpData);
    return (
      <div className="flex flex-col gap-5">
        {
          !isDashBoard && (<button onClick={() => navigate('/dashboard')} className="text-white cursor-pointer text-white bg-black p-1 w-30 rounded-xl">My Dashboard</button>)
        }
        <p className="text-white">No BP data records found :(</p>
      </div>
    );
  }

  return (
    <div className={isDashBoard ? "" : "h-screen p-4 lg:w-[40%]"}>
      {!isDashBoard && (
        <div className="flex justify-between items-center mb-5">
          <button
          className="cursor-pointer text-white bg-[#a75265] p-2 w-35 rounded-xl font-bold hover:bg-pink-700"
          onClick={() => navigate("/dashboard")}
        >
          My Dashboard
          {console.log(isDashBoard)}
          </button>
          <p className="text-white rounded-xl font-bold">Number of data: {bpData.length}</p>
        </div>
      )}
      <div>
        {isDashBoard
          ? // DashBoard view - only latest BP
            latestBp && (
              <>
                <p className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                  Systolic: <span className="font-bold">{latestBp.systolic}</span>
                </p>
                <p className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                  Diastolic: <span className="font-bold">{latestBp.diastolic}</span>
                </p>
                <p className="text-white mt-5">Date & Time: {normalizeTimeStamp(latestBp.createdAt)}</p>
              </>
            )
          : // full BP page view, shows all records
            bpData.map((data) => {
              return (
                <div
                  key={data._id}
                  className="bg-black p-4 rounded-xl mb-2 relative lg:w-[100%]"
                >
                  <p className="text-white lg:text-2xl">Systolic: <span className="font-bold">{data.systolic}</span></p>
                  <p className="text-white lg:text-2xl">Diastolic: <span className="font-bold">{data.diastolic}</span></p>
                  <p className="text-white lg:text-2xl">Timing: {data.timing}</p>
                  <p className="text-white lg:text-2xl">Date & Time: {normalizeTimeStamp(data.createdAt)}</p>
                  <img
                    src={editImage}
                    alt="menu"
                    className="absolute top-2 right-2 w-[20px] cursor-pointer"
                    onClick={() => handleEditClick(data)}
                  />
                  <img
                    src={deleteImage}
                    alt="delete"
                    className="absolute top-2 right-9 w-[20px] cursor-pointer"
                    onClick={() => deleteBPRecord(data._id)}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default BP;
