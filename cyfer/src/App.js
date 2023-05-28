import Login from "./Components/LoginComponent/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Pages/Dashboard";

import { useState } from "react";

function App() {
    const [register, setRegister] = useState(false);
    return (
        <main>
            <Dashboard />
            {/* {register ? <Register showRegister={setRegister} /> : null};
            {!register ? <Login showRegister={setRegister} /> : null}; */}
        </main>
    );
}

export default App;
