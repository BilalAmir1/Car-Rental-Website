import React from 'react'
import logo from '../logo.png';
import "../../styles/navBar.css";

const navLinks = [
 
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];


const NavBar = () => {
  return (
    <div className="main__navbar">
  <Container className="navBar">
    <div className="navigation__wrapper d-flex align-items-center justify-content-between">
      <span className="mobile__menu">
        <i className="ri-menu-line" onClick={toggleMenu}></i>
      </span>

      <div className="navigation" ref={menuRef} onClick={toggleMenu}>
        <div className="menu">
          <img src={logo} alt="logo" style={{height: '60px', width: '120px'}} />
          {navLinks.map((item, index) => (
            <NavLink
              to={item.path}
              className={(navClass) =>
                navClass.isActive ? "nav__active nav__item" : "nav__item"
              }
              key={index}
            >
              {item.display}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  </Container>
</div>

  )
}

export default NavBar