import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../utils/firebase/firebase.utils";
import TimeSelectComponent from "../time_select.component/time_select.component";

const AnnualDataExportComponent = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);

  useEffect(() => {
    console.log("Fetching data for selected year:", selectedYear);

    const fetchIncomeEntries = async () => {
      try {
        console.log("Fetching income entries...");
        const incomeSnapshot = await getDocs(collection(firestore, "income"));
        const incomeEntries = incomeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Income entries:", incomeEntries);

        let incomeTotal = 0;
        if (selectedYear) {
          const filteredIncomeEntries = incomeEntries.filter((entry) => {
            const date = entry.date?.toDate();
            if (!date) return false;
            const year = date.getFullYear();
            return year === Number(selectedYear);
          });
          console.log("Filtered income entries:", filteredIncomeEntries);
          incomeTotal = calculateTotalIncome(filteredIncomeEntries);
          setTotalIncome(incomeTotal);
        }
        console.log("Total income:", incomeTotal);
      } catch (error) {
        console.error("Error fetching income entries:", error);
      }
    };

    const fetchExpenseEntries = async () => {
      try {
        console.log("Fetching expense entries...");
        const expenseSnapshot = await getDocs(
          collection(firestore, "expenses")
        );
        const expenseEntries = expenseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Expense entries:", expenseEntries);

        let totalExpenses = 0;
        if (selectedYear) {
          const filteredExpenseEntries = expenseEntries.filter((entry) => {
            const date = entry.date; // Assuming 'date' is stored as a Firestore Timestamp
            if (!date) return false;
            const year = date.toDate().getFullYear();
            return year === Number(selectedYear);
          });
          console.log("Filtered expense entries:", filteredExpenseEntries);
          totalExpenses = calculateTotalExpenses(filteredExpenseEntries);
          setTotalExpenses(totalExpenses);
        }
        console.log("Total expenses:", totalExpenses);
      } catch (error) {
        console.error("Error fetching expense entries:", error);
      }
    };

    const fetchMileageEntries = async () => {
      try {
        console.log("Fetching mileage entries...");
        const mileageSnapshot = await getDocs(
          collection(firestore, "drivermileage")
        );
        const mileageEntries = mileageSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Mileage entries:", mileageEntries);

        let totalMileage = 0;
        if (selectedYear) {
          const filteredMileageEntries = mileageEntries.filter((entry) => {
            const date = entry.date?.toDate();
            if (!date) return false;
            const year = date.getFullYear();
            return year === Number(selectedYear);
          });
          console.log("Filtered mileage entries:", filteredMileageEntries);
          totalMileage = calculateTotalMileage(filteredMileageEntries);
          setTotalMileage(totalMileage);
        }
        console.log("Total mileage:", totalMileage);
      } catch (error) {
        console.error("Error fetching mileage entries:", error);
      }
    };

    fetchIncomeEntries();
    fetchExpenseEntries();
    fetchMileageEntries();
  }, [selectedYear]);

  const calculateTotalIncome = (entries) => {
    return entries.reduce((total, entry) => total + entry.amount, 0);
  };

  const calculateTotalExpenses = (entries) => {
    return entries.reduce(
      (total, entry) => total + parseFloat(entry.amount),
      0
    );
  };

  const calculateTotalMileage = (entries) => {
    return entries.reduce((total, entry) => total + entry.mileage, 0);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const exportToCSV = async () => {
    try {
      console.log("Exporting data to CSV for year:", selectedYear);
      const incomeSnapshot = await getDocs(collection(firestore, "income"));
      const incomeEntries = incomeSnapshot.docs.map((doc) => doc.data());
      console.log("Income entries for CSV export:", incomeEntries);

      const expenseSnapshot = await getDocs(collection(firestore, "expenses"));
      const expenseEntries = expenseSnapshot.docs.map((doc) => doc.data());
      console.log("Expense entries for CSV export:", expenseEntries);

      const filteredIncomeEntries = incomeEntries.filter((entry) => {
        const date = entry.date?.toDate();
        if (!date) return false;
        const year = date.getFullYear();
        return year === Number(selectedYear);
      });

      const filteredExpenseEntries = expenseEntries.filter((entry) => {
        const date = entry.date?.toDate();
        if (!date) return false;
        const year = date.getFullYear();
        return year === Number(selectedYear);
      });

      console.log(
        "Filtered income entries for CSV export:",
        filteredIncomeEntries
      );
      console.log(
        "Filtered expense entries for CSV export:",
        filteredExpenseEntries
      );

      const incomeTotal = calculateTotalIncome(filteredIncomeEntries);
      const expenseTotal = calculateTotalExpenses(filteredExpenseEntries);
      console.log("Total income for CSV export:", incomeTotal);
      console.log("Total expenses for CSV export:", expenseTotal);

      const categoryExpenses = {};
      filteredExpenseEntries.forEach((entry) => {
        const category = entry.category;
        if (!categoryExpenses[category]) {
          categoryExpenses[category] = 0;
        }
        categoryExpenses[category] += parseFloat(entry.amount);
      });

      console.log("Category expenses for CSV export:", categoryExpenses);

      const csvData = [
        ["", `${selectedYear}`, "Total YTD"],
        ["Income"],
        ["Revenue"],
        ["Sales", incomeTotal.toFixed(2)],
        ["Expenses"],
        ...Object.entries(categoryExpenses).map(([category, amount]) => [
          category,
          amount.toFixed(2),
        ]),
        ["Total Expenses", expenseTotal.toFixed(2)],
      ];

      console.log("CSV data:", csvData);

      const csvContent = csvData.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `financial_data_${selectedYear}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error exporting data to CSV:", error);
    }
  };

  const emailData = () => {
    // Logic to email the CSV data
    // Implement this functionality
  };

  return (
    <div>
      <h2>Annual Data Export</h2>
      <TimeSelectComponent onSelect={handleYearSelect} />

      {selectedYear && (
        <div>
          <h3>Selected Year: {selectedYear}</h3>
          <h3>Financial Data:</h3>
          <p>Total Income: ${totalIncome.toFixed(2)}</p>
          <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
          <p>Total Mileage: {totalMileage} miles</p>
          <button onClick={exportToCSV}>Export to CSV</button>
          <button onClick={emailData}>Email Data</button>
        </div>
      )}
    </div>
  );
};

export default AnnualDataExportComponent;
