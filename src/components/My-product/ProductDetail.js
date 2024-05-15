import axios from "axios";
import { useParams } from "react-router-dom";
import MenuLeft from "./Menuleft";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProductDetail() {
  const [data, setData] = useState("");
  const [img, setImg] = useState([]);
  const [show, setShow] = useState("ok");

  let params = useParams();
  useEffect(() => {
    axios
      .get("http://localhost/laravel/public/api/product/detail/" + params.id)
      .then((res) => {
        setData(res.data.data);
        setImg(res.data.data.image);
      });
    // .catch(function (error) {
    //   console.log(error);
    // });
  }, []);

  const HandleClick = (e) => {
    if (img != "") {
      let changeImg = JSON.parse(img);
      if (changeImg) {
        return (
          <>
            {changeImg.map((item, value) => {
              return (
                <>
                  <a>
                    <img
                      onClick={() => setShow(value)}
                      className="choose"
                      name={item}
                      src={
                        "http://localhost/laravel/public/upload/user/product/" +
                        data.id_user +
                        "/small_" +
                        item
                      }
                      key={value}
                    />
                  </a>
                </>
              );
            })}
          </>
        );
      }
    }
  };
  function Larger() {
    if (img != "") {
      let changeImg = JSON.parse(img);
      if (show != "ok") {
        return (
          <>
            {changeImg.map((item, value) => {
              if (show != "ok") {
                return (
                  <>
                    <a>
                      {show === value ? (
                        <img
                          src={
                            "http://localhost/laravel/public/upload/user/product/" +
                            data.id_user +
                            "/" +
                            item
                          }
                          key={value}
                        />
                      ) : null}
                    </a>
                  </>
                );
              }
            })}
          </>
        );
      } else {
        return (
          <>
            <img
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                data.id_user +
                "/" +
                changeImg[0]
              }
            />
          </>
        );
      }
    }
  }
  const renderDetailCTL = () => {
    return (
      <div className="col-sm-9 padding-right">
        <div className="col-md-12 padding-right"></div>
        <div className="product-details">
          <div className="col-sm-5">
            <div className="view-product">
              {Larger()}
              <a>
                <h3>ZOOM</h3>
              </a>
            </div>
            <div
              id="similar-product"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="item active ">{HandleClick()}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-7">{renderDetailCTR()}</div>
        </div>
      </div>
    );
  };
  const renderDetailCTR = () => {
    if (Object.keys(data).length > 0) {
      return (
        <div className="product-information">
          <h2>{data["name"]}</h2>
          <p></p>
          <form style={{ display: "inline-block" }} method="POST">
            <input
              type="hidden"
              name="_token"
              defaultValue="CPDzFwKPC9FMDulGziRiJ9sJ6vjl89zr3HqMtvtK"
            />
          </form>
          <p className="ajax-rated" />
          <span>
            <span className="price">{data["price"]} $</span>

            <button type="button" className="btn btn-fefault cart">
              <Link
                to="/account/product/cart"
                className="btn btn-default add-to-cart"
                id={data["id"]}
              >
                <i className="fa fa-shopping-cart"></i>Add to cart
              </Link>
            </button>
          </span>
          <p>
            <b>Availability:</b> In Stock
          </p>
          <p>
            <b>Condition:</b>
            {data["condition"]}
          </p>
          <p>
            <b>Brand: </b>
            {data["id_brand"]}
          </p>
          <p>
            <b>Rating: </b>{" "}
            <img
              style={{ width: "12px" }}
              src="http://localhost/laravel/public/upload/icon/star-rating.png"
            />
          </p>
        </div>
      );
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
            <div class="col-sm-9 padding-right">{renderDetailCTL()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProductDetail;
