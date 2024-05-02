import React, { useState } from "react";
import "./mileage.component.scss";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../utils/firebase/firebase.utils";

const MileageComponent = () => {
  const [newMileage, setNewMileage] = useState("");

  const handleMileageSave = async () => {
    const currentDate = new Date();
    const mileageValue = parseFloat(newMileage);

    if (!isNaN(mileageValue)) {
      const mileageData = {
        date: currentDate,
        mileage: mileageValue,
      };

      console.log("Mileage data to be saved:", mileageData);

      try {
        const docRef = await addDoc(
          collection(getFirestore(app), "drivermileage"), // Use `app` instead of `firestore`
          mileageData
        );
        console.log("Mileage document written with ID: ", docRef.id);
        setNewMileage("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("Invalid mileage input.");
    }
  };

  return (
    <div className="mileage-container">
      <h2 className="mileage-heading">Enter Mileage</h2>
      <input
        className="mileage-input"
        type="text"
        value={newMileage}
        onChange={(e) => setNewMileage(e.target.value)}
        placeholder="Enter Mileage"
      />
      <br />
      <button className="save-mileage-button" onClick={handleMileageSave}>
        Save Mileage
      </button>
    </div>
  );
};

export default MileageComponent;
