import { initializeApp } from "firebase/app";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.PROJECT_KEY,
  authDomain: process.env.PROJECT_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.PROJECT_BUCKET,
  messagingSenderId: process.env.PROJECT_MESSAGE_ID,
  appId: process.env.PROJECT_APP_ID,
  measurementId: process.env.PROJECT_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
