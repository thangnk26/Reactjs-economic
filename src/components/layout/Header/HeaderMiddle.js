import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function HeaderMiddle() {
  const navigate = useNavigate();
  function renderLogin() {
    const userLogin = localStorage.getItem("user");
    if (userLogin) {
      return (
        <li onClick={handleClick}>
          <a>
            <i className="fa fa-star"></i> Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login">
            <i className="fa fa-star"></i> Login
          </Link>
        </li>
      );
    }
  }
  function handleClick() {
    localStorage.clear("user");
    navigate("/login");
  }
  return (
    <>
      <div className="header-middle">
        {/*header-middle*/}
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">
              <div className="logo pull-left">
                <a href="index.html">
                  <img src="images/home/logo.png" alt="" />
                </a>
              </div>
              <div className="btn-group pull-right clearfix">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    USA
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href>Canada</a>
                    </li>
                    <li>
                      <a href>UK</a>
                    </li>
                  </ul>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    DOLLAR
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href>Canadian Dollar</a>
                    </li>
                    <li>
                      <a href>Pound</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8 clearfix">
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/account">
                      <i className="fa fa-user" /> Account
                    </Link>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-star" /> Wishlist
                    </a>
                  </li>
                  <li>
                    <a href="checkout.html">
                      <i className="fa fa-crosshairs" /> Checkout
                    </a>
                  </li>
                  <li>
                    <a href="cart.html">
                      <i className="fa fa-shopping-cart" /> Cart
                    </a>
                  </li>
                  {renderLogin()}
                  <li>
                    <Link to="/login/Register">
                      <i className="fa fa-star"></i> Register
                    </Link>
                  </li>

                  {/* <li>
                    <a href="login.html">
                      <i className="fa fa-lock" /> Login
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HeaderMiddle;
