// import res from "express/lib/response";
import React, { useState, useEffect, useContext } from "react";
// import { put } from "../../../../server/routes/post";
import { UserContext } from "../../App";
import M from "materialize-css";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  function handleOnEnter(text) {
    console.log("enter", text);
  }
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.posts)
        setData(result.posts);
      });
  }, []);
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeComment = (text, postId) => {
    // console.log(text);
    // console.log(postId);
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.comments[result.comments.length]._id);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result)
        const newData = data.filter((item) => {
          return item._id != result._id;
        });
        setData(newData);
        M.toast({ html: "Post deleted", classes: "#e53935 pink darken-1" });
      });
  };

  const deleteComment = (postId, commentId) => {
    // console.log(commentId)
    // console.log(data)

    fetch(`/deletecomment/${postId}/${commentId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          // console.log(item)
          // console.log(result)
          if (item._id === result._id) {
            result.postedBy = item.postedBy;
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        M.toast({ html: "comment deleted", classes: "#e53935 pink darken-1" });
      });
  };

  //  if(data.length!=0){
  return (
    <div className="home">
      {data.map((item) => {
        console.log(item);
        // console.log(item.postedBy.pic)
        // const obj = JSON.parse(item);
        // console.log(obj)
        return (
          <div className="card home-card" key={item._id}>
            <h5 className="mine" style={{ padding: "6px" }}>
              <div style={{ width: "8%" }}>
                <img
                  src={item.postedBy.pic}
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div style={{ width: "87%" }}>
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.name}
                </Link>
              </div>
              <div style={{ width: "5%" }}>
                {item.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{ color: "red", float: "right" }}
                    onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )}
              </div>
            </h5>
            <div className="card-image">
              <img src={item.photo} />
              <div className="card-content">
                {item.likes.includes(state._id) ? (
                  <i
                    className="material-icons"
                    onClick={() => {
                      unlikePost(item._id);
                    }}
                    style={{ color: "red" }}
                  >
                    favorite
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    onClick={() => {
                      likePost(item._id);
                    }}
                  >
                    favorite_border
                  </i>
                )}

                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>

                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id} style={{ fontSize: "15px" }}>
                      <span style={{ fontWeight: "500" }}>
                        {" "}
                        {record.postedBy.name}
                      </span>{" "}
                      {record.text}
                      {record.postedBy._id == state._id && (
                        <i
                          className="material-icons"
                          style={{ color: "green", float: "right" }}
                          onClick={() => deleteComment(item._id, record._id)}
                        >
                          delete
                        </i>
                      )}
                    </h6>
                  );
                })}
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log(e.target[0].value);
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="comments"
                      onSubmit={console.log("ff")}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">About ZePal</h5>
              <p className="grey-text text-lighten-4">
                You can use this beautiful platform for posting your best Pal of
                life{" "}
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text" style={{ marginLeft: "5px" }}>
                Explore
              </h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  maxWidth: "30%",
                }}
              >
                <div>
                  <a href="https://www.youtube.com/" target="/blank">
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.facebook.com/" target="/blank">
                    <i class="fa fa-facebook-f"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/" target="/blank">
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <div>
                  <a href="https://github.com/" target="/blank">
                    <i class="fa fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2022 Copyright <t> </t>
            {/* <a className="grey-text text-lighten-4 right" href="/">
              More
            </a> */}
            <Link to="/" lassName="grey-text text-lighten-4 right">ZePal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// };
export default Home;
