import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import MenuLeft from "./Menuleft";
import Leftsidebar from "../layout/Menu/Leftsidebar";
function Add(props) {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const [errors, setError] = useState({});
  const [avatar, setAvatar] = useState("");
  const [image, setimage] = useState("");
  const handleinput = (Event) => {
    const nameInput = Event.target.name;
    const value = Event.target.value;
    setInput((state) => ({ ...state, [nameInput]: value }));
  };
  const handleAvatar = (Event) => {
    let file = Event.target.files;
    let render = new FileReader();
    // sau khi mọi thứ load xong hàm này sẽ chạy và gửi 2 file setAva and setImage cho api
    render.onload = (Event) => {
      setAvatar(Event.target.result); //fileReader.result
      setimage(file);
    };
    // đọc file được up và trả về fileReader.result
    render.readAsDataURL(file[0]);
  };
  const handleSubmit = (Event) => {
    Event.preventDefault();
    let flag = true;
    let errorSubmit = {};
    let getlocol = JSON.parse(localStorage.getItem("user"));
    if (!input.id_category) {
      flag = false;
      errorSubmit.id_category = "Vui long chon Category";
    } else {
      errorSubmit.id_category = "";
    }
    if (!input.id_brand) {
      flag = false;
      errorSubmit.id_brand = "Vui long nhap Brand";
    } else {
      errorSubmit.id_brand = "";
    }
    if (image == "") {
      errorSubmit.image = " Vui lòng chọn ảnh";
    } else {
      let IMG = ["png", "jpg", "jpeg", "PNG", "JPG"];
      Object.keys(image).map((key, value) => {
        if (image[key]["size"] > 1024 * 1024) {
          flag = false;
          errorSubmit.image = "Kich thuoc anh qua lon";
        } else if (!IMG.includes(image[key]["name"].split(".").pop())) {
          flag = false;
          errorSubmit.image = "file khong dung dinh dang anh";
        }
      });
    }
    if (!input.name) {
      flag = false;
      errorSubmit.name = " vui long nhap Name";
    } else {
      errorSubmit.name = "";
    }
    if (!input.price) {
      flag = false;
      errorSubmit.price = "Vui long nhap Price";
    } else {
      errorSubmit.price = "";
    }
    if (input.sale !== Number && input.sale <= 0 && input.sale !== "") {
      flag = false;
      errorSubmit.sale = "Vui long nhap sale > 0";
    } else {
      errorSubmit.sale = "";
    }

    if (!input.detail) {
      flag = false;
      errorSubmit.detail = "Vui long nhap Detail";
    } else {
      errorSubmit.detail = "";
    }
    if (!input.company_profile) {
      flag = false;
      errorSubmit.company_profile = "Vui long nhap Company";
    } else {
      errorSubmit.company_profile = "";
    }
    setError(errorSubmit);
    if (flag) {
      let url = "http://localhost/laravel/public/api/user/add-product";
      let token = getlocol.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      let formData = new FormData();
      formData.append("category", input.id_category);
      formData.append("brand", input.id_brand);
      formData.append("price", input.price);
      formData.append("name", input.name);
      formData.append("company", input.company_profile);
      formData.append("detail", input.detail);
      formData.append("status", input.status);
      formData.append("sale", input.sale);
      formData.append("id_user", getlocol.Auth.id);

      Object.keys(image).map((key, item) => {
        formData.append("file[]", image[item]);
      });
      console.log(formData);
      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert(" thanh cong ");
            navigate("/account/product/my-product");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const renderSale = () => {
    console.log(input.status);

    if (input.status == 0) {
      return (
        <input type="text" id="value_sale" name="sale" onChange={handleinput} />
      );
    }
  };
  function fetchAdd() {
    return (
      <>
        <div className="col-sm-9 padding-right">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>Add Product</h3>
              </div>
              <p></p>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit}
                  id="main-contact-form"
                  className="contact-form row"
                  name="contact-form"
                  encType="multipart/form-data"
                  method="POST"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="w88bBuXP9uwed7qaVJJF9kmCl6F2VzfqyNQDnl6x"
                  />
                  <div className="form-group col-md-12">
                    <select name="id_category" onChange={handleinput}>
                      <option value>Please select category </option>
                      <option value={1}>Category1</option>
                      <option value={2}>Category2</option>
                      <option value={3}>vietnam</option>
                    </select>

                    <p>{errors.id_category}</p>
                  </div>
                  <div className="form-group col-md-12">
                    <select name="id_brand" onChange={handleinput}>
                      <option value>Please select brand</option>
                      <option value={1}>Brand1</option>
                      <option value={2}>Brand2</option>
                    </select>
                    <p>{errors.id_brand}</p>
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      onChange={handleinput}
                    />
                    <p>{errors.name}</p>
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="file"
                      name="image[]"
                      className="form-control"
                      multiple
                      onChange={handleAvatar}
                    />
                    <p>{errors.image}</p>
                  </div>

                  <div className="form-group col-md-12">
                    <input
                      type="number"
                      className="form-control"
                      id="display"
                      name="price"
                      placeholder="Price"
                      onChange={handleinput}
                    />
                    <input
                      type="number"
                      hidden
                      id="price"
                      name="price"
                      onChange={handleinput}
                    />
                    <p>{errors.price}</p>
                  </div>
                  <div className="form-group col-md-3">Status of product</div>
                  <div className="form-group col-md-12">
                    <select
                      value={input.status}
                      name="status"
                      onChange={handleinput}
                    >
                      <option value="1">New</option>
                      <option value="0">Sale</option>
                    </select>
                    <p>{errors.id_brand}</p>
                    {renderSale()}
                  </div>

                  <div className="form-group col-md-12">
                    <textarea
                      name="detail"
                      id="detail"
                      className="form-control"
                      placeholder="Detail"
                      defaultValue={""}
                      onChange={handleinput}
                    />
                    <p>{errors.detail}</p>
                  </div>
                  <div className="form-group col-md-12">
                    <textarea
                      name="company_profile"
                      id="company_profile"
                      className="form-control"
                      placeholder="Company_profile"
                      defaultValue={""}
                      onChange={handleinput}
                    />
                    <p>{errors.company_profile}</p>
                  </div>

                  <div className="form-group col-md-12">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-primary pull-right"
                      defaultValue="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
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
              <MenuLeft />
              <Leftsidebar />
            </div>

            <div class="col-sm-9 padding-right">{fetchAdd()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Add;
