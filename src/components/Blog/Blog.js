import { useState, useEffect } from "react";
import axios from "axios";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import { Link } from "react-router-dom";
function Blog() {
  const [getItem, setItem] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost/laravel/public/api/blog`)
      .then((res) => {
        setItem(res.data.blog);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // const handlePageChange = (pageNumber) => {};
  function fecthData() {
    if (Object.keys(getItem).length > 0) {
      return getItem.data.map((value, key) => {
        return (
          <div classNameName="single-blog-post" key={key}>
            <h3>{value.title}</h3>
            <div classNameName="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user"></i> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o"></i> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar"></i> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </span>
            </div>
            <a href="">
              <img
                src={
                  "http://localhost/laravel/public/upload/Blog/image/" +
                  value.image
                }
                alt=""
              />
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>
              Read More
            </Link>
          </div>
        );
      });
    }
  }
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Leftsidebar />
            </div>
            <div className="col-sm-9">{fecthData()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Blog;
