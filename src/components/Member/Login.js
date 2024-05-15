import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import Error from "./Error";
function Login() {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const re = /^\w+@\w+\.com$/i;
    let errorSubmit = {};
    let flag = true;

    // email
    if (!re.test(inputs.email)) {
      flag = false;
      errorSubmit.email = "Email chua dung dinh dang";
    }
    if (inputs.email === undefined) {
      flag = false;
      errorSubmit.email = "Vui long nhap email";
    }
    if (inputs.email === "") {
      flag = false;
      errorSubmit.email = "Vui long nhap email";
    }
    // pass
    if (inputs.password === undefined) {
      flag = false;
      errorSubmit.password = "Vui long nhap password";
    }
    if (inputs.password === "") {
      flag = false;
      errorSubmit.password = "Vui long nhap password";
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      let user = {
        email: inputs.email,
        password: inputs.password,
        lever: 0,
      };
      let url = "http://localhost/laravel/public/api/login";
      axios
        .post(url, user)
        .then((res) => {
          // nếu res tồn tại báo lỗi
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            setInputs({
              email: "",
              password: "",
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setErrors({});
    }
  };

  function fetchLogin() {
    return (
      <>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
              <Error errors={errors} />
              {/*login form*/}
              <h2>Login to your account</h2>
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                  // value={inputs.email}
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                />
                <input
                  // value={inputs.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
                {/* level */}
                {/* <input type="text" name="lever" onChange={handleInput} /> */}
                <span>
                  <input type="checkbox" className="checkbox" />
                  Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">
                  Login
                </button>
              </form>
            </div>
            {/*/login form*/}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-3">
              <Leftsidebar />
            </div>

            <div class="col-sm-9 padding-right">{fetchLogin()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
