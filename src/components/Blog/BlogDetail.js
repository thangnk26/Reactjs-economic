import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";
function BlogDetail(props) {
  let params = useParams();
  const [getData, setData] = useState("");
  const [cmt, setCmt] = useState([]);
  const [id, setId] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost/laravel/public/api/blog/detail/` + params.id)
      .then((res) => {
        setData(res.data.data);
        setCmt(res.data.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function getComment(getData) {
    setCmt(cmt.concat(getData));
  }
  function getId(id) {
    setId(id);
  }

  function fetchDetail() {
    if (Object.keys(getData).length > 0) {
      return (
        <div className="single-blog-post">
          <h3>{getData.title}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
          </div>
          <a href="">
            <img
              src={
                "http://localhost/laravel/upload/Blog/image/" + getData.image
              }
              alt=""
            />
          </a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>{" "}
          <br />
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>{" "}
          <br />
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>{" "}
          <br />
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <div className="pager-area">
            <ul className="pager pull-right">
              <li>
                <a href="#">Pre</a>
              </li>
              <li>
                <a href="#">Next</a>
              </li>
            </ul>
          </div>
        </div>
      );
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
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchDetail()}
                <Rate />
                <div className="response-area">
                  <h2>Response</h2>
                  <ListComment list={cmt} getId={getId} />
                </div>
                <Comment getComment={getComment} idReply={id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default BlogDetail;
