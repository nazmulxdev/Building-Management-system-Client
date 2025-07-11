import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import useAxios from "../../Hooks/useAxios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  const [currentUser, setCurrentUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const signInEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user?.email) {
        axiosInstance
          .post(
            "/api/validation",
            { email: user.email },
            {
              withCredentials: true,
            },
          )
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosInstance]);
  const authData = {
    currentUser,
    loading,
    setCurrentUser,
    registerUser,
    signInGoogle,
    signInEmailPassword,
    logOutUser,
    updateUser,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
