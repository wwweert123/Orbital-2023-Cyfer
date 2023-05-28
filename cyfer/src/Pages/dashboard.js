import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
// import {
//   Ecommerce,
//   Orders,
//   Calendar,
//   Employees,
//   Stacked,
//   Pyramid,
//   Customers,
//   Kanban,
//   Line,
//   Area,
//   Bar,
//   Pie,
//   Financial,
//   ColorPicker,
//   ColorMapping,
//   Editor,
// } from "./pages";
import "./Dashboard.css";

import { useStateContext } from "../context/ContextProvider";

const Dashboard = () => {
    // const {
    //     setCurrentColor,
    //     setCurrentMode,
    //     currentMode,
    //     activeMenu,
    //     currentColor,
    //     themeSettings,
    //     setThemeSettings,
    // } = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem("colorMode");
        const currentThemeMode = localStorage.getItem("themeMode");
        if (currentThemeColor && currentThemeMode) {
            //setCurrentColor(currentThemeColor);
            //setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <div>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div
                        className="fixed right-4 bottom-4"
                        style={{ zIndex: "1000" }}
                    >
                        <TooltipComponent content="Settings" position="Top">
                            <button
                                type="button"
                                // onClick={() => setThemeSettings(true)}
                                style={{
                                    borderRadius: "50%",
                                }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                <FiSettings />
                            </button>
                        </TooltipComponent>
                    </div>

                    <div>
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            {/* <Navbar /> */}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default Dashboard;
