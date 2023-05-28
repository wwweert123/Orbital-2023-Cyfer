import Login from "./Components/LoginComponent/Login";
import Register from "./Components/Register/Register";

import { useState } from "react";
import Page from "./Pages/index";

function App() {
    const [register, setRegister] = useState(false);
    return (
        <main>
            <Page />
            {register ? <Register showRegister={setRegister} /> : null};
            {!register ? <Login showRegister={setRegister} /> : null};
        </main>
    );
}

export default App;
