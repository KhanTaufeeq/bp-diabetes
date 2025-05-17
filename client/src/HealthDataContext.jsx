import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

// create a context for health data

const HealthDataContext = createContext();

// custom hook to use the health data context

export const useHealthData = () => useContext(HealthDataContext);

// provider component

export const HealthDataProvider = ({ children }) => {
  const [bpData, setBPData] = useState();
  const [sugarData, setSugarData] = useState();
  const [loading, setLoading] = useState({ bp: false, sugar: false });
  const [error, setError] = useState({ bp: null, sugar: null });
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [timing, setTiming] = useState("morning");
  const [fasting, setFasting] = useState(0);
  const [random, setRandom] = useState(0);

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
          systolic: systolic,
          diastolic: diastolic,
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
          fasting: fasting,
          random: random,
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
    isAddBP,
    isAddSugar,

    // state
    loading,
    error,

    // actions
    fetchBpData,
    fetchSugarData,
    addBpRecord,
    addSugarRecord,
    setSystolic,
    setDiastolic,
    setTiming,
    setFasting,
    setRandom,
    setIsAddBP,
    setIsAddSugar,

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
