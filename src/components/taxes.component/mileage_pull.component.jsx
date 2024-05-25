import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../utils/firebase/firebase.utils";

const MileagePullComponent = () => {
  const [mileageEntries, setMileageEntries] = useState([]);
  const [totalMileageQ2, setTotalMileageQ2] = useState(0);

  useEffect(() => {
    const fetchMileageEntries = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "drivermileage")
        );
        const entries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched entries:", entries); // Log fetched data

        // Filter out entries where date is undefined
        const validEntries = entries.filter(
          (entry) => entry.date !== undefined
        );

        // Sort valid entries by date in ascending order
        validEntries.sort((a, b) => a.date.toDate() - b.date.toDate());

        setMileageEntries(validEntries);

        // Calculate total mileage for Q2 2024
        const totalMileage = calculateTotalMileageQ2(validEntries);
        console.log(`Total Mileage for Q2: ${totalMileage}`);
        setTotalMileageQ2(totalMileage);
      } catch (error) {
        console.error("Error fetching mileage entries:", error);
      }
    };

    fetchMileageEntries();
  }, []);

  const calculateTotalMileageQ2 = (entries) => {
    let totalMileageQ2 = 0;
    let startMileage = 0;

    for (let i = 0; i < entries.length; i++) {
      const currentEntry = entries[i];
      const month = currentEntry.date.toDate().getMonth();

      // Check if the entry is within Q2 (March, April, May)
      if (month >= 3 && month <= 5) {
        if (currentEntry.start_end === "start") {
          startMileage = currentEntry.mileage;
        } else if (currentEntry.start_end === "end") {
          // Calculate daily mileage only for entries with a preceding start entry
          if (startMileage !== 0) {
            const dailyMileage = currentEntry.mileage - startMileage;
            console.log(
              `Date: ${currentEntry.date.toDate().toDateString()}, Mileage: ${
                currentEntry.mileage
              }, Start/End: ${
                currentEntry.start_end
              }, Daily Mileage: ${dailyMileage}`
            );
            totalMileageQ2 += dailyMileage;
            startMileage = 0; // Reset start mileage after calculating daily mileage
          }
        }
      }
    }
    console.log(`Total Mileage for Q2: ${totalMileageQ2}`);
    return totalMileageQ2;
  };

  return (
    <div>
      <h1>Total Mileage for Q2 2024: {totalMileageQ2}</h1>
      <h2>Mileage Entries</h2>
      <ul>
        {mileageEntries.map((entry) => (
          <li key={entry.id}>
            Date: {entry.date.toDate().toDateString()}, Mileage: {entry.mileage}
            , Start/End: {entry.start_end}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MileagePullComponent;
