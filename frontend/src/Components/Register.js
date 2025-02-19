import { useState } from "react";
import { TextField, Button } from '@mui/material';
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    async function createAccount() {
        console.log(username)
        console.log(phoneNumber)
        console.log(password)
        console.log(confirmPassword)
        if (password && password === confirmPassword) {
            setPasswordMatch(true)
            await axios.post("http://localhost:8000/users/register",{
                username: username,
                password: password,
                phone_number: phoneNumber
            })
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>console.log(err))
        }
        else
            setPasswordMatch(false)
    }

    return (
        <div className="container text-center">
            {/* <div className="mt-3">
                REGISTER
            </div> */}
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
                    id="phoneNumber" 
                    type="number" 
                    label="Phone Number" 
                    variant="outlined" 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                />
            </div>
            <div className="mt-3">
                <TextField 
                    id="password" 
                    type="password" 
                    label="Password" 
                    variant="outlined" 
                    error={!password}
                    helperText={!password && "Password shouldn't be empty"}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className="mt-3">
                <TextField 
                    id="confirmPassword" 
                    type="password" 
                    label="confirm Password" 
                    variant="outlined" 
                    error={!passwordMatch}
                    helperText={!passwordMatch && password && "Password doesn't match"}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
            </div>
            <div className="mt-3">
                <Button 
                    variant="contained" 
                    onClick={(e) => createAccount()}
                >
                    Register
                </Button>
            </div>
        </div>
    )
}