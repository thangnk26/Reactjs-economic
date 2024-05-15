import React from "react";
import { Link } from "react-router-dom";

function MenuLeft() {
  return (
    <>
      <div className="left-sidebar">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="/account">
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  Account
                </Link>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="/account/product/my-product">
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  My product
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MenuLeft;
