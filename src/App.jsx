import React from "react";

import { Route,Routes } from "react-router-dom";


import Home from "./pages/Home";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Chatbot from "./pages/Chatbot";
import LawyerPage from "./pages/lawyer";
import Booking from "./pages/Booking";








function App(){
  return(
    <>

<Routes>
<Route path="/"element={<Home/>}/>
<Route path="/About"element={<About/>}/>
<Route path="/Terms"element={<Terms/>}/>
<Route path="/Chatbot"element={<Chatbot/>}/>
<Route path="/Lawyer"element={<LawyerPage/>}/>
<Route path="/Booking"element={<Booking/>}/>
</Routes>
</>
  )}



export default App;