import React from "react";
// import { signInWithRedirect } from "firebase/auth";

import { auth, provider } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

import { FaRegUser } from "react-icons/fa";
const User = ({ user, setUser }) => {
const handleAuth = async () => {
  try {
    if (user) {
      await signOut(auth);
      setUser(null);
    } else {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    }
  } catch (err) {
    console.log(err);
  }
};



  return (
    <div
      className=" rounded-2xl p-1 hover:cursor-pointer"
      onClick={ handleAuth}
    >
      {user?.photoURL ? (
        <img src={user.photoURL} alt="user" className="w-7 h-7 rounded-full" />
      ) : (
        < FaRegUser />
      )}
    </div>
  );
};

export default User;
