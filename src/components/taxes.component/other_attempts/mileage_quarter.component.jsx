import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "../../../utils/firebase/firebase.json";

// Initialize Firebase app with imported configuration
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function MileageCalculator() {
  // State variables for mileage data, start date, end date, and total mileage
  const [mileageData, setMileageData] = useState([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-03-31");
  const [totalMileage, setTotalMileage] = useState(0);

  // Fetch mileage data from Firestore based on selected date range
  useEffect(() => {
    console.log("Fetching mileage data...");
    const fetchData = async () => {
      try {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        console.log("Start Date:", startDateObj);
        console.log("End Date:", endDateObj);

        const q = query(
          collection(db, "mileageData"),
          where("date", ">=", startDateObj),
          where("date", "<=", endDateObj)
        );

        const querySnapshot = await getDocs(q);
        const fetchedMileageData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Convert Firestore Timestamp to JavaScript Date
          return {
            ...data,
            date: data.date.toDate(),
          };
        });

        console.log("Fetched Mileage Data:", fetchedMileageData);

        setMileageData(fetchedMileageData);
      } catch (error) {
        console.error("Error fetching mileage data:", error);
      }
    };
    fetchData();
  }, [startDate, endDate, db]);

  // Calculate total mileage based on fetched data
  function calculateTotalMileage() {
    console.log("Calculating total mileage...");
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

    console.log("Total Mileage:", totalMileage);

    setTotalMileage(totalMileage);
  }

  return (
    <div>
      {/* Input fields for selecting start and end dates */}
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
      {/* Button to calculate total mileage */}
      <button onClick={calculateTotalMileage}>Calculate Total Mileage</button>
      {/* Display total mileage */}
      <div>Total Mileage Driven: {totalMileage} miles</div>
    </div>
  );
}

export default MileageCalculator;
