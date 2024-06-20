import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB842Oj_SNvb1udWNTZFohd4zYrXhHwO-M",
  authDomain: "immobilier-423016.firebaseapp.com",
  projectId: "immobilier-423016",
  storageBucket: "immobilier-423016.appspot.com",
  messagingSenderId: "729110483076",
  appId: "1:729110483076:web:7d389359d89155b2e032d1",
  measurementId: "G-RX44T66YD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });

export { storage, auth, provider };
