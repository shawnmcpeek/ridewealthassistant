import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignInForm from "./login.component.jsx";
import Profile from "./profile.component.jsx";
import BugHelpSection from "./bug_contact.component.jsx";
import FAQComponent from "./faq.component.jsx";
import "../../app3.scss";
import ExportDataComponent from "./exporttocsv.component.jsx";
import DisclaimerComponent from "../taxes.component/disclaimer.component.jsx";

function UserComponent({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);

  return (
    <div>
      <h2>User</h2>
      <div className="input-group">
        <div className="input-row">
          <Link className="primary-button" to="/user/login">
            Login/Logout
          </Link>
          <Link className="primary-button" to="/user/profile">
            User Profile
          </Link>
          <Link className="primary-button" to="/user/bug-feature">
            Submit a Bug/Feature/Get Help
          </Link>
          <Link className="primary-button" to="/user/export">
            Export Financial Data
          </Link>
          <Link className="primary-button" to="/user/about">
            About
          </Link>
          <Link className="primary-button" to="/user/legal">
            Legal
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="login" element={<SignInForm onRender={onRender} />} />
        <Route path="profile" element={<Profile onRender={onRender} />} />
        <Route
          path="bug-feature"
          element={<BugHelpSection onRender={onRender} />}
        />
        <Route
          path="export"
          element={<ExportDataComponent onRender={onRender} />}
        />
        <Route path="about" element={<FAQComponent onRender={onRender} />} />
        <Route
          path="legal"
          element={<DisclaimerComponent onRender={onRender} />}
        />
      </Routes>
    </div>
  );
}

export default UserComponent;
