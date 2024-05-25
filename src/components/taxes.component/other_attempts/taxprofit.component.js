import React from 'react';
  
  const Taxprofit.component../../../utils/firebase/firebase.utils
	return (
	  <div>
	  </div>
	);
  }
  
  export default Taxprofit.component;
  import React, { useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../utils/firebase/firebase.utils";

// Function to handle time frame selection
const TimeframeSelector = () => {
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleQuarterChange = (event) => {
    const quarter = event.target.value;
    setSelectedQuarter(quarter);
    console.log("TimeframeSelector - Quarter Changed:", quarter);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    console.log("TimeframeSelector - Year Changed:", year);
  };

  return (
    <div>
      <h2>Choose Timeframe for Calculations</h2>
      <label>Select Quarter:</label>
      <select value={selectedQuarter} onChange={handleQuarterChange}>
        <option value="">Select Quarter</option>
        <option value="Q1">Q1</option>
        <option value="Q2">Q2</option>
        <option value="Q3">Q3</option>
        <option value="Q4">Q4</option>
      </select>
      <label>Select Year:</label>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
      </select>
    </div>
  );
};

// Helper function to get the applicable mileage rate based on the selected year and quarter
const getMileageRate = (selectedYear, selectedQuarter) => {
  // Define IRS mileage rates by year and quarter
  const irsMileageRates = {
    2024: {
      Q1: 67,
      Q2: 67,
      Q3: 67,
      Q4: 67,
    },
    2023: {
      Q1: 65.5,
      Q2: 65.5,
      Q3: 65.5,
      Q4: 65.5,
    },
    // Add rates for other years as needed
  };

  // Check if the selected year and quarter have a defined rate
  if (
    irsMileageRates[selectedYear] &&
    irsMileageRates[selectedYear][selectedQuarter]
  ) {
    return irsMileageRates[selectedYear][selectedQuarter];
  } else {
    // If the rate is not defined, return a default value or handle it as needed
    return 0; // Default to 0 if rate is not found
  }
};

// Function to calculate profit
//1. Calculate profit - expenses without considering mileage
const ProfitCalculation1 = ({ selectedYear, selectedQuarter }) => {
  const [profit, setProfit] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const calculateProfit = async () => {
    try {
      const incomeCollection = collection(firestore, "income");
      const incomeSnapshot = await getDocs(incomeCollection);
      const incomeData = incomeSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalIncome = incomeData.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalIncome(totalIncome);

      const expenseCollection = collection(firestore, "expenses");
      const expenseSnapshot = await getDocs(expenseCollection);
      const expenseData = expenseSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalExpenses = expenseData.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalExpenses(totalExpenses);

      const profit = totalIncome - totalExpenses;
      setProfit(profit);
    } catch (error) {
      console.error("Error calculating profit:", error);
    }
  };

  return (
    <div>
      <TimeframeSelector />

      <h3>Profit Calculation:</h3>
      <h4>Profit (no mileage)</h4>
      <p>
        {profit !== null ? (
          <>
            Income {selectedYear} {selectedQuarter}: {totalIncome} - Expenses{" "}
            {selectedYear} {selectedQuarter}: {totalExpenses} = Total Profit{" "}
            {selectedYear} {selectedQuarter}: {profit}
          </>
        ) : (
          "Please select a quarter and year to calculate profit."
        )}
      </p>
      <button onClick={calculateProfit}>Calculate Profit</button>
    </div>
  );
};

// Function to calculate profit including mileage
const ProfitCalculation2 = ({ selectedYear, selectedQuarter }) => {
  const [profit, setProfit] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);
  const [mileageRate, setMileageRate] = useState(0);

  const calculateProfit = async () => {
    try {
      // Fetch income data for the selected quarter and year
      const incomeCollection = collection(firestore, "income");
      const incomeSnapshot = await getDocs(incomeCollection);
      const incomeData = incomeSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalIncome = incomeData.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalIncome(totalIncome);

      // Fetch expense data for the selected quarter and year
      const expenseCollection = collection(firestore, "expenses");
      const expenseSnapshot = await getDocs(expenseCollection);
      const expenseData = expenseSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalExpenses = expenseData.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalExpenses(totalExpenses);

      // Fetch mileage data for the selected quarter and year
      const mileageCollection = collection(firestore, "mileage");
      const mileageSnapshot = await getDocs(mileageCollection);
      const mileageData = mileageSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalMileage = mileageData.reduce(
        (total, item) => total + item.distance,
        0
      );
      setTotalMileage(totalMileage);

      // Get the mileage rate for the selected year and quarter
      const mileageRate = getMileageRate(selectedYear, selectedQuarter);
      setMileageRate(mileageRate);

      // Calculate profit including mileage
      const profit = totalIncome - totalExpenses - totalMileage * mileageRate;
      setProfit(profit);
    } catch (error) {
      console.error("Error calculating profit:", error);
    }
  };

  return (
    <div>
      <TimeframeSelector />

      <h3>Profit Calculation with Mileage:</h3>
      <h4>Profit (including mileage)</h4>
      <p>
        {profit !== null ? (
          <>
            Income {selectedYear} {selectedQuarter}: {totalIncome} - Expenses{" "}
            {selectedYear} {selectedQuarter}: {totalExpenses} - Mileage{" "}
            {selectedYear} {selectedQuarter}: {totalMileage} * Mileage Rate:{" "}
            {mileageRate} = Total Profit {selectedYear} {selectedQuarter}:{" "}
            {profit}
          </>
        ) : (
          "Please select a quarter and year to calculate profit."
        )}
      </p>
      <button onClick={calculateProfit}>Calculate Profit</button>
    </div>
  );
};

//Estimated Tax Calculations
//1 Gross Profit Estimate
const GrossProfitTaxEstimate = ({ selectedYear, selectedQuarter }) => {
  const [grossTaxEstimate, setGrossTaxEstimate] = useState(null);

  const calculateGrossProfitTax = async () => {
    try {
      // Fetch income data for the selected quarter and year
      const incomeCollection = collection(firestore, "income");
      const incomeSnapshot = await getDocs(incomeCollection);
      const incomeData = incomeSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalIncome = incomeData.reduce(
        (total, item) => total + item.amount,
        0
      );

      // Placeholder values for tax rates (you can fetch them from Firestore)
      const irsTaxRate = 0.15; // Example IRS tax rate
      const stateTaxRate = 0.05; // Example state tax rate

      // Calculate gross profit tax estimate
      const grossTax = totalIncome * (irsTaxRate + stateTaxRate);
      setGrossTaxEstimate(grossTax);
    } catch (error) {
      console.error("Error calculating gross profit tax estimate:", error);
    }
  };

  return (
    <div>
      <TimeframeSelector />

      <h3>Tax Estimate Calculation:</h3>
      <h4>Gross Profit Tax Estimate</h4>
      <p>
        {grossTaxEstimate !== null ? (
          <>
            Gross Profit Tax Estimate for {selectedYear} {selectedQuarter}:{" "}
            {grossTaxEstimate}
          </>
        ) : (
          "Please select a quarter and year to calculate the tax estimate."
        )}
      </p>
      <button onClick={calculateGrossProfitTax}>
        Calculate Gross Profit Tax Estimate
      </button>
    </div>
  );
};

// Net Profit Tax Estimate Calculation Component
const NetProfitTaxEstimate = ({ selectedYear, selectedQuarter }) => {
  const [netTaxEstimate, setNetTaxEstimate] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);
  const [mileageRate, setMileageRate] = useState(0);

  const calculateNetProfitTax = async () => {
    try {
      // Fetch income data for the selected quarter and year
      const incomeCollection = collection(firestore, "income");
      const incomeSnapshot = await getDocs(incomeCollection);
      const incomeData = incomeSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalIncome = incomeData.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalIncome(totalIncome);

      // Fetch expense data for the selected quarter and year
      const expenseCollection = collection(firestore, "expenses");
      const expenseSnapshot = await getDocs(expenseCollection);
      const expenseData = expenseSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalExpenses = expenseData.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTotalExpenses(totalExpenses);

      // Fetch mileage data for the selected quarter and year
      const mileageCollection = collection(firestore, "mileage");
      const mileageSnapshot = await getDocs(mileageCollection);
      const mileageData = mileageSnapshot.docs
        .filter(
          (doc) =>
            doc.data().year === selectedYear &&
            doc.data().quarter === selectedQuarter
        )
        .map((doc) => doc.data());

      const totalMileage = mileageData.reduce(
        (total, item) => total + item.distance,
        0
      );
      setTotalMileage(totalMileage);

      // Get the mileage rate for the selected year and quarter
      const mileageRate = getMileageRate(selectedYear, selectedQuarter);
      setMileageRate(mileageRate);

      // Calculate net profit
      const netProfit =
        totalIncome - totalExpenses - totalMileage * mileageRate;

      // Placeholder values for tax rates (you can fetch them from Firestore)
      const irsTaxRate = 0.15; // Example IRS tax rate
      const stateTaxRate = 0.05; // Example state tax rate

      // Calculate net profit tax estimate
      const netTax = netProfit * (irsTaxRate + stateTaxRate);
      setNetTaxEstimate(netTax);
    } catch (error) {
      console.error("Error calculating net profit tax estimate:", error);
    }
  };

  return (
    <div>
      <TimeframeSelector />

      <h3>Tax Estimate Calculation:</h3>
      <h4>Net Profit Tax Estimate</h4>
      <p>
        {netTaxEstimate !== null ? (
          <>
            Net Profit Tax Estimate for {selectedYear} {selectedQuarter}:{" "}
            {netTaxEstimate}
          </>
        ) : (
          "Please select a quarter and year to calculate the tax estimate."
        )}
      </p>
      <button onClick={calculateNetProfitTax}>
        Calculate Net Profit Tax Estimate
      </button>
    </div>
  );
};

export {
  ProfitCalculation1,
  ProfitCalculation2,
  TimeframeSelector,
  GrossProfitTaxEstimate,
  NetProfitTaxEstimate,
};
