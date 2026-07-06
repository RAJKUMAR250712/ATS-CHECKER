import React from 'react'
import'./App.css'
import Nav from './components/navbar/Nav'
import Main from './components/hero/Main'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <div className='flex flex-col min-h-screen w-full'>
      <Nav/>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
    </div>
    
    </BrowserRouter>
  )
}

export default App





// import React from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Nav from "./components/navbar/Nav";
// import Main from "./components/hero/Main";
// import Dashboard from "./pages/Dashboard";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="flex flex-col min-h-screen w-full">

//         <Nav />

//         <Routes>
//           {/* HOME PAGE */}
//           <Route path="/" element={<Main />} />

//           {/* DASHBOARD PAGE */}
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>

//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;



// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Nav from "./components/navbar/Nav";
// import Main from "./components/hero/Main";
// import Card from "./components/hero/Card";
// import Dashboard from "./pages/Dashboard";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Nav />

//       <Routes>
//         <Route path="/" element={<Main />} />
//         <Route path="/upload" element={<Card />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;