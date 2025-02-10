import { initializeApp } from "firebase/app";
import admin from "firebase-admin"
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();
const pid = process.env.PROJECT_ID


const firebaseConfig = {
  apiKey: process.env.PROJECT_KEY,
  authDomain: process.env.PROJECT_DOMAIN,
  projectId: pid,
  storageBucket: process.env.PROJECT_BUCKET,
  messagingSenderId: process.env.PROJECT_MESSAGE_ID,
  appId: process.env.PROJECT_APP_ID,
  measurementId: process.env.PROJECT_MEASUREMENT_ID,
};

const serviceAccountPath = process.env.PROJECT_SERVICE_FILE || "";

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found: ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: pid, 
  databaseURL : `https://${{pid}}.firebaseio.com`
});

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = admin.firestore(); 
