//import { Link } from "react-router-dom";
import "./pages.css";
import Users from "../Components/Users";
import { Helmet } from "react-helmet-async";

// mui
import { Typography, Container, Card } from "@mui/material";

const UsersPage = () => {
    return (
        <>
            <Helmet>
                <title> User | Minimal UI </title>
            </Helmet>
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    User List
                </Typography>
                {/* <Users /> */}
                <Card>
                    <Users />
                </Card>
            </Container>
            {/* <section className="page">
                <h1>Admin Page</h1>
                <br />
                <Users />
                <br />
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section> */}
        </>
    );
};

export default UsersPage;
