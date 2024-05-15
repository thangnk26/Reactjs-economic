import axios from "axios";
function Delete(props) {
  const handleDelete = (e) => {
    let getlocal = JSON.parse(localStorage.getItem("user"));
    let token = getlocal.success.token;
    let url =
      "http://localhost/laravel/public/api/user/delete-product/" + props.data;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        if (res.data.data) {
          props.remove(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <a className="cart_quantity" onClick={handleDelete}>
      <i className="fa fa-times" />
    </a>
  );
}
export default Delete;
