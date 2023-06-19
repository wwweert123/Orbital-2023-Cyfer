import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// eslint-disable-next-line
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import ThemeProvider from "./theme";
import { HelmetProvider } from "react-helmet-async";

// if (process.env.NODE_ENV === 'production') {
//   disableReactDevTools();
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
