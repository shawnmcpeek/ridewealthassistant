import React, { useState } from "react";
import "../../app3.scss";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

function SignInForm({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields({ email: "", password: "", confirmPassword: "" });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        try {
          await signInAuthUserWithEmailAndPassword(email, password);
          resetFormFields();
        } catch (signInError) {
          console.error("User sign-in failed", signInError);
          // Handle sign-in error, show message to the user
        }
      } else {
        console.error("User creation failed", error);
        // Handle account creation error, show message to the user
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In or Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-row">
            <label>
              <span>Email</span>
              <input
                className="input"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
                autoComplete="off"
              />
            </label>
            <label>
              <span>Password</span>
              <input
                className="input"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
              />
            </label>
            <label>
              <span>Confirm Password</span>
              <input
                className="input"
                type="password"
                required
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
              />
            </label>
          </div>
        </div>
        <div className="button-group">
          <button className="primary-button" type="submit">
            Sign In / Sign Up
          </button>
          <button
            className="primary-button"
            type="button"
            onClick={signInWithGoogle}
          >
            <img
              src="/google-icon-logo-svgrepo-com.svg"
              alt="Google Logo"
              height="14"
              style={{ paddingRight: "5px" }}
            />
            Sign In With Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
