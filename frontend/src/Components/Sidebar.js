import { useState, useEffect } from "react";
import { Box, LinearProgress, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [users, setUsers] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }

    async function getNewAccessToken() {
        await axios.post('http://localhost:8000/users/token/refresh', {
            refresh: localStorage.getItem('refreshToken')
        }).then((res) => {
            console.log(res)

        })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getUsers() {
        await axios.get('http://localhost:8000/users/', {
            headers: headers
        }).then((res) => {
            console.log(res)
            if (res.data.status === "Success") {
                setUsers(res.data.data)
                console.log(users)
            }
        }).catch((err) => {
            console.log(err)
            console.log(err.response)
            // if (err.response.statusText === "Unauthorized") {
            //     getNewAccessToken()
            // }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])


    // useEffect(()=>{},[users])

    return (
        <div className="sidebar">
            {users.length === 0 ?
                (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) :
                (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {users.map((user, index) => (
                            <ListItem key={index}>
                                <Link 
                                    to={`/chat/${user.username}`}
                                >
                                    <ListItemText primary={user.username} sx={{ color: "black" }} />
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                )
            }

        </div>
    )
}