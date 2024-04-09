import React, { useState } from "react";
import "./mileage.component.scss";
import mileageData from "./mileage.component.json";

const MileageComponent = () => {
  const [startMileage, setStartMileage] = useState("");
  const [endMileage, setEndMileage] = useState("");

  const calculateTotalMileage = () => {
    if (!startMileage || !endMileage) {
      return null;
    }
    const start = parseFloat(startMileage);
    const end = parseFloat(endMileage);
    if (isNaN(start) || isNaN(end)) {
      return null;
    }
    return end - start;
  };

  const saveMileage = () => {
    const totalMileage = calculateTotalMileage();
    if (totalMileage !== null) {
      const mileageData = {
        startMileage: parseFloat(startMileage),
        endMileage: parseFloat(endMileage),
        totalMileage: totalMileage,
      };
      console.log("Mileage data:", mileageData);
      setStartMileage("");
      setEndMileage("");
    } else {
      console.error("Invalid start or end mileage input.");
    }
  };

  return (
    <div className="mileage-container">
      <h2 className="mileage-heading">Enter Daily Mileage</h2>
      <input
        className="start-mileage-input"
        type="text"
        value={startMileage}
        onChange={(e) => setStartMileage(e.target.value)}
        placeholder="Start Mileage"
      />
      <br />
      <input
        className="end-mileage-input"
        type="text"
        value={endMileage}
        onChange={(e) => setEndMileage(e.target.value)}
        placeholder="End Mileage"
      />
      <br />
      <button className="save-mileage-button" onClick={saveMileage}>
        Save Mileage
      </button>
    </div>
  );
};

export default MileageComponent;
