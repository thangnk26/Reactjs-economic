import axios from "axios";
import MenuLeft from "./Menuleft";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Producthome() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState("");
  useEffect(() => {
    axios.get("http://localhost/laravel/public/api/product").then((res) => {
      setProduct(res.data.data);
    });
    let getlocol = JSON.parse(localStorage.getItem("product"));
    if (getlocol) {
      setData(getlocol);
    }
  }, []);
  const handleCart = (e) => {
    let idProduct = e.target.id;
    if (data[idProduct]) {
      data[idProduct] = parseInt(data[idProduct] + 1);
      // set nhiều object vào data id: qty
      setData((state) => ({ ...state, [idProduct]: data[idProduct] }));
    } else {
      data[idProduct] = 1;
      setData((state) => ({ ...state, [idProduct]: data[idProduct] }));
    }
    console.log(data);
    if (data) {
      localStorage.setItem("product", JSON.stringify(data));
    }
  };
  const renderHome = (e) => {
    if (product instanceof Array) {
      return product.map((key, item) => {
        let image = JSON.parse(key["image"]);
        return (
          <>
            <div class="col-sm-4">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <img
                      src={
                        "http://localhost/laravel/public/upload/user/product/" +
                        key.id_user +
                        "/" +
                        image[0]
                      }
                      alt=""
                    />
                    <h2>${key.price}</h2>
                    <p>{key.name}</p>
                    <a href="#" id={key.id} class="btn btn-default add-to-cart">
                      <i class="fa fa-shopping-cart"></i>Add to cart
                    </a>
                  </div>
                  <div class="product-overlay">
                    <div class="overlay-content">
                      <h2>${key.price}</h2>
                      <p>{key.name}</p>
                      <a
                        onClick={handleCart}
                        href="#"
                        id={key.id}
                        class="btn btn-default add-to-cart"
                      >
                        <i class="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li>
                      <Link to={"/account/product/prodetail/" + key.id}>
                        <i className="fa fa-plus-square" />
                        Product detail
                      </Link>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-plus-square"></i>Add to compare
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
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
              {renderHome()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Producthome;
