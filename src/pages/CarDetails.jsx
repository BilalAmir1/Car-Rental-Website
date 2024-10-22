import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import useCars from "../hooks/useCars"
import { PuffLoader } from "react-spinners";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../hooks/useAuthCheck";
import BookingModal from "./BookingModal";

import Button from 'react-bootstrap/Button';


const CarDetails = () => {
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const [openModal, setOpenModal] = useState(false);
  const { data, isError, isLoading } = useCars();
  const { slug } = useParams();

  useEffect(() => {
    // You can perform additional logic or side effects here
  }, [/* dependencies if needed */]);

  if (isError) {
    return <div className="wrapper">Error while fetching data</div>;
  }

  if (isLoading) {
    return (
      <div className="wrapper flexcenter" style={{ height: "60vh" }}>
        <PuffLoader height="180" width="180" radius={1} color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  const singleCarItem = data.find((item) => item.name === slug);


  return (
    <Helmet title={singleCarItem.name}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    Rs {singleCarItem.costPerHour}/perHour
                  </h6>

                  
                </div>


                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    Brand:{singleCarItem.brand}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    Transmission:   {singleCarItem.transmission}
                  </span>
               

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-palette-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.color}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line" style={{ color: "#f9a826" }}></i>{" "}
                    Year:{singleCarItem.year}
                  </span>
                  
                
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
        <Button variant="outline-primary" onClick={() => {
          validateLogin() &&  setOpenModal(true)
        }} >
          Reserve Now
        </Button>
        {openModal && <BookingModal closeModal={setOpenModal} carId = {singleCarItem.id} userEmail ={user?.email} costPerHour={singleCarItem.costPerHour}/>}
            </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;



//previous code with hook error but not serious one

// import React, { useState } from "react";

// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import { useParams } from "react-router-dom";
// import useCars from "../hooks/useCars"
// import { PuffLoader } from "react-spinners";
// import { useAuth0 } from "@auth0/auth0-react";
// import useAuthCheck from "../hooks/useAuthCheck";
// import BookingModal from "./BookingModal";

// import Button from 'react-bootstrap/Button';


// const CarDetails = () => {
//   const { validateLogin } = useAuthCheck();
//   const { user } = useAuth0();
//   const [openModal, setOpenModal] = useState(false);

//   const { data, isError, isLoading } = useCars();
//   if (isError) {
//     return <div className="wrapper">Error while fetching data</div>;
//   }
//   if (isLoading) {
//     return (
//       <div className="wrapper flexcenter" style={{ height: "60vh" }}>
//         <PuffLoader height="180" width="180" radius={1} color="#4066ff" aria-label="puff-loading" />
//       </div>
//     );
//   }

//   const { slug } = useParams();
//   const singleCarItem = data.find((item) => item.name === slug);

//   return (
//     <Helmet title={singleCarItem.name}>
//       <section>
//         <Container>
//           <Row>
//             <Col lg="6">
//               <img src={singleCarItem.imgUrl} alt="" className="w-100" />
//             </Col>

//             <Col lg="6">
//               <div className="car__info">
//                 <h2 className="section__title">{singleCarItem.name}</h2>

//                 <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
//                   <h6 className="rent__price fw-bold fs-4">
//                     Rs {singleCarItem.costPerHour}/perHour
//                   </h6>

                  
//                 </div>


//                 <div
//                   className=" d-flex align-items-center mt-3"
//                   style={{ columnGap: "4rem" }}
//                 >
//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       className="ri-roadster-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     Brand:{singleCarItem.brand}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       className="ri-settings-2-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     Transmission:   {singleCarItem.transmission}
//                   </span>
               

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       className="ri-palette-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {singleCarItem.color}
//                   </span>
//                 </div>

//                 <div
//                   className=" d-flex align-items-center mt-3"
//                   style={{ columnGap: "2.8rem" }}
//                 >
//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i className="ri-calendar-line" style={{ color: "#f9a826" }}></i>{" "}
//                     Year:{singleCarItem.year}
//                   </span>
                  
                
//                 </div>
//               </div>
//             </Col>

//             <Col lg="7" className="mt-5">
//               <div className="booking-info mt-5">
//                 <h5 className="mb-4 fw-bold ">Booking Information</h5>
//         <Button variant="outline-primary" onClick={() => {
//           validateLogin() &&  setOpenModal(true)
//         }} >
//           Reserve Now
//         </Button>
//         {openModal && <BookingModal closeModal={setOpenModal} carId = {singleCarItem.id} userEmail ={user?.email} costPerHour={singleCarItem.costPerHour}/>}
//             </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default CarDetails;
