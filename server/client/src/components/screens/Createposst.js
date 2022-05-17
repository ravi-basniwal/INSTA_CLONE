import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
const Createpost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          
          if (data.error) {
            return M.toast({
              html: data.error,
              classes: "#e53935 red darken-1",
            });
          } else {
            M.toast({ html: "created post", classes: "#1de9b6 teal accent-3" });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "Team-Mate");
    fetch("https://api.cloudinary.com/v1_1/Team-Mate/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setUrl(data.url);
        // setPurl()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-field backg"
      style={{
        // margin: "30px auto",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"100px",
        maxWidth: "500px",
        padding: "47px",
        textAlign: "center",
        // backgroundColor:"gray"
        borderRadius:"20px",
        // backgroundImage:url("./Images/inputBc.jpg")
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        style={{color:"white"}}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        style={{color:"white"}}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input style={{color:"white"}} className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #d500f9 purple accent-3"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};
export default Createpost;
