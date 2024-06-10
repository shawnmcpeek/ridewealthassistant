import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MileageComponent from "./components/mileage.component/mileage.component";
import ExpenseComponent from "./components/expenses.component/expense.component";
import IncomeComponent from "./components/income.component/income.component.jsx";
import UserComponent from "./components/user.component/user.component.jsx";
import EstTaxComponent from "./components/taxes.component/estimated_tax.component.jsx";
import NavbarComponent from "./NavbarComponent.js";
import DefaultContentComponent from "./components/default.component/default.component.jsx";
import TopBarComponent from "./components/topbar.component/topbar.component.jsx";
import "./App.scss";

function Dashboard() {
  return (
    <div>
      <TopBarComponent />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<DefaultContentComponent />} />
          <Route path="/mileage" element={<MileageComponent />} />
          <Route path="/expense" element={<ExpenseComponent />} />
          <Route path="/income" element={<IncomeComponent />} />
          <Route path="/tax_estimates/*" element={<EstTaxComponent />} />
          <Route path="/user/*" element={<UserComponent />} />
        </Routes>
      </div>
      <NavbarComponent />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}

export default App;
