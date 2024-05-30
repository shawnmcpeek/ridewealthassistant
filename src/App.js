import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import MileageComponent from "./components/mileage.component/mileage.component";
import MileagePullComponent from "./components/taxes.component/mileage_pull.component";
import ExpenseComponent from "./components/expenses.component/expense.component";
import IncomeComponent from "./components/income.component/income.component.jsx";
import ExpensePullComponent from "./components/taxes.component/expenses_pull.component.jsx";
import IncomePullComponent from "./components/taxes.component/income_pull.component.jsx";
import GrossEstimatedTaxPaymentComponent from "./components/taxes.component/gross_est_tax.component.jsx";
import NetIncomeTaxEstimateComponent from "./components/taxes.component/net_est_tax.component.jsx";
import AnnualDataExportComponent from "./components/user.component/export.component.jsx";


function Dashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/mileage">Mileage</Link>
          </li>
          <li>
            <Link to="/mileage_calculator">Mileage Calculator</Link>
          </li>
          <li>
            <Link to="/expense">Expenses</Link>
          </li>
          <li>
            <Link to="/expense_calculator">Expense Calculator</Link>
          </li>
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li>
            <Link to="/income_calculator">Income Calculator</Link>
          </li>
          <li>
            <Link to="/gross_estimated_calculator">Gross Income Estimated Tax Calculator</Link>
          </li>
          <li>
            <Link to="/net_estimated_calculator">Net Income Estimated Tax Calculator</Link>
          </li>
          <li>
            <Link to="/annual_export">Annual Data Export</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mileage" element={<MileageComponent />} />
        <Route path="/mileage_calculator" element={<MileagePullComponent />} />
        <Route path="/expense" element={<ExpenseComponent />} />
        <Route path="/expense_calculator" element={<ExpensePullComponent />} />
        <Route path="/income" element={<IncomeComponent />} />
        <Route path="/income_calculator" element={<IncomePullComponent />} />
        <Route path="/gross_estimated_calculator" element={<GrossEstimatedTaxPaymentComponent />} />
        <Route path="/net_estimated_calculator" element={<NetIncomeTaxEstimateComponent />} />
        <Route path="/annual_export" element={<AnnualDataExportComponent />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h1>Welcome to the Dashboard</h1>;
}

function App() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}

export default App;
