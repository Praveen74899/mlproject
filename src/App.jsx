import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { Router,Routes,Route } from "express";

const App = ()=>{
return(
    <Router>
        <Routes>
            <Route path = "/login" element={<Login/>}/>
              <Route path = "/signup" element={<Signup/>}/>
                <Route path = "/forgot-password" element={<ForgotPassword/>}/>
                  <Route path = "/reset-password/:token" element={<ResetPassword/>}/>
        </Routes>
    </Router>
)
}

export default App;