import { Link } from "react-router-dom";
import React, { useState } from "react";
function ListComment(props) {
  let data = props.list;
  const handleClick = (e) => {
    props.getId(e.target.id);
  };
  function fetchList() {
    if (data.length > 0) {
      return data.map((item, key) => {
        if (item.id_comment == 0) {
          return (
            <>
              <li key={key} className="media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src={
                      " http://localhost/laravel/upload/user/avatar/" +
                      item["image_user"]
                    }
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {item["name_user"]}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> {item["created_at"]}
                    </li>
                  </ul>
                  <p>{item["comment"]}</p>
                  <a
                    onClick={handleClick}
                    id={item["id"]}
                    className="btn btn-primary"
                    href="#commentID"
                  >
                    <i className="fa fa-reply" />
                    Replay
                  </a>
                </div>
              </li>
              {data.map((item2, index) => {
                if (item.id == item2.id_comment) {
                  return (
                    <li key={index} className="media second-media">
                      <a className="pull-left" href="#">
                        <img
                          className="media-object"
                          src={
                            " http://localhost/laravel/upload/user/avatar/" +
                            item2["image_user"]
                          }
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {item2["name_user"]}
                            Janis Gallagher
                          </li>
                          <li>
                            <i className="fa fa-clock-o" />{" "}
                            {item2["created_at"]}
                          </li>
                        </ul>
                        <p>{item2["comment"]}</p>
                        <a
                          onClick={handleClick}
                          id={item["id"]}
                          className="btn btn-primary"
                          href=""
                        >
                          <i className="fa fa-reply" />
                          Replay
                        </a>
                      </div>
                    </li>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  }
  return (
    <>
      <ul className="media-list">{fetchList()}</ul>
    </>
  );
}
export default ListComment;
