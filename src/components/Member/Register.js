import axios from "axios";
import { useState, useEffect } from "react";
import Error from "./Error";
import Leftsidebar from "../layout/Menu/Leftsidebar";

function Register() {
  const [inputs, setInputs] = useState("");
  const [level, setlevel] = useState("");
  const [errors, setErrors] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("");
  const [isFilePick, setIsFilePick] = useState(false);
  const arr = [
    {
      id: "0",
      name: "Level",
    },
    {
      id: 1,
      name: "Manager",
    },
    {
      id: 2,
      name: "HR",
    },
    {
      id: 3,
      name: "Staff",
    },
  ];

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const handleChange = (e) => {
    setlevel(e.target.value);
  };
  // const handleAvatar = (e) => {
  //   let file = e.target.files[0];
  //   setAvatar(file);
  // };
  const handleUserInputFile = (e) => {
    let file = e.target.files;
    // gửi file đến api sv
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result); // cái này gửi qua API
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
    console.log(file[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const re = /^\w+@\w+\.com$/i;
    const rp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let errorSubmit = {};
    let flag = true;
    if (inputs.name === undefined) {
      flag = false;
      errorSubmit.name = "Vui long nhap name";
    }
    if (inputs.name === "") {
      flag = false;
      errorSubmit.name = "Vui long nhap name";
    }
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
    // phone
    if (!rp.test(inputs.phone)) {
      flag = false;
      errorSubmit.phone = "Phone chua dung dinh dang";
    }
    if (inputs.phone === undefined) {
      flag = false;
      errorSubmit.phone = "Vui long nhap so dien thoai";
    }
    if (inputs.phone === "") {
      flag = false;
      errorSubmit.phone = "Vui long nhap so dien thoai";
    }
    // address
    if (inputs.address === undefined) {
      flag = false;
      errorSubmit.address = "Vui long nhap dia chi";
    }
    if (inputs.address === "") {
      flag = false;
      errorSubmit.address = "Vui long nhap dia chi";
    }

    // avatar
    if (!file) {
      flag = false;
      errorSubmit.file = "Chưa upload file";
    } else {
      let img = ["png", "jpg", "jpeg", "PNG", "JPG"];
      if (file.size > 1024 * 1024) {
        flag = false;
        errorSubmit.file = "File quá dung lượng";
      } else if (!img.includes(file.name.split(".").pop())) {
        flag = false;
        errorSubmit.file = "Day khong phai la file hinh anh";
      }
    }
    // lever
    // if (level == "") {
    //   flag = false;
    //   errorSubmit.value = "Vui long chon Level";
    // }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      let user = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        address: inputs.address,
        phone: inputs.phone,
        file: file.name,
        level: 0,
      };
      let url = "http://localhost/laravel/public/api/register";
      axios
        .post(url, user)
        .then((res) => {
          // nếu res tồn tại báo lỗi
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            // tạo thành công 1 tk và reset register
            setInputs({
              name: "",
              email: "",
              password: "",
              address: "",
              phone: "",
              // file: "",
              // level: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setErrors({});
    }
  };

  function fetchRegister() {
    return (
      <>
        <div className="row">
          <div className="col-sm-4">
            <div className="signup-form">
              <Error errors={errors} />
              <div className="signup-form">
                {/*sign up form*/}
                <h2>New User Signup!</h2>
                {/* form */}
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <input
                    value={inputs.name}
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleInput}
                  />
                  <input
                    value={inputs.email}
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                  />
                  <input
                    value={inputs.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                  />
                  <input
                    value={inputs.phone}
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleInput}
                  />
                  <input
                    value={inputs.address}
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleInput}
                  />

                  {/* avatar */}
                  <input
                    type="file"
                    name="avatar"
                    multiple
                    onChange={handleUserInputFile}
                  />

                  {/* level */}
                  <select value={level} onChange={handleChange}>
                    {arr.map((key, item) => (
                      <option key={key.id} name={key.name} value={key.id}>
                        {key.name}
                      </option>
                    ))}
                  </select>
                  {/* submit */}
                  <button type="submit" className="btn btn-default">
                    Signup
                  </button>
                </form>
              </div>
            </div>
            {/*/sign up form*/}
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

            <div class="col-sm-9 padding-right">{fetchRegister()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
