import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import Heart from "./Heart";

const CarItem = (props) => {
  const { id, name, color, brand, transmission, costPerHour, imgUrl } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
           <Heart id={id}/>
        <img src={imgUrl} alt="" className="w-100" width={100} height={200}/>
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{name}</h4>
          <h6 className="rent__price text-center mt-">
            {costPerHour} Rs<span>/ Hour</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {brand}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {transmission}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-palette-line"></i> {color}
            </span>
          </div>
          <div className="center-container">
          <Link to={`/cars/${name}`} className="w-100 text-center car__btn-rent">
          Details
          </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
