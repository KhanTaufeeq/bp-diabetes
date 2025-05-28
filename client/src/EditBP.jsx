import React from "react";
import { useHealthData } from "./useHealthData";
import { useNavigate } from "react-router";

function EditBP() {
  const {
    editBPRecord,
    loading,
    error,
    handleEditFormChange,
    handleCancelEdit,
    editingRecord,
  } = useHealthData();

  const navigate = useNavigate();

  if (loading.bp) {
    return <p className="text-white">Loading BP data...</p>;
  }

  if (error.bp) {
    return <p className="text-white">{error.bp}</p>;
  }

  if (!editingRecord) {
    return (
      <div className="text-white">
        <p>No record selected for editing</p>
        <button onClick={() => navigate('/bp')} className="cursor-pointer">Go Back</button>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-xl fixed inset-0 bg-gray backdrop-blur-sm flex flex-col items-center justify-center gap-10">
      <form onSubmit={(e) => {
        e.preventDefault();
        editBPRecord(editingRecord._id);
      }}>
        <div className="flex gap-5 item-center">
          <label
            htmlFor="systolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Systolic:
          </label>
          <input
            type="number"
            name="systolic"
            id="systolic"
            className="bg-black outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleEditFormChange(e)}
            value={editingRecord?.systolic || ''}
            required
          />
        </div>
        <div className="flex justify-between item-center mt-5 mb-5">
          <label
            htmlFor="diastolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold"
          >
            Diastolic:
          </label>
          <input
            type="number"
            name="diastolic"
            id="diastolic"
            className="bg-black outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleEditFormChange(e)}
            value={editingRecord?.diastolic || ''}
            required
          />
        </div>
        <div className="flex gap-5 items-center">
          <label htmlFor="timing" className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white font-bold">
            Timing
          </label>
          <select
            name="timing"
            id="timing"
            onChange={(e) => handleEditFormChange(e)}
            value={editingRecord?.timing || ''}
            className="text-white"
          >
            <option value="morning" className="text-black">morning</option>
            <option value="afternoon" className="text-black">afternoon</option>
            <option value="evening" className="text-black">evening</option>
          </select>
        </div>
        <div className="flex mt-5 gap-5">
        <button type="submit" className="cursor-pointer text-white font-bold bg-black rounded-xl p-2 w-20 hover:bg-green-700">
          Update
        </button>
        <button
        type="button"
        className="cursor-pointer text-white ml-10 font-bold bg-black rounded-xl p-2 w-20 hover:bg-red-700"
        onClick={() => handleCancelEdit()}
      >
        Cancel
      </button>
        </div>
      </form>
    </div>
  );
}

export default EditBP;
