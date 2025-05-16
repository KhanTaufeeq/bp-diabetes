import {
  useContext,
  useState,
  useEffect,
  createContext,
  Children,
} from "react";
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

    setLoading((prev) => ({ ...prev, bp: true }));

    try {
      const response = await axios.get("http://localhost:5000/api/bp", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBPData(response.data.bp);
      setError((prev) => ({ ...prev, bp: null }));
    } catch (error) {
      console.log("Error in fetching BP data", error);
      setError((prev) => ({ ...prev, bp: "Failed to load BP data" }));
    } finally {
      setLoading((prev) => ({ ...prev, bp: false }));
    }
  };
};
