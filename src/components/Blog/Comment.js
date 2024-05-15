import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Error from "../Member/Error";
function Comment(props) {
  let params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState("");

  const handleComment = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setComment((state) => ({ ...state, [nameInput]: value }));
  };

  const handleSubmitCmt = () => {
    let flag = true;
    const errorSubmit = {};
    let userData = JSON.parse(localStorage.getItem("user"));
    if (userData == null) {
      navigate("/login");
    } else {
      if (comment.message === undefined) {
        flag = false;
        errorSubmit.name = "Bạn chưa comment";
      }
    }
    if (flag) {
      // đường dẫn api
      let url = "http://localhost/laravel/public/api/blog/comment/" + params.id;
      let accessToken = userData.success.token;

      //config để gửi token qua api
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      //Kiem tra comment đã nhập chưa
      if (comment) {
        const formData = new FormData();
        formData.append("id_blog", params.id);
        formData.append("id_user", userData.Auth.id);
        formData.append("id_comment", props.idReply != "" ? props.idReply : 0);
        formData.append("comment", comment.message);
        formData.append("image_user", userData.Auth.avatar);
        formData.append("name_user", userData.Auth.name);
        axios
          .post(url, formData, config)
          .then((res) => {
            props.getComment(res.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        setErrors({});
      }
    }

    setErrors(errorSubmit);
  };
  return (
    <>
      <Error errors={errors} />

      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                id="commentID"
                name="message"
                rows={11}
                defaultValue={""}
                onChange={handleComment}
              />
              <a className="btn btn-primary" href onClick={handleSubmitCmt}>
                post comment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comment;
