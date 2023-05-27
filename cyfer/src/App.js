import Login from "./Components/LoginComponent/Login";
import Register from "./Components/Register/Register";

import { useState } from "react";

function App() {
    const [register, setRegister] = useState(false);
    return (
        <main>
            {register ? <Register showRegister={setRegister} /> : null};
            {!register ? <Login showRegister={setRegister} /> : null};
        </main>
    );
}

export default App;
