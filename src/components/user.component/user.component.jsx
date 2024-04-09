import React from "react";
import SignInForm from "./login.component.jsx";

function UserComponent() {
  return (
    <div>
      <h2>User Component</h2>
      {/* Login/Logout section */}
      <section>
        <h3>Login/Logout</h3>
        {/* Include login form here */}
        <SignInForm />
      </section>
      {/* User Profile section */}
      <section>
        <h3>User Profile</h3>
        {/* Include user profile functionality here */}
      </section>
      {/* Bug/Feature Submission section */}
      <section>
        <h3>Submit a Bug</h3>
        {/* Include bug submission functionality here */}
        <h3>Submit a Feature</h3>
        {/* Include feature submission functionality here */}
      </section>
      {/* Get Help/Contact section */}
      <section>
        <h3>Get Help/Contact</h3>
        {/* Include help/contact functionality here */}
      </section>
    </div>
  );
}

export default UserComponent;
