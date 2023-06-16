//import "./login.css";
import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

//mui
import { Stack, TextField, Checkbox, Button } from "@mui/material";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput("user", ""); //useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [check, toggleCheck] = useToggle("persist", false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            //setUser("");
            resetUser();
            setPwd("");
            // setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };

    // const togglePersist = () => {
    //     setPersist((prev) => !prev);
    // };

    // useEffect(() => {
    //     localStorage.setItem("persist", persist);
    // }, [persist]);

    return (
        <div className="loginpage-container">
            <section className="login--container">
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Sign In</h1>
                <Stack spacing={3}>
                    <TextField
                        type="text"
                        id="username"
                        ref={userRef}
                        name="email"
                        label="Email address"
                        autoComplete="off"
                        {...userAttribs}
                        required
                    />
                    <TextField
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        name="password"
                        label="Password"
                    />
                    <div className="persistCheck">
                        <Checkbox
                            type="checkbox"
                            id="persist"
                            onChange={toggleCheck}
                            checked={check}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                    </div>
                </Stack>
                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
                <p>
                    Need an Account?
                    <br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        </div>
    );
};

export default Login;
