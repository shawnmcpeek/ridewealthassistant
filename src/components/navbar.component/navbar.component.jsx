import React from "react";
import { Link } from "react-router-dom";
import notebookIcon from "../../assets/icons/icons8-notebook-48.png";
import dollarIcon from "../../assets/icons/icons8-dollar-48.png";
import receiptIcon from "../../assets/icons/icons8-receipt-48.png";
import taxesIcon from "../../assets/icons/icons8-tax-48.png";
import userIcon from "../../assets/icons/icons8-user-48.png";
import homeIcon from "../../assets/icons/icons8-home-64.png";
import "../../App.scss";

function NavbarComponent() {
  return (
    <div className="navbar" id="myNavbar">
      <div className="nav-item">
        <Link to="/" className="bruno-ace-regular">
          <img src={homeIcon} alt="Home Icon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/mileage" className="bruno-ace-regular">
          <img src={notebookIcon} alt="Notebook Icon" />
          <span>Mileage</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/expense" className="bruno-ace-regular">
          <img src={receiptIcon} alt="Receipt Icon" />
          <span>Expenses</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/income" className="bruno-ace-regular">
          <img src={dollarIcon} alt="Dollar Icon" />
          <span>Income</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/tax_estimates" className="bruno-ace-regular">
          <img src={taxesIcon} alt="Taxes Icon" />
          <span>Tax Estimates</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/user" className="bruno-ace-regular">
          <img src={userIcon} alt="User Icon" />
          <span>User</span>
        </Link>
      </div>
    </div>
  );
}

export default NavbarComponent;
