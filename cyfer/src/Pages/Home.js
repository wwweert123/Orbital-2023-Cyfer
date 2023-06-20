import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import "./pages.css";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <section className="page">
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <a href="https://bejewelled-cendol-9e1d0d.netlify.app/">
                Go to Prototype Page
            </a>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button className="btn btn-primary" onClick={signOut}>
                    Sign Out
                </button>
            </div>
        </section>
    );
};

export default Home;
