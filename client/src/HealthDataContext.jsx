import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

// create a context for health data

const HealthDataContext = createContext();

// custom hook to use the health data context

export const useHealthData = () => useContext(HealthDataContext);

// provider component

export const HealthDataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [bpData, setBPData] = useState([]);
  const [sugarData, setSugarData] = useState([]);
  const [loading, setLoading] = useState({ bp: false, sugar: false });
  const [error, setError] = useState({ bp: null, sugar: null });
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [timing, setTiming] = useState("morning");
  const [fasting, setFasting] = useState(0);
  const [random, setRandom] = useState(0);
  const [editingRecord, setEditingRecord] = useState(null);

  // authentication token

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  // update token if it changes in local storage

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
    };

    window.addEventListener("storage", handleStorageChange);

    // clean up function

    // In React, when you return a function from the useEffect hook, React considers it the cleanup function for that effect. This function is executed when:

    // The component unmounts.

    // The dependencies of the effect change.

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // In React, state updates are asynchronous and batched for performance reasons

  // fetch bp data

  const fetchBpData = async () => {
    if (!accessToken) return;

    // starts loading
    setLoading((prev) => ({ ...prev, bp: true }));

    try {
      const response = await axios.get("http://localhost:5000/api/bp", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBPData(response.data.bp);

      // clear any previous error value
      setError((prev) => ({ ...prev, bp: null }));
    } catch (error) {
      console.log("Error in fetching BP data", error);

      // updates new error value
      setError((prev) => ({ ...prev, bp: "Failed to load BP data" }));
    } finally {
      // ends loading
      setLoading((prev) => ({ ...prev, bp: false }));
    }
  };

  const fetchSugarData = async () => {
    if (!accessToken) return;

    // starts loading
    setLoading((prev) => ({ ...prev, sugar: true }));

    try {
      const response = await axios.get("http://localhost:5000/api/sugar", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSugarData(response.data.sugar);

      // remove previous sugar error data
      setError((prev) => ({ ...prev, sugar: null }));
    } catch (error) {
      console.log("Error in fetching Sugar data", error);

      // update new sugar error, if any
      setError((prev) => ({ ...prev, sugar: "Failed to load Sugar data" }));
    } finally {
      // stops loading
      setLoading((prev) => ({ ...prev, sugar: false }));
    }
  };

  const addBpRecord = async (e) => {
    e.preventDefault();
    if (!accessToken) return;

    setLoading((prev) => ({ ...prev, bp: true }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bp/add",
        {
          systolic: parseInt(systolic),
          diastolic: parseInt(diastolic),
          timing: timing,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);

      // refresh BP data after adding new record
      fetchBpData();
      setError((prev) => ({ ...prev, bp: null }));
    } catch (error) {
      console.log("Error in adding bp data", error);
      setError((prev) => ({ ...prev, bp: "Failed to add bp data" }));
    } finally {
      setLoading((prev) => ({ ...prev, bp: false }));
    }
  };

  const addSugarRecord = async (e) => {
    e.preventDefault();
    if (!accessToken) return;

    setLoading((prev) => ({ ...prev, sugar: true }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sugar/add",
        {
          fasting: parseInt(fasting),
          random: parseInt(random),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);

      // refresh Sugar data after adding new record
      fetchSugarData();
      setError((prev) => ({ ...prev, sugar: null }));
    } catch (error) {
      console.log("Error in adding sugar data", error);
      setError((prev) => ({ ...prev, sugar: "Failed to add sugar data" }));
    } finally {
      setLoading((prev) => ({ ...prev, sugar: false }));
    }
  };

  const deleteBPRecord = async (id) => {
    if (!accessToken) {
      setError((prev) => ({ ...prev, bp: "Authentication required!" }));
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, bp: true }));
      const response = await axios.delete(
        `http://localhost:5000/api/bp/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setBPData(bpData.filter((bp) => bp._id !== id));
      setError((prev) => ({ ...prev, bp: null }));
    } catch (error) {
      console.error(error);
      setError((prev) => ({ ...prev, bp: "Failed to delete this bp record" }));
    } finally {
      setLoading((prev) => ({ ...prev, bp: false }));
    }
  };

  const deleteSugarRecord = async (id) => {
    if (!accessToken) {
      setError((prev) => ({ ...prev, sugar: "Authentication required!" }));
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, sugar: true }));
      const response = await axios.delete(
        `http://localhost:5000/api/sugar/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setSugarData(sugarData.filter((sugar) => sugar._id !== id));
      setError((prev) => ({ ...prev, sugar: null }));
    } catch (error) {
      console.error(error);
      setError((prev) => ({
        ...prev,
        sugar: "Failed to delete this bp record",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, sugar: false }));
    }
  };

  // when the user clicks 'edit' on the record
  const handleEditClick = (record) => {
    console.log(record);
    setEditingRecord({ ...record });
    navigate("/editbp");
  };

  // when the user changes the values in edit form
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditingRecord({ ...editingRecord, [name]: value });
  };

  const editBPRecord = async (id) => {
    if (!accessToken) {
      setError((prev) => ({ ...prev, bp: "Authentication required!" }));
      return;
    }
    if (!editingRecord) {
      setError((prev) => ({
        ...prev,
        bp: "No editing record has been selected",
      }));
      return;
    }
    if (!editingRecord.systolic || !editingRecord.diastolic) {
      setError((prev) => ({
        ...prev,
        bp: "Systolic and Diastolic values are required",
      }));
      return;
    }
    setLoading((prev) => ({ ...prev, bp: true }));
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bp/edit/${id}`,
        {
          systolic: editingRecord.systolic,
          diastolic: editingRecord.diastolic,
          timing: editingRecord.timing,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      fetchBpData();
      setError((prev) => ({ ...prev, bp: null }));
      navigate("/bp");
    } catch (error) {
      if (error.response?.status == 401) {
        setError((prev) => ({
          ...prev,
          bp: "Session expired. Please login again.",
        }));
      } else if (error.response?.status == 404) {
        setError((prev) => ({ ...prev, bp: "Record not found" }));
      } else {
        setError((prev) => ({
          ...prev,
          bp:
            error.response?.data?.message || "Failed to update this bp record",
        }));
      }
    } finally {
      setLoading((prev) => ({ ...prev, bp: false }));
      setEditingRecord(null);
    }
  };

  // cancel edit
  const handleCancelEdit = () => {
    setEditingRecord(null);
    navigate("/bp");
  };

  // Fetch data when token changes or component mounts
  useEffect(() => {
    if (accessToken) {
      fetchBpData();
      fetchSugarData();
    }
  }, [accessToken]);

  // values to share via context
  const contextValue = {
    // data
    bpData,
    sugarData,
    systolic,
    diastolic,
    timing,
    fasting,
    random,
    editingRecord,

    // state
    loading,
    error,

    // actions
    fetchBpData,
    fetchSugarData,
    addBpRecord,
    addSugarRecord,
    deleteBPRecord,
    deleteSugarRecord,
    editBPRecord,
    handleEditClick,
    handleEditFormChange,
    handleCancelEdit,
    setSystolic,
    setDiastolic,
    setTiming,
    setFasting,
    setRandom,

    // authentication
    accessToken,

    // helper getters
    getLatestBp: () => (bpData && bpData.length > 0 ? bpData[0] : null),
    getLatestSugar: () =>
      sugarData && sugarData.length > 0 ? sugarData[0] : null,
  };

  return (
    <HealthDataContext.Provider value={contextValue}>
      {children}
    </HealthDataContext.Provider>
  );
};
