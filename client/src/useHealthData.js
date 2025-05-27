import { useContext } from "react";
import { HealthDataContext } from "./HealthDataContext.jsx";


export const useHealthData = () => useContext(HealthDataContext);
