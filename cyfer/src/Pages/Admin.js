import { Link } from "react-router-dom";
import "./pages.css";
import Users from "../Components/Users";

const Admin = () => {
    return (
        <section className="page">
            <h1>Admin Page</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    );
};

export default Admin;
