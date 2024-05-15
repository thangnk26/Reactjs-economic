import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Edit(props) {
  const [input, setInput] = useState({});
  const [errors, setError] = useState({});
  const [avatarCheckbox, setavatarCheckbox] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [imagenew, setImagenew] = useState("");
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    let getlocol = JSON.parse(localStorage.getItem("user"));
    let number = Number(params.id);
    if (number) {
      let token = getlocol.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios
        .get(
          "http://localhost/laravel/public/api/user/product/" + params.id,
          config
        )
        .then((res) => {
          console.log(res.data.data);
          setInput({
            name: res.data.data.name,
            id_user: res.data.data.id_user,
            price: res.data.data.price,
            image: res.data.data.image,
            sale: res.data.data.sale,
            status: res.data.data.status,
            id_brand: res.data.data.id_brand,
            id_category: res.data.data.id_category,
            detail: res.data.data.detail,
          });
        });
    }
    axios
      .get("http://localhost/laravel/public/api/category-brand")
      .then((res) => {
        setBrand(res.data.brand);
        setCategory(res.data.category);
      });
  }, []);

  const handleInput = (Event) => {
    const nameInput = Event.target.name;
    const value = Event.target.value;
    setInput((state) => ({ ...state, [nameInput]: value }));
  };
  const handleAvatar = (e) => {
    let file = e.target.files;
    let reader = new FileReader();
    // sau khi mọi thứ load xong hàm này sẽ chạy và gửi 2 file setAva and setImage cho api
    reader.onload = (e) => {
      setAvatar(e.target.result); //fileReader.result
      setImagenew(file);
    };
    // đọc file được up và trả về fileReader.result
    reader.readAsDataURL(file[0]);
  };

  function Image() {
    if (input.image instanceof Array) {
      return input.image.map((item, value) => {
        return (
          <div
            className
            style={{ position: "relative", display: "inline-block" }}
            key={value}
          >
            <img
              className="imageProduct"
              style={{ width: "100px", height: "100px" }}
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                input.id_user +
                "/" +
                item
              }
              alt=""
            />
            <input
              type="checkbox"
              name="avatarCheckbox"
              style={{ position: "absolute", top: "3px", right: "3px" }}
              value={item}
              onClick={handleCheck}
            />
          </div>
        );
      });
    }
  }

  function handleCheck(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    const ischecked = e.target.checked;

    if (nameInput === "avatarCheckbox") {
      let abc = avatarCheckbox;
      if (ischecked) {
        abc.push(value);
        setavatarCheckbox(abc);
      } else {
        console.log(avatarCheckbox);
        let check = avatarCheckbox.indexOf(value);
        if (check > -1) {
          console.log(check);
          avatarCheckbox.splice(check, 1);
        }
      }
      console.log(avatarCheckbox);
    } else {
      setavatarCheckbox((state) => ({ ...state, [nameInput]: value }));
    }
  }
  const handleSubmit = (Event) => {
    Event.preventDefault();
    let flag = true;
    let errorSubmit = {};
    if (input.name == "") {
      flag = false;
      errorSubmit.name = "Vui long nhap Name";
    } else {
      errorSubmit.name = "";
    }
    if (input.price == "") {
      flag = false;
      errorSubmit.price = "Vui long nhap Price";
    } else {
      errorSubmit.price = "";
    }

    if (!input.id_category) {
      flag = false;
      errorSubmit.id_category = "Vui long nhap Category";
    } else {
      errorSubmit.id_category = "";
    }
    if (!input.id_brand) {
      flag = false;
      errorSubmit.id_brand = "Vui long nhap Brand";
    } else {
      errorSubmit.id_brand = "";
    }
    if (input.detail == "") {
      console.log("detail");
      flag = false;
      errorSubmit.detail = "Vui long nhap Detail";
    } else {
      errorSubmit.detail = "";
    }
    if (input.status == 0) {
      flag = true;
      if (!input.sale) {
        flag = false;
        errorSubmit.sale = "Vui long nhap sale từ 0 -> 100";
      } else {
        errorSubmit.sale = "";
      }
    }

    if (imagenew.length + (input.image.length - avatarCheckbox.length) > 3) {
      flag = false;
      alert("vui long upload > 3");
    }
    setError(errorSubmit);
    if (flag) {
      let getlocol = JSON.parse(localStorage.getItem("user"));
      let url =
        "http://localhost/laravel/public/api/user/edit-product/" + params.id;
      let token = getlocol.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      // cap nhat het lai lai api
      console.log(input.name);
      let formData = new FormData();
      formData.append("category", input.id_category);
      formData.append("brand", input.id_brand);
      formData.append("price", input.price);
      formData.append("name", input.name);
      formData.append("company", input.company_profile);
      formData.append("detail", input.detail);
      formData.append("status", input.status);
      formData.append("sale", input.sale);
      formData.append("condition", input.condition);

      Object.keys(imagenew).map((item, i) => {
        formData.append("file[]", imagenew[item]);
        console.log(item);
      });
      Object.keys(avatarCheckbox).map((item, i) => {
        formData.append("avatarCheckBox[]", avatarCheckbox[item]);
        console.log(item);
      });
      axios.post(url, formData, config).then((res) => {
        console.log(res);
        alert("oke");
        // navigate("/account/product/my-product");
      });
    }
  };
  const renderSale = () => {
    if (input.status == 0) {
      return (
        <>
          <input
            type="number"
            value={input.sale}
            id="value_sale"
            name="sale"
            onChange={handleInput}
          />
          <p>{errors.sale}</p>
        </>
      );
    }
  };

  return (
    <div className="col-sm-9 padding-right">
      <div className="container-fluid">
        <div className="product-details">
          <div className="product-information">
            <div className="contact-form">
              <h2 className="title text-center">Product Information</h2>

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
                  defaultValue="CwLTgrBY9pKSrQqDhi89QfN68vCKZHcuXosv6bYB"
                />
                <div className="col-md-2">
                  <label>Name</label>
                </div>
                <div className="form-group col-md-10">
                  <input
                    type="text"
                    value={input.name}
                    className="form-control"
                    name="name"
                    onChange={handleInput}
                  />
                  <p>{errors.name}</p>
                </div>

                <div className="col-md-2">
                  <label>Price</label>
                </div>
                <div className="form-group col-md-10">
                  <input
                    type="number"
                    value={input.price}
                    className="form-control"
                    name="price"
                    id="display"
                    onChange={handleInput}
                  />
                  <input
                    hidden
                    id="price"
                    name="price"
                    onChange={handleInput}
                  />
                  <p>{errors.price}</p>
                </div>
                <div className="form-group col-md-3">Status of product</div>
                <div className="form-group col-md-12">
                  <select
                    value={input.status}
                    name="status"
                    onChange={handleInput}
                  >
                    <option value="1">New</option>
                    <option value="0">Sale</option>
                  </select>
                  <p>{errors.id_brand}</p>
                  {renderSale()}
                </div>

                <div className="col-md-2">
                  <label>Category</label>
                </div>
                <div className="form-group col-md-10">
                  <select
                    name="id_category"
                    value={input.id_category}
                    className="form-control form-control-line"
                    onChange={handleInput}
                  >
                    <option value>Please select category </option>
                    <option value={1}>Category1</option>
                    <option value={2}>Category2</option>
                    <option value={3}>vietnam</option>
                  </select>
                  <p>{errors.id_category}</p>
                </div>
                <div className="col-md-2">
                  <label>Brand</label>
                </div>
                <div className="form-group col-md-10">
                  <select
                    name="id_brand"
                    value={input.id_brand}
                    className="form-control form-control-line"
                    onChange={handleInput}
                  >
                    <option value>Please select brand</option>
                    <option value={1}>Brand1</option>
                    <option value={2}>Brand2</option>
                  </select>
                  <p>{errors.id_brand}</p>
                </div>

                <div className="col-md-2">
                  <label>Image</label>
                </div>
                <div className="form-group col-md-10">
                  <input
                    type="file"
                    name="image[]"
                    className="form-control"
                    multiple
                    onChange={handleAvatar}
                  />
                </div>
                <div className="col-sm-12">
                  <div className="view-product">
                    <h4>Choose image you want to delete</h4>
                    {Image()}
                  </div>
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    name="detail"
                    value={input.detail}
                    id="detail"
                    className="form-control"
                    placeholder="Detail"
                    defaultValue={""}
                    onChange={handleInput}
                  />
                  <p>{errors.detail}</p>
                </div>
                <div className="form-group col-md-10">
                  <button
                    name="submit"
                    style={{ marginLeft: 0, marginTop: "50px" }}
                    type="submit"
                    className="btn btn-default cart"
                  >
                    Update your product
                  </button>
                  <a
                    className="btn btn-default"
                    style={{
                      color: "#fff",
                      background: "#989898",
                      display: "inline-block",
                      margin: "50px 0 10px 0",
                      border: "0 none",
                      fontSize: "15px",
                      borderRadius: 0,
                    }}
                    href="/account/product/my-product"
                  >
                    Cancel
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
