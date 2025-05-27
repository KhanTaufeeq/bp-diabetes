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
    <div className="p-4 rounded-xl fixed flex flex-col items-center justify-center gap-10">
      <form onSubmit={(e) => {
        e.preventDefault();
        editBPRecord(editingRecord._id);
      }}>
        <div>
          <label
            htmlFor="systolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
          >
            Systolic
          </label>
          <input
            type="number"
            name="systolic"
            id="systolic"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleEditFormChange(e)}
            value={editingRecord?.systolic || ''}
            required
          />
        </div>
        <div>
          <label
            htmlFor="diastolic"
            className="text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white"
          >
            Diastolic
          </label>
          <input
            type="number"
            name="diastolic"
            id="diastolic"
            className="bg-[#242424] outline-none p-1 rounded text-xl text-white"
            onChange={(e) => handleEditFormChange(e)}
            value={editingRecord?.diastolic || ''}
            required
          />
        </div>
        <div>
          <label htmlFor="timing" className="text-white">
            Timing
          </label>
          <select
            name="timing"
            id="timing"
            onChange={(e) => handleEditFormChange(e)}
            value={editingRecord?.timing || ''}
            className="text-white"
          >
            <option value="morning">morning</option>
            <option value="afternoon">afternoon</option>
            <option value="evening">evening</option>
          </select>
        </div>
        <button type="submit" className="cursor-pointer text-white">
          Update
        </button>
      </form>
      <button
        type="button"
        className="cursor-pointer text-white"
        onClick={() => handleCancelEdit()}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditBP;
