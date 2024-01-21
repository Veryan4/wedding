import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";
import { Guest } from "../models/guest.model";

initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
});

const db = getFirestore();
const guestsCollection = collection(db, "guests");
const getGuests = () => getDocs(guestsCollection);
const guestRef = (email: string) => doc(guestsCollection, email);

function getGuest(email: string) {
  return getDoc(guestRef(email)).then((docSnap) => {
    if (docSnap.exists()) {
      return docSnap.data() as Guest;
    }
    return null;
  });
}

function setGuest(guest: Guest) {
  return setDoc(guestRef(guest.email), guest);
}

export const guestService = {
  getGuest,
  setGuest,
  getGuests
};
