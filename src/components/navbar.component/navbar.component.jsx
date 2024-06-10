import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notebookIcon from "../../assets/icons/icons8-notebook-48.png";
import dollarIcon from "../../assets/icons/icons8-dollar-48.png";
import receiptIcon from "../../assets/icons/icons8-receipt-48.png";
import taxesIcon from "../../assets/icons/icons8-tax-48.png";
import userIcon from "../../assets/icons/icons8-user-48.png";
import homeIcon from "../../assets/icons/icons8-home-64.png";
import "../../app3.scss";

function NavItem({ path, icon, label }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className={`nav-item ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <img src={icon} alt={`${label} Icon`} />
      <span>{label}</span>
    </div>
  );
}

function NavbarComponent() {
  return (
    <div className="navbar" id="myNavbar">
      <NavItem path="/" icon={homeIcon} label="Home" />
      <NavItem path="/mileage" icon={notebookIcon} label="Mileage" />
      <NavItem path="/expense" icon={receiptIcon} label="Expenses" />
      <NavItem path="/income" icon={dollarIcon} label="Income" />
      <NavItem path="/tax_estimates" icon={taxesIcon} label="Tax Estimates" />
      <NavItem path="/user" icon={userIcon} label="User" />
    </div>
  );
}

export default NavbarComponent;
