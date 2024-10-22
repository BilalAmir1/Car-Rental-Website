import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import "../../styles/LoginButton.css";

const LoginButton = () => {
    const {isAuthenticated, loginWithRedirect} = useAuth0();
  return (
    !isAuthenticated && (
        <button onClick={()=> loginWithRedirect()} style={{borderRadius:"10px"}}>
            Sign In
        </button>
    )
  )
}

export default LoginButton