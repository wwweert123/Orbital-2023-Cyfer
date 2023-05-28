import Login from "./Components/LoginComponent/Login";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";

import { useState } from "react";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Unauthorized from "./Components/Unauthorized";
import Home from "./Components/Home";

function App() {
    // const [register, setRegister] = useState(false);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
