import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "./utils/firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          fullname: user.displayName,
          address: "",
          phone: "",
          DOB: "",
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Google sign-up failed", error);
    }
  };

  const handleSignUpWithEmail = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        fullname: fullName,
        address: "",
        phone: "",
        DOB: "",
      });

      // Clear the form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up with Google</h2>
      <button className="primary-button" onClick={handleSignUpWithGoogle}>
        <img
          src="/google-icon-logo-svgrepo-com.svg"
          alt="Google Logo"
          height="14"
          style={{ paddingRight: "5px" }}
        />
        Sign Up With Google
      </button>

      <h2>Sign Up with Email/Password</h2>
      <form onSubmit={handleSignUpWithEmail}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <button type="submit" className="primary-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;