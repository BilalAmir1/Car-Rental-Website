import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "/cars",
    display: "Car Listing",
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

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h3 className="footer__link-title">Explore</h3>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="4" md="4" sm="6">
            <div className="mb-4">
              <h3 className="footer__link-title mb-4">Contact</h3>
              <p className="office__info">Office # 8, Satti Mansion Plaza, F-10 Markaz Islamabad</p>
              <p className="office__info">+92 301 5588995</p>

              <p className="office__info">sales@royalcarrentals.pk</p>

              <p className="office__info">24/7</p>
            </div>
          </Col>

          <Col lg="4" md="4" sm="6">
            <div className="mb-4">
              <h3 className="footer__link-title mb-4">About us</h3>
              <p className="office__info">We are expert in Car Rental services provider since 2005 in Islamabad, Lahore, Karachi and Major Cities in Pakistan</p>
              
            </div>
          </Col>

          
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
