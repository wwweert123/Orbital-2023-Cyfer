import Login from "./Components/LoginComponent/Login";
import LoginPage from "./Components/LoginComponent/LoginPage";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";

import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Unauthorized from "./Components/Unauthorized";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

function App() {
    // const [register, setRegister] = useState(false);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route element={<LoginPage />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                </Route>

                {/* we want to protect these routes */}
                <Route element={<PersistLogin />}>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                    >
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
