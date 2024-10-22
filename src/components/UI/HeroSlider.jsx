import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h1 className="text-light mb-3">Rent a Car Islamabad - Without & With Driver No Hidden Fees, Easy Booking Process</h1>
            <p className="text-light mb-4">Royal Car Rentals is providing hassle-free and convenient travel experience, allowing you to explore the city and its surrounding areas</p>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
        <div className="slider__content ">
            <h1 className="text-light mb-3">Rent a Car Islamabad - Without & With Driver No Hidden Fees, Easy Booking Process</h1>
            <p className="text-light mb-4">Royal Car Rentals is providing hassle-free and convenient travel experience, allowing you to explore the city and its surrounding areas</p>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
        <div className="slider__content ">
            <h1 className="text-light mb-3">Rent a Car Islamabad - Without & With Driver No Hidden Fees, Easy Booking Process</h1>
            <p className="text-light mb-4">Royal Car Rentals is providing hassle-free and convenient travel experience, allowing you to explore the city and its surrounding areas</p>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
