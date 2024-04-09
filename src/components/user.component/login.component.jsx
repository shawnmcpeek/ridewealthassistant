import React, { useState } from "react";
import styled from "styled-components";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

// FormInput component
const FormInput = ({ label, type, required, onChange, name, value }) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <Input
        type={type}
        required={required}
        onChange={onChange}
        name={name}
        value={value}
      />
    </InputContainer>
  );
};

// Button component
const Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

const SignInForm = () => {
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
    <>
      <SignInContainer>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <ButtonsContainer>
            <Button type="submit">Sign In</Button>
            <Button type="button" onClick={signInWithGoogle}>
              Sign In With Google
            </Button>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    </>
  );
};

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SignInForm;
