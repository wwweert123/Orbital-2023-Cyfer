import Login from "./Components/LoginComponent/Login";
import LoginPage from "./Layouts/LoginPage";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Missing from "./Pages/Missing";
import Unauthorized from "./Pages/Unauthorized";
import DashboardHome from "./Pages/DashboardHome";
import UsersPage from "./Pages/UsersPage";
import CreatePage from "./Pages/CreatePage";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import DashboardLayout from "./Layouts/DashboardLayout";

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

function App() {
    // const [register, setRegister] = useState(false);
    return (
        <Routes>
            {/* public routes */}
            <Route element={<LoginPage />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
            {/* we want to protect these routes */}
            <Route element={<PersistLogin />}>
                <Route element={<DashboardLayout />}>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/" element={<DashboardHome />} />
                    </Route>

                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="create" element={<CreatePage />} />
                    </Route>

                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                    >
                        <Route path="admin" element={<UsersPage />} />
                    </Route>
                </Route>
            </Route>
            {/* catch all */}
            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
