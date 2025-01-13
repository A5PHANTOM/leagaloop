import React from "react";

import { Route,Routes } from "react-router-dom";


import Home from "./pages/Home";
import About from "./pages/About";
import Terms from "./pages/Terms";


function App(){
  return(
    <>
<Routes>
<Route path="/"element={<Home/>}/>
<Route path="/About"element={<About/>}/>
<Route path="/Terms"element={<Terms/>}></Route>
</Routes>
</>
  )}



export default App;