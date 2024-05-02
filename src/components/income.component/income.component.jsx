import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../utils/firebase/firebase.utils";

const IncomeComponent = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date(date);
    const incomeValue = parseFloat(amount);

    if (isNaN(incomeValue) || !currentDate || !source) {
      console.error("Invalid income input.");
      return;
    }

    const incomeData = {
      date: currentDate,
      amount: incomeValue,
      source: source,
    };

    console.log("Income data to be saved:", incomeData);

    try {
      const docRef = await addDoc(
        collection(getFirestore(app), "income"),
        incomeData
      );
      console.log("Income document written with ID:", docRef.id);
      setDate("");
      setAmount("");
      setSource("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className="income-container">
      <h2 className="income-heading">Enter Income</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Income:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Income Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Income Source:</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Income</button>
      </form>
    </div>
  );
};

export default IncomeComponent;
