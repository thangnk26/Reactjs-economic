import axios from "axios";
import MenuLeft from "./Menuleft";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
function Product(props) {
  const [data, setData] = useState("");

  useEffect(() => {
    let getlocal = JSON.parse(localStorage.getItem("user"));
    let token = getlocal.success.token;
    let url = "http://localhost/laravel/public/api/user/my-product";
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(url, config).then((res) => {
      setData(res.data.data);
    });
  }, []);
  function remove(data) {
    setData(data);
  }
  function fetchProduct() {
    if (Object.keys(data).length > 0) {
      return Object.keys(data).map((key, item) => {
        let image = JSON.parse(data[key]["image"]);
        return (
          <>
            <tr key={key}>
              <td className="cart_description">
                <p>{data[key]["id"]}</p>
              </td>
              <td className="cart_description">
                <h4>
                  <a href>{data[key]["name"]}</a>
                </h4>
              </td>
              <td className="cart_product">
                <img
                  style={{ width: "110px", height: "110px" }}
                  src={
                    "http://localhost/laravel/public/upload/user/product/" +
                    data[key]["id_user"] +
                    "/" +
                    image[0]
                  }
                />
              </td>
              <td className="cart_total">
                <p className="cart_total_price">
                  {" "}
                  <p>{data[key]["price"]}$</p>
                </p>
              </td>
              <td className="cart_action">
                <td className="action">
                  <Link to={"/account/product/edit/" + data[key]["id"]}>
                    {" "}
                    <a className="cart_quantity">
                      <i className="fa fa-edit" />
                    </a>
                  </Link>

                  <Delete data={data[key]["id"]} remove={remove} />
                </td>
              </td>
            </tr>
          </>
        );
      });
    }
  }
  return (
    <>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-3">
              <MenuLeft />
              <Leftsidebar />
            </div>
            <div className="features_items">
              <h2 className="title text-center">Features Items</h2>
              <table className="table tableproduc table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="id">ID</td>
                    <td className="name">Name</td>
                    <td className="image">Image</td>
                    <td className="Price">Price</td>
                    <td className="action">Action</td>
                    <td />
                  </tr>
                </thead>
                <tbody>{fetchProduct()}</tbody>
              </table>
              <Link to="/account/product/add">
                <button type="submit" class="btn addnew btn-default ">
                  Add New
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Product;
