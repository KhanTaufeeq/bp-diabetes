import React from "react";
import { useHealthData } from "./useHealthData";
import { useNavigate } from "react-router";

function EditSugar() {
  const {
    editSugarRecord,
    loading,
    error,
    handleSugarEditFormChange,
    handleSugarCancelEdit,
    editingSugarRecord,
  } = useHealthData();

  const navigate = useNavigate();

  if (loading.sugar) {
    return <p className="text-white">Loading Sugar data...</p>;
  }

  if (error.sugar) {
    return <p className="text-white">{error.sugar}</p>;
  }

  if (!editingSugarRecord) {
    return (
      <div className="text-white">
        <p>No record selected for editing</p>
        <button onClick={() => navigate("/sugar")} className="cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editSugarRecord(editingSugarRecord._id);
        }}
      >
        <div className="flex justify-between item-center">
          <label
            htmlFor="fasting"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Fasting:
          </label>
          <input
            type="number"
            name="fasting"
            id="fasting"
            className="bg-black outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleSugarEditFormChange(e)}
            value={editingSugarRecord?.fasting || ""}
            required
          />
        </div>
        <div className="mt-5 mb-5 flex gap-8 item-center">
          <label
            htmlFor="random"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Random:
          </label>
          <input
            type="number"
            name="random"
            id="random"
            className="bg-black outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleSugarEditFormChange(e)}
            value={editingSugarRecord?.random || ""}
            required
          />
        </div>
        <div className="flex mt-5">
        <button type="submit" className="cursor-pointer text-white font-bold bg-black w-20 p-2 rounded-xl hover:bg-green-700">
          Update
        </button>
        <button
        type="button"
        onClick={() => {
          handleSugarCancelEdit();
        }}
        className="cursor-pointer text-white ml-10 font-bold bg-black w-20 p-2 rounded-xl hover:bg-red-700"
      >
        Cancel
      </button>
        </div>
      </form>
    </div>
  );
}

export default EditSugar;
