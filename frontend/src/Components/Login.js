import { useState } from "react";
import { TextField, Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function getToken() {
        await axios.post('http://localhost:8000/users/login', {
            username: username,
            password: password
        })
        .then((res)=>{
            console.log(res)
            localStorage.setItem('refreshToken', res.data.refresh)
            localStorage.setItem('accessToken', res.data.access)
            const decoded = jwtDecode(res.data.access);

            console.log(decoded);
            localStorage.setItem('username', decoded.username)
            navigate('/chat/None')
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className="container text-center">
            <div className="mt-3">
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mt-3">
                <TextField 
                    id="password" 
                    type="password" 
                    label="Password" 
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className="mt-3">
                <Button 
                    variant="contained" 
                    onClick={(e) => getToken()}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}