import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import MileageComponent from "./components/mileage.component/mileage.component";
import MileagePullComponent from "./components/taxes.component/mileage_pull.component";
import ExpenseComponent from "./components/expenses.component/expense.component";
import IncomeComponent from "./components/income.component/income.component.jsx";

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
            <Link to="/income">Income</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mileage" element={<MileageComponent />} />
        <Route path="/mileage_calculator" element={<MileagePullComponent />} />
        <Route path="/expense" element={<ExpenseComponent />} />
        <Route path="/income" element={<IncomeComponent />} />
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
