import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">Get Information</h4>
              <h2 className="section__title">About Premium Rent a Car Services</h2>
              <p className="section__description">
              Royal Car Rentals is one of the leading car rental companies in Pakistan established in 2005. At Royal Car Rentals everything we do is about giving you the freedom to discover more. We’ll move mountains to find you the right rental car, and bring you a smooth, hassle-free experience from start to finish. We are mainly operating in Islamabad, Lahore, Karachi and catering respective surroundings. We attribute our success to innovative with modern fleet management systems and to a team of dedicated and experienced employees who ensure that your experience with Royal Car Rentals is always hassle-free, smooth and safe.
              </p>

            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
