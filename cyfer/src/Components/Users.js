import { useState, useEffect } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
    const [users, setUsers] = useState();
    const refresh = useRefreshToken(); // define the function
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getUsers = async () => {
            try {
                const response = await axios.get("/users", {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
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
            <button onClick={() => refresh()}>Refresh</button>
            <br />
        </article>
    );
};

export default Users;
