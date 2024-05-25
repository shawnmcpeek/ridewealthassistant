import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase/firebase.utils";

const MileageComponent = () => {
  const [startMileage, setStartMileage] = useState("");
  const [savedStartMileage, setSavedStartMileage] = useState(""); // New state for saved start mileage
  const [startDate, setStartDate] = useState("");
  const [endMileage, setEndMileage] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartMileageChange = (e) => {
    setStartMileage(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndMileageChange = (e) => {
    setEndMileage(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSaveStartMileage = () => {
    // Save start mileage locally
    setSavedStartMileage(startMileage);
  };

  const handleSubmit = async () => {
    try {
      // Format the data for Firestore database entry
      const startMileageEntry = {
        date: new Date(startDate),
        mileage: parseInt(startMileage),
        start_end: "start",
      };

      const endMileageEntry = {
        date: new Date(endDate),
        mileage: parseInt(endMileage),
        start_end: "end",
      };

      // Save startMileageEntry and endMileageEntry to Firestore database
      const startMileageDocRef = await addDoc(
        collection(firestore, "drivermileage"),
        startMileageEntry
      );

      const endMileageDocRef = await addDoc(
        collection(firestore, "drivermileage"),
        endMileageEntry
      );

      console.log(
        "Start Mileage Document added with ID: ",
        startMileageDocRef.id
      );
      console.log("End Mileage Document added with ID: ", endMileageDocRef.id);

      // Reset input fields after submission
      setStartMileage("");
      setStartDate("");
      setEndMileage("");
      setEndDate("");
      setSavedStartMileage(""); // Clear saved start mileage
    } catch (error) {
      console.error("Error adding mileage entry: ", error);
    }
  };

  return (
    <div>
      <h2>Mileage Entry</h2>
      <label>
        Start Mileage:
        <input
          type="number"
          value={startMileage}
          onChange={handleStartMileageChange}
          placeholder={
            savedStartMileage ? savedStartMileage : "Enter Start Mileage"
          }
        />
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </label>
      {/* Button to save start mileage */}
      <button onClick={handleSaveStartMileage}>Save Start Mileage</button>
      <label>
        End Mileage:
        <input
          type="number"
          value={endMileage}
          onChange={handleEndMileageChange}
          placeholder="End Mileage"
        />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </label>
      <button onClick={handleSubmit}>Submit Mileage Data</button>
    </div>
  );
};

export default MileageComponent;
