import React, { useState } from "react";
import "./mileage.component.scss";
import mileageData from "./mileage.component.json";

const MileageComponent = () => {
  const [startMileage, setStartMileage] = useState("");
  const [endMileage, setEndMileage] = useState("");
  const [mileageDate, setMileageDate] = useState(""); // New state for mileage date

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

  const saveStartMileage = () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date
    setMileageDate(currentDate); // Set mileage date to current date
    const start = parseFloat(startMileage);
    if (!isNaN(start)) {
      const mileageData = {
        date: currentDate,
        startMileage: start,
      };
      console.log("Start mileage saved:", mileageData);
      setStartMileage(""); // Clear start mileage input
    } else {
      console.error("Invalid start mileage input.");
    }
  };

  const saveEndMileage = () => {
    const totalMileage = calculateTotalMileage();
    if (totalMileage !== null) {
      const end = parseFloat(endMileage);
      const mileageData = {
        date: mileageDate,
        startMileage: parseFloat(startMileage),
        endMileage: end,
        totalMileage: totalMileage,
      };
      console.log("End mileage saved:", mileageData);
      setEndMileage(""); // Clear end mileage input
    } else {
      console.error("Invalid end mileage input.");
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
      <button className="save-mileage-button" onClick={saveStartMileage}>
        Save Start Mileage
      </button>
      <br />
      <input
        className="end-mileage-input"
        type="text"
        value={endMileage}
        onChange={(e) => setEndMileage(e.target.value)}
        placeholder="End Mileage"
      />
      <br />
      <button className="save-mileage-button" onClick={saveEndMileage}>
        Save End Mileage
      </button>
    </div>
  );
};

export default MileageComponent;
