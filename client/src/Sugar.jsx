import { useNavigate } from "react-router";
import editImage from './assets/images/edit.svg';
import deleteImage from './assets/images/delete.svg';
import { useHealthData } from "./HealthDataContext.jsx";

function Sugar({isDashBoard}) {
  const navigate = useNavigate();
  const { sugarData, getLatestSugar, loading, error,deleteSugarRecord, handleSugarEditClick } = useHealthData();

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
        <p className="text-white">No sugar data records found :(</p>
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
              ? // DashBoard view - only latest Sugar
                latestSugar && (
                  <>
                    <p className="text-white text-2xl">
                      Fasting: {latestSugar.fasting}
                    </p>
                    <p className="text-white text-2xl">
                      Random: {latestSugar.random}
                    </p>
                    <p className="text-white">Date & Time: {latestSugar.createdAt}</p>
                  </>
                )
              : // full sugar page view, shows all records
                sugarData.map((data) => {
                  return (
                    <div
                      key={data._id}
                      className="bg-black p-4 rounded-xl mb-2 relative"
                    >
                      <p className="text-white">Fasting: {data.fasting}</p>
                      <p className="text-white">Random: {data.random}</p>
                      <p className="text-white">Date & Time: {data.createdAt}</p>
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
