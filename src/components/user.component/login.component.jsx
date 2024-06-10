import React, { useState } from "react";
import "../../app3.scss";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

function SignInForm({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields({ email: "", password: "" });
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

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      console.error("User sign-in failed", error);
      // Handle sign-in error, show message to the user
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
          </div>
        </div>
        <div className="button-group">
          <button className="primary-button" type="submit">
            Sign In
          </button>
          <button
            className="primary-button"
            type="button"
            onClick={signInWithGoogle}
          >
            <img src="/google-icon-logo-svgrepo-com.svg" alt="Google Logo" />
            Sign In With Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
