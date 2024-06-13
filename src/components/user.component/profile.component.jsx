import React, { useState, useEffect } from "react";
import "../../app3.scss";

function Profile({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
  const [fullName, setFullName] = useState("The Doctor");
  const [email, setEmail] = useState("thedoctor@example.com");
  const [phone, setPhone] = useState("(123) 456-7890");
  const [address, setAddress] = useState("123 Main St, TARDIS USA");
  const [dob, setDob] = useState("1990-11-08");
  const [updatedAddress, setUpdatedAddress] = useState(
    "123 Main St, TARDIS USA"
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateAddress = () => {
    // Simulate address update
    setAddress(updatedAddress);
    console.log("Address updated successfully!");
  };

  const handleUpdatePassword = () => {
    // Simulate password update
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    // Reset password fields
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="input-group">
        <div className="input-row">
          <label>
            <span>Full Name:</span>
            <input
              type="text"
              value={fullName}
              readOnly
              className="read-only input"
            />
          </label>
          <label>
            <span>Email Address:</span>
            <input
              type="email"
              value={email}
              readOnly
              className="read-only input"
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            <span>Phone Number:</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
          </label>
          <label>
            <span>Address:</span>
            <input
              type="text"
              value={updatedAddress}
              onChange={(e) => setUpdatedAddress(e.target.value)}
              className="input"
            />
          </label>
        </div>
        <div className="input-row">
          <label>
            <span>Date of Birth:</span>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input"
            />
          </label>
        </div>
      </div>
      <div className="input-group">
        <div className="input-row">
          <label>
            <span>Current Password:</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input"
            />
          </label>
          <label>
            <span>New Password:</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
            />
          </label>
        </div>
      </div>
      <div className="button-group-column">
        <button className="primary-button" onClick={handleUpdateAddress}>
          Update Profile
        </button>
        <button className="primary-button" onClick={handleUpdatePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
}

export default Profile;
