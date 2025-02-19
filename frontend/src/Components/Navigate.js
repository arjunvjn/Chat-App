import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Navigate() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken'))
            setIsLoggedIn(true)
        else
            setIsLoggedIn(false)
    }, [isLoggedIn])

    async function userLogout() {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
        await axios.post('http://localhost:8000/users/logout', {
            refresh_token: localStorage.getItem('refreshToken')
        },
            {
                headers: headers
            }
        )
            .then((res) => {
                console.log(res)
                // if (res.status === "Success") {

                // }
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response)
                // if (err.response.statusText === "Unauthorized") {
                // }
            })

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        navigate('/login')

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Chat App
                    </Typography>
                    {localStorage.getItem('accessToken') ?
                        <>
                            <Button color="inherit" onClick={() => userLogout()}>Logout</Button>
                        </> :
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}