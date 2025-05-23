import React from "react";
import { useHealthData } from "./HealthDataContext";
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
    <div className="p-4 rounded-xl fixed flex flex-col items-center justify-center gap-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editSugarRecord(editingSugarRecord._id);
        }}
      >
        <div>
          <label
            htmlFor="fasting"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
          >
            Fasting:
          </label>
          <input
            type="number"
            name="fasting"
            id="fasting"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleSugarEditFormChange(e)}
            value={editingSugarRecord?.fasting || ""}
            required
          />
        </div>
        <div>
          <label
            htmlFor="random"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
          >
            Random:
          </label>
          <input
            type="number"
            name="random"
            id="random"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleSugarEditFormChange(e)}
            value={editingSugarRecord?.random || ""}
            required
          />
        </div>
        <button type="submit" className="cursor-pointer text-white">
          Update
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          handleSugarCancelEdit();
        }}
        className="cursor-pointer text-white"
      >
        Cancel
      </button>
    </div>
  );
}

export default EditSugar;
