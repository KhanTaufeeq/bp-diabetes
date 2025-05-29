import { useNavigate } from "react-router";
import editImage from './assets/images/edit.svg';
import deleteImage from './assets/images/delete.svg';
import { useHealthData } from "./useHealthData";

function Sugar({isDashBoard}) {
  const navigate = useNavigate();
  const { sugarData, getLatestSugar, loading, error,deleteSugarRecord, handleSugarEditClick, normalizeTimeStamp } = useHealthData();

    // for DashBoard view
    const latestSugar = getLatestSugar();

    if (loading.sugar) {
      return <p className="text-white">Loading Sugar data...</p>;
    }
  
    if (error.sugar) {
      return <p className="text-white">{error.sugar}</p>;
    }
  
    if (sugarData.length === 0) {
      console.log("Sugar array: ", sugarData);
      return (
        <div className="flex flex-col gap-5">
          {
            !isDashBoard && (<button onClick={() => navigate('/dashboard')} className="text-white cursor-pointer text-white bg-black p-1 w-30 rounded-xl">My Dashboard</button>)
          }
          <p className="text-white">No sugar data records found :(</p>
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
          <p className="text-white rounded-xl font-bold">Number of data: {sugarData.length}</p>
        </div>
          )}
          <div>
            {isDashBoard
              ? // DashBoard view - only latest Sugar
                latestSugar && (
                  <>
                    <p className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                      Fasting: <span className="font-bold">{latestSugar.fasting}</span>
                    </p>
                    <p className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                      Random: <span className="font-bold">{latestSugar.random}</span>
                    </p>
                    <p className="text-white mt-5">Date & Time: {normalizeTimeStamp(latestSugar.createdAt)}</p>
                  </>
                )
              : // full sugar page view, shows all records
                sugarData.map((data) => {
                  return (
                    <div
                      key={data._id}
                      className="bg-black p-4 rounded-xl mb-2 relative"
                    >
                      <p className="text-white lg:text-2xl">Fasting: <span className="font-bold">{data.fasting}</span></p>
                      <p className="text-white lg:text-2xl">Random: <span className="font-bold">{data.random}</span></p>
                      <p className="text-white lg:text-2xl">Date & Time: {normalizeTimeStamp(data.createdAt)}</p>
                      <img
                        src={editImage}
                        alt="menu"
                        className="absolute top-2 right-2 w-[20px] cursor-pointer"
                        onClick={() => handleSugarEditClick(data)}
                      />
                      <img
                        src={deleteImage}
                        alt="delete"
                        className="absolute top-2 right-9 w-[20px] cursor-pointer"
                        onClick={() => deleteSugarRecord(data._id)}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
  );
}

export default Sugar;
