import React, { useState } from "react";
// cha
function Cartlist(props) {
  const datalocol = JSON.parse(localStorage.getItem("product"));
  const data = props.data;
  // truyền bằng props thì thành phần không bị index trpng res.data.data
  const [dataInput, setdataInput] = useState(data);
  function renderdataList() {
    let image = JSON.parse(data.image);
    return (
      <tr className="xoa">
        <td className="cart_product">
          <a href>
            <img
              style={{ width: "150px", height: "150px" }}
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                data.id_user +
                "/" +
                image[0]
              }
              alt=""
            />
          </a>
        </td>
        <td className="cart_description">
          <h4>
            <a href>{data.name}</a>
          </h4>
        </td>
        <td className="cart_price">
          <p>${data.price}</p>
        </td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <a className="cart_quantity_up" id={data.id} onClick={HandleUp}>
              {" "}
              +{" "}
            </a>
            <input
              type="number"
              className="cart_quantity_input"
              id={data.id}
              name="quantity"
              value={data.qty}
              onChange={HandleInput}
              autoComplete="off"
              size={2}
            />
            <a className="cart_quantity_down" id={data.id} onClick={HandleDow}>
              {" "}
              -{" "}
            </a>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">${data.qty * data.price}</p>
        </td>
        <td className="cart_delete">
          <a className="cart_quantity_delete">
            <i id={data.id} onClick={HandleDetele} className="fa fa-times" />
          </a>
        </td>
      </tr>
    );
  }

  const HandleInput = (e) => {
    let idProduct = e.target.id;
    let value = parseInt(e.target.value);
    let datalocol = datalocol;
    Object.keys(datalocol).map((key, item) => {
      if (key == idProduct) {
        datalocol[idProduct] = parseInt(value);
      }
    });
    localStorage.setItem("product", JSON.stringify(datalocol));

    data.qty = value;
    setdataInput(data);
  };

  //up
  const HandleUp = (e) => {
    let idProduct = e.target.id;
    data.qty += 1;
    // tăng trong api
    setdataInput(data);

    Object.keys(datalocol).map((key, item) => {
      // tăng trong locol
      if (key == idProduct) {
        datalocol[key] += 1;
      }
    });
    console.log(datalocol);
    props.getLocalCart(datalocol);
    localStorage.setItem("product", JSON.stringify(datalocol));
  };

  //dow
  const HandleDow = (e) => {
    let idProduct = e.target.id;
    data.qty -= 1;
    setdataInput(data);

    Object.keys(datalocol).map((key, item) => {
      if (key == idProduct) {
        datalocol[key] -= 1;
        if (datalocol[key] < 1) {
          delete datalocol[idProduct];
        }
      }
    });
    console.log(datalocol);
    props.getLocalCart(datalocol);
    localStorage.setItem("product", JSON.stringify(datalocol));
  };

  const HandleDetele = (e) => {
    let idProduct = e.target.id;
    props.getidProduct(e.target.id);
    delete datalocol[idProduct];
    localStorage.setItem("product", JSON.stringify(datalocol));
  };

  return <>{renderdataList()}</>;
}
export default Cartlist;
