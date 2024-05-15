import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartlist from "./Cartlist";
// con
function Cart() {
  const [data, setdata] = useState({}); // data api
  const [locol, setLocol] = useState({}); // data locol
  const [idProduct, setidProduct] = useState("");
  // lấy dư liệu xuống xét vào useState
  useEffect(() => {
    let getlocol = JSON.parse(localStorage.getItem("product"));
    setLocol(getlocol);
    axios
      .post("http://localhost/laravel/public/api/product/cart", getlocol)
      .then((res) => {
        setdata(res.data.data);
      });
  }, []);

  function getidProduct(id) {
    setidProduct(id);
  }
  function getLocalCart(locol) {
    setLocol(locol);
  }

  function renderData() {
    return Object.keys(data).map((key, item) => {
      if (data[key]["id"] == idProduct) {
        delete data[key];
      } else {
        return (
          <Cartlist
            data={data[key]}
            getLocalCart={getLocalCart}
            getidProduct={getidProduct}
          />
        );
      }
    });
  }

  function renderTotal() {
    let sum = 0;
    if (locol != null) {
      Object.keys(locol).map((key, item) => {
        Object.keys(data).map((key2, item2) => {
          if (key == data[key2]["id"]) {
            sum += data[key2]["qty"] * data[key2]["price"];
          }
        });
      });
    }
    return (
      <li>
        Total
        <span>${sum}</span>
      </li>
    );
  }

  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  {renderTotal()}
                </ul>
                <a className="btn btn-default update" href>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Cart;
