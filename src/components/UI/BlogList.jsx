import React from "react";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import { PuffLoader } from "react-spinners";
import moment from "moment/moment.js";

const BlogList = () => {
  const{ data, isError, isLoading } = useBlogs();
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
    <>
      {data && data.map((item) => (
        <BlogItem item={item} key={item.id} />
      ))}
    </>
  );
};

const BlogItem = ({ item }) => {

  const { imgUrl, title, author, date, description } = item;

  const dateFromMongoDB = date;
const formattedDate = moment(dateFromMongoDB).format('DD MMMM, YYYY');

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={imgUrl} alt="" className="w-100" id="img_blog" />
        <div className="blog__info p-3">
          <Link to={`/blogs/${title}`} className="blog__title">
            {title}
          </Link>
          <p className="section__description mt-3">
            {description.length > 100
              ? description.substr(0, 100)
              : description}
          </p>

          <Link to={`/blogs/${title}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-calendar-line"></i> {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;
