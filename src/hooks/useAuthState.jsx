import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const useAuthState = (setIsAdmin) => {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, [setIsAdmin]);
};

export default useAuthState;
