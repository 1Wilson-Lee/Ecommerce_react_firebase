import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCecDb64OFsBxEVIgoIjlv23KkafwfTAYM",
  authDomain: "ecommerceanant.firebaseapp.com",
  projectId: "ecommerceanant",
  storageBucket: "ecommerceanant.appspot.com",
  messagingSenderId: "218622103637",
  appId: "1:218622103637:web:ecddae60751b16a8f204dc"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutUser = () => signOut(auth);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
