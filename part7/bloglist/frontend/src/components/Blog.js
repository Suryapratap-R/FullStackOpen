import React, { useState } from "react";
import PropTypes from "prop-types";
import { deleteBlogPost, likeBlogPost } from '../reducers/blogsReducer';
import {useDispatch} from 'react-redux';

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [like, setLike] = useState(blog.likes);
  const dispatch = useDispatch()

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const deletePost = () => {
    const deleteConfirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (deleteConfirm) {
      dispatch(deleteBlogPost(blog.id))
    }
  };

  const details = () => (
    <div className="hiddenDefault">
      <div>{blog.url}</div>
      <div className="blog-likes">
        likes {like}
        <button
          onClick={() => {
            const newLike = like + 1;
            setLike(newLike);
            dispatch(likeBlogPost(blog.id, blog.likes))
          }}
          className="show-blog-btn"
        >
          like
        </button>
      </div>
      <div>{blog.author}</div>
      <div>
        <button
          onClick={deletePost}
          style={{ backgroundColor: "DodgerBlue" }}
        >
          remove
        </button>
      </div>
    </div>
  );

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  };
  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "2px",
        margin: "8px",
        padding: "8px",
      }}
      className="blog"
    >
      <div className="blogDefault">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisible}>{!isVisible ? "show" : "hide"}</button>
      </div>
      {isVisible && details()}
    </div>
  );
};

export default Blog;
