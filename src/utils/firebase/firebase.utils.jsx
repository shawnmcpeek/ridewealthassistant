import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, // Add this import
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import Firebase configuration from JSON file
import firebaseConfig from "./firebase.json";

// Initialize Firebase app with imported configuration
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Log the Firestore object for inspection
console.log("Firestore instance:", firestore);

// Define sign-in with Google Popup function
const signInWithGooglePopup = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

// Define sign-in with email and password function
const signInAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// Define create user with email and password function
const createAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export {
  app,
  analytics,
  auth,
  firestore,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword, // Export the new function
};
