import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; //import the hook
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };
        getUsers();
        return () => {
            isMounted = false;
            controller.abort(); // abort request
        };
        // return statement performs the cleanup when the component unmount or after the previous render
    }, []);
    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;
