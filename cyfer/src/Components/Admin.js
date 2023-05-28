import { Link } from "react-router-dom";
import "./pages.css";

const Admin = () => {
    return (
        <section className="page">
            <h1>Admin Page</h1>
            <br />
            <p>You must have been assigned an Admin Role</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    );
};

export default Admin;
