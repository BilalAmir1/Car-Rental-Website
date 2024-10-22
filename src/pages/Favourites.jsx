import React, { useContext, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import useCars from "../hooks/useCars"
import { PuffLoader } from "react-spinners";
import SearchBar from "../components/UI/SearchBar";
import UserDetailContext from "../context/userDetailContext";



const Favourites = () => {
  const{data, isError, isLoading} = useCars();
  const [filter, setFilter] = useState("")
  const {userDetails: {favourites}} = useContext(UserDetailContext);
  if(isError){
    return( <div className="wrapper">Error while fetching data</div>)
  }
  if(isLoading){
    return(
      <div className="wrapper flexcenter" style={{height: "60vh"}}>
        <PuffLoader height="180" width="180" radius={1} color="#4066ff" aria-label="puff-loading"/>
      </div>
    )
  }
  return (
    <Helmet title="Cars">
      <CommonSection title="Favourite Cars" />

      <section>
        <Container>
        
          <Row>
            <Col lg="12">
              {/* <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div> */}
              <div>
                
              </div>
            </Col>
            <SearchBar filter={filter} setFilter={setFilter}/>
            <p></p>
            {/* {data.map((item) => (
              <CarItem item={item} key={item.id} />
            ))} */}
            {
              data
              .filter((Car) => favourites.includes(Car.id))
              .filter(
                (Car) =>
                  Car.name.toLowerCase().includes(filter.toLowerCase()) ||
                  Car.brand.toLowerCase().includes(filter.toLowerCase())||
                  Car.color.toLowerCase().includes(filter.toLowerCase())
              )
              .map((item) => (
                <CarItem item={item} key={item.id} />
              ))
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Favourites;
