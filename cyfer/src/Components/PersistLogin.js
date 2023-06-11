import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import Sidebar from "./SideNav/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import "./persistlogin.css";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
    const [theme, colorMode] = useMode();
    //warning when there is setisSideBar
    const [isSidebar] = useState(true);
    // let isMounted = true;
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage("persist", false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                // isMounted &&
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        // return () => (isMounted = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <>
            {!persist ? (
                <div className="homeLayout">
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Sidebar isSidebar={isSidebar} />
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                    <Outlet />
                </div>
            ) : isLoading ? (
                <Loader />
            ) : (
                <div className="homeLayout">
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Sidebar isSidebar={isSidebar} />
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                    <Outlet />
                </div>
            )}
        </>
    );
};

export default PersistLogin;
