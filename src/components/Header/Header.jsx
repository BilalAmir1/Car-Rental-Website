import React, { useRef, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from '../logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../UI/LoginButton";
import UserProfile from "../UI/UserProfile";

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

const Header = () => {

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const {isAuthenticated, loginWithRedirect} = useAuth0();
  return (
    <header className="header">
      {/* ============ header top ============ */}
      
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <p>Call Now ! +92 301 5588995</p>
              </div>
            </Col>
            
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

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
              
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {!isAuthenticated ?(<Link to="#" className=" d-flex align-items-center gap-1" onClick={loginWithRedirect}>
                  <LoginButton />
                </Link>) :  (
                  <UserProfile />)
                }
              </div>
            
              
              </div>
              
            </div>
          </div>
          
        </Container>
      </div>
    </header>
  );
};

export default Header;
