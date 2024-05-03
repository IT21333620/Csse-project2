import React from 'react'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('home');
    };


  return (
    <div>Login

    <Button onClick={handleLogin}>
        Login
    </Button>
    </div>
    
  )
}

export default Login