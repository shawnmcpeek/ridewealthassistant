import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "./firebase.json";

// Initialize Firebase app with imported configuration
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function MileageCalculator() {
  const [mileageData, setMileageData] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-03-31");
  const [totalMileage, setTotalMileage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "mileageData"),
        where("date", ">=", startDate),
        where("date", "<=", endDate)
      );
      const querySnapshot = await getDocs(q);
      const mileageList = querySnapshot.docs.map((doc) => doc.data());
      setMileageData(mileageList);
    };
    fetchData();
  }, [db, startDate, endDate]);

  function calculateTotalMileage() {
    let totalMileage = 0;
    mileageData.forEach((data, index) => {
      const hour = data.hour;
      if (index < mileageData.length - 1) {
        const nextHour = mileageData[index + 1].hour;
        if (
          (hour === "morning" && nextHour === "evening") ||
          (hour === "evening" && nextHour === "morning")
        ) {
          totalMileage +=
            parseFloat(mileageData[index + 1].distance) -
            parseFloat(data.distance);
        }
      }
    });
    setTotalMileage(totalMileage);
  }

  return (
    <div>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br />
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br />
      <button onClick={calculateTotalMileage}>Calculate Total Mileage</button>
      {totalMileage !== null && (
        <div>Total Mileage Driven: {totalMileage} miles</div>
      )}
    </div>
  );
}

export default MileageCalculator;
