import { useAuth0 } from '@auth0/auth0-react'
import React from 'react';
import "../../styles/UserProfile.css";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const {isAuthenticated, user, logout} = useAuth0();
    const navigate = useNavigate()
    return (
      isAuthenticated && (
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {user?.name}
  </Dropdown.Toggle>

  <Dropdown.Menu className='drp_menu'>
  <Dropdown.Item  style={{ color: 'Black', fontSize:18}} className='drp' onClick={() => navigate("./favourites", {replace:true})}>Favourite Cars</Dropdown.Item>
  <Dropdown.Item  style={{ color: 'Black', fontSize:18}} className='drp'>Car Bookings</Dropdown.Item>
  <Dropdown.Item  onClick={()=> {localStorage.clear(); logout()}} style={{ color: 'Black', fontSize:18}} className='drp'>Sign out</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
      )
  )
}

export default UserProfile