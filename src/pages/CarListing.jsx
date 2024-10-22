import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import useCars from "../hooks/useCars"
import { PuffLoader } from "react-spinners";
import SearchBar from "../components/UI/SearchBar";
import "../styles/CarListing.css";



const CarListing = () => {
  const{data, isError, isLoading} = useCars();
  const [sortOption, setSortOption] = useState('');
  const [filter, setFilter] = useState('');
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


  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  // Sort the cars based on the selected option
  let sortedCars = [...data];
  if (sortOption === 'low') {
    sortedCars.sort((a, b) => a.costPerHour - b.costPerHour);
  } else if (sortOption === 'high') {
    sortedCars.sort((a, b) => b.costPerHour - a.costPerHour);
  }

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div>
                <div className="d-flex align-items-center gap-3 mb-5">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort Price By
                  </span>
                  <select  className="custom-select" onChange={handleSortChange} value={sortOption}>
                    <option value="">Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>

                {/* Display the sorted or unsorted list of cars */}
              </div>
            </Col>
            <SearchBar filter={filter} setFilter={setFilter} />
            <p></p>
            {sortedCars
              .filter(
                (car) =>
                  car.name.toLowerCase().includes(filter.toLowerCase()) ||
                  car.brand.toLowerCase().includes(filter.toLowerCase()) ||
                  car.color.toLowerCase().includes(filter.toLowerCase())
              )
              .map((item) => (
                <CarItem item={item} key={item.id} />
              ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


export default CarListing;



//previous code
// import React, { useState } from "react";
// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import CarItem from "../components/UI/CarItem";
// import useCars from "../hooks/useCars"
// import { PuffLoader } from "react-spinners";
// import SearchBar from "../components/UI/SearchBar";



// const CarListing = () => {
//   const{data, isError, isLoading} = useCars();
//   const [filter, setFilter] = useState("")
//   if(isError){
//     return( <div className="wrapper">Error while fetching data</div>)
//   }
//   if(isLoading){
//     return(
//       <div className="wrapper flexcenter" style={{height: "60vh"}}>
//         <PuffLoader height="180" width="180" radius={1} color="#4066ff" aria-label="puff-loading"/>
//       </div>
//     )
//   }
//   return (
//     <Helmet title="Cars">
//       <CommonSection title="Car Listing" />

//       <section>
//         <Container>
        
//           <Row>
//             <Col lg="12">
//               {/* <div className=" d-flex align-items-center gap-3 mb-5">
//                 <span className=" d-flex align-items-center gap-2">
//                   <i class="ri-sort-asc"></i> Sort By
//                 </span>

//                 <select>
//                   <option>Select</option>
//                   <option value="low">Low to High</option>
//                   <option value="high">High to Low</option>
//                 </select>
//               </div>
//               <div>
                
//               </div> */}
//             </Col>
//             <SearchBar filter={filter} setFilter={setFilter}/>
//             <p></p>
//             {/* {data.map((item) => (
//               <CarItem item={item} key={item.id} />
//             ))} */}
//             {
//               data
//               .filter(
//                 (Car) =>
//                   Car.name.toLowerCase().includes(filter.toLowerCase()) ||
//                   Car.brand.toLowerCase().includes(filter.toLowerCase())||
//                   Car.color.toLowerCase().includes(filter.toLowerCase())
//               )
//               .map((item) => (
//                 <CarItem item={item} key={item.id} />
//               ))
//             }
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default CarListing;
