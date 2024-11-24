import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

// function to sign out
export const handleClickSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    Navigate("/login");
  } catch (e) {
    console.error("Error : ", e);
  }
};
