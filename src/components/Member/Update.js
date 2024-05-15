import React, { useEffect, useState } from "react";
import Error from "./Error";
import axios from "axios";
import Leftsidebar from "../layout/Menu/Leftsidebar";
import MenuLeft from "../My-product/Menuleft";
function Update() {
  const [inputs, setInput] = useState("");
  const [errors, setError] = useState({});
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    setInput({
      name: userData.Auth.name,
      phone: userData.Auth.phone,
      address: userData.Auth.address,
      email: userData.Auth.email,
    });
  }, []);

  const handleinput = (Event) => {
    const nameInput = Event.target.name;
    const value = Event.target.value;
    setInput((state) => ({ ...state, [nameInput]: value }));
  };
  const handleAvatar = (Event) => {
    let file = Event.target.files;
    let render = new FileReader();
    render.onload = (Event) => {
      setAvatar(Event.target.result);
      setFile(file[0]);
    };
    render.readAsDataURL(file[0]);
  };

  const handleSubmit = (Event) => {
    let userData = JSON.parse(localStorage.getItem("user"));
    Event.preventDefault();
    let flag = true;
    let errorSubmit = {};
    if (!inputs.name) {
      flag = false;
      errorSubmit.name = " Vui long nhap Name";
    } else {
      errorSubmit.name = "";
    }
    if (!inputs.email) {
      flag = false;
      errorSubmit.email = "Vui long nhap Email";
    } else {
      errorSubmit.email = "";
    }
    if (!inputs.password) {
      flag = false;
      errorSubmit.password = "";
    } else {
      errorSubmit.password = "";
    }
    if (!inputs.address) {
      errorSubmit.address = "Vui long nhap Address";
    } else {
      errorSubmit.address = "";
    }
    if (!inputs.phone) {
      flag = false;
      errorSubmit.phone = "Vui long nhap Phone";
    } else {
      errorSubmit.phone = "";
    }
    if (file == "") {
      errorSubmit.avatar = " Vui lòng chọn ảnh";
    } else {
      let IMG = ["png", "jpg", "jpeg", "PNG", "JPG"];
      if (file.size > 1024 * 1024) {
        errorSubmit.avatar = " Kich thuoc anh qua lon";
      } else if (!IMG.includes(file.name.split(".").pop())) {
        errorSubmit.avatar = "Loi dinh dang hinh anh";
      }
    }
    setError(errorSubmit);

    if (!flag) {
      let formdata = new FormData();
      formdata.append("name", inputs.name);
      formdata.append("email", userData.Auth.email);
      formdata.append("address", inputs.address);
      formdata.append("phone", inputs.phone);
      formdata.append("password", inputs.password);
      formdata.append("lever", 0);
      formdata.append("avatar", avatar);
      let url =
        "http://localhost/laravel/public/api/user/update/" + userData.Auth.id;
      let token = userData.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios
        .post(url, formdata, config)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  function fetchRate() {
    return (
      <div className="col-sm-6">
        <div className="signup-form">
          <Error errors={errors} />
          <h2>User Update!</h2>
          <p></p>

          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <input
              type="text"
              name="name"
              value={inputs.name}
              placeholder="Name"
              onChange={handleinput}
            />
            <p>{errors.name}</p>
            <input
              readOnly
              type="email"
              value={inputs.email}
              placeholder="Email Address"
              onChange={handleinput}
            />
            <p>{errors.email}</p>
            <input
              type="password"
              value={inputs.password}
              placeholder="Password"
              onChange={handleinput}
            />
            <p>{errors.password}</p>
            <input
              type="text"
              value={inputs.address}
              placeholder="Address"
              onChange={handleinput}
            />
            <p>{errors.address}</p>

            <input
              type="text"
              value={inputs.phone}
              placeholder="phone"
              onChange={handleinput}
            />
            <p>{errors.phone}</p>
            <input type="file" multiple onChange={handleAvatar} />
            <p>{errors.avatar}</p>
            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
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

            <div class="col-sm-9 padding-right">{fetchRate()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Update;
