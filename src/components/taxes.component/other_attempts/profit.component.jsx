import React, { useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../utils/firebase/firebase.utils";

const ProfitComponent = () => {
  // State variables to store calculated profits
  const [profitData1, setProfitData1] = useState(null);
  const [profitData2, setProfitData2] = useState(null);

  // Function to calculate profit without considering mileage
  const calculateProfit1 = async () => {
    try {
      // Fetch income data
      const incomeCollection = collection(firestore, "income");
      const incomeSnapshot = await getDocs(incomeCollection);
      const incomeData = incomeSnapshot.docs.map((doc) => doc.data());
      const totalIncome = incomeData.reduce(
        (total, item) => total + item.amount,
        0
      );

      // Fetch expense data
      const expenseCollection = collection(firestore, "expenses");
      const expenseSnapshot = await getDocs(expenseCollection);
      const expenseData = expenseSnapshot.docs.map((doc) => doc.data());
      const totalExpenses = expenseData.reduce(
        (total, item) => total + item.amount,
        0
      );

      // Calculate profit
      const profit = totalIncome - totalExpenses;

      // Update state with calculated profit
      setProfitData1(profit);
    } catch (error) {
      console.error("Error calculating profit:", error);
    }
  };

  // Function to calculate profit considering mileage
  const calculateProfit2 = async () => {
    try {
      // Fetch income data
      const incomeCollection = collection(firestore, "income");
      const incomeSnapshot = await getDocs(incomeCollection);
      const incomeData = incomeSnapshot.docs.map((doc) => doc.data());
      const totalIncome = incomeData.reduce(
        (total, item) => total + item.amount,
        0
      );

      // Fetch expense data
      const expenseCollection = collection(firestore, "expenses");
      const expenseSnapshot = await getDocs(expenseCollection);
      const expenseData = expenseSnapshot.docs.map((doc) => doc.data());
      const totalExpenses = expenseData.reduce(
        (total, item) => total + item.amount,
        0
      );

      // Fetch mileage data
      const mileageCollection = collection(firestore, "drivermileage");
      const mileageSnapshot = await getDocs(mileageCollection);
      const mileageData = mileageSnapshot.docs.map((doc) => doc.data());
      const totalMileage = mileageData.reduce(
        (total, item) => total + item.distance,
        0
      );

      // Calculate profit
      const profit = totalIncome - (totalExpenses + totalMileage);

      // Update state with calculated profit
      setProfitData2(profit);
    } catch (error) {
      console.error("Error calculating profit:", error);
    }
  };

  return (
    <div>
      <h2>Profit Calculation</h2>
      <div>
        <p>Income Calc 1 - Income less Expenses</p>
        <button onClick={calculateProfit1}>Calculate Profit 1</button>
        {profitData1 !== null && <p>Profit 1: ${profitData1}</p>}
      </div>
      <div>
        <p>Income Calc 2 - Income less Expenses and Mileage</p>
        <button onClick={calculateProfit2}>Calculate Profit 2</button>
        {profitData2 !== null && <p>Profit 2: ${profitData2}</p>}
      </div>
    </div>
  );
};

export default ProfitComponent;
