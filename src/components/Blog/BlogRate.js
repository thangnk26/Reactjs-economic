import axios from "axios";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { useParams, useNavigate } from "react-router-dom";
function Rate() {
  const [rating, setRating] = useState(2);
  const navigate = useNavigate();
  const params = useParams();
  function changeRating(newRating) {
    setRating(newRating);
    let flag = true;
    const getlocal = JSON.parse(localStorage.getItem("Appstate"));
    if (getlocal == null) {
      alert("Vui lòng login trước khi đánh giá .");
      navigate("/login");
    }
    if (flag) {
      let url = "http://localhost/laravel/public/api/blog/rate/" + params.id;
      let accessToken = getlocal.success.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      if (rating) {
        const formData = new FormData();
        formData.append("blog_id", params.id);
        formData.append("user_id", getlocal.Auth.id);
        formData.append("rate", rating);
        axios
          .post(url, formData, config)
          .then((res) => {})
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
  useEffect(() => {
    axios
      .get("http://localhost/laravel/public/api/blog/rate/" + params.id)
      .then((res) => {
        let getRate = res.data.data;
        let total = 0;
        Object.keys(getRate).map((item) => {
          total += getRate[item]["rate"];
        });
        let TBC = total / Object.keys(getRate).length;
        setRating(TBC);
        console.log(TBC);
      });
  });
  // rating = 2;
  return (
    <StarRatings
      rating={rating}
      starRatedColor="blue"
      changeRating={changeRating}
      numberOfStars={6}
      name="rating"
    />
  );
}
export default Rate;
