import React from 'react'
import Logo from './Logo'
import Title from './Title'
import User from './User'
import { useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useEffect } from 'react';

const Nav = () => {
  const [user, setUser] = useState(null)
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);
  return (
   < >
   <div className='flex  bg-zinc-600 justify-between items-center py-4 px-8 text-white h-15 w-full sticky top-0 z-50 '>
     <div className='flex gap-4'>
       <Logo/>
        <Title/>
     </div>
     <div>
        <User user={user}  setUser={setUser}/>
     </div>
   </div>
    
   </>
  )
}

export default Nav