import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLike, deletePost }) => {
  const [isVisible, setIsVisible] = useState(false)
  const viewDetails = { display: isVisible ? null : 'none' }
  
  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }
  const deleteBlogPost = () => {
    const deleteConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (deleteConfirm) {
      deletePost(blog.id)
    }
  }
  
  Blog.propTypes = {
    updateLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
  }
  return (
    <div style={{border: '1px solid', borderRadius: '2px', margin: '8px', padding: '8px'}}>
      {blog.title} <button onClick={toggleVisible}>{ !isVisible ? 'show': 'hide'}</button>
      <div style={viewDetails}>{blog.url}</div>
      <div style={viewDetails}>likes {blog.likes}
        <button
          onClick={() => {
            updateLike(blog.id,{
              user: blog.user.id,
              likes: blog.likes + 1,
              author: blog.author,
              title: blog.title,
              url: blog.url
            })
          }
          }
        >
        like
      </button>
      </div>
      <div style={viewDetails}>{blog.author}</div>
      <div style={viewDetails}><button onClick={deleteBlogPost} style={{backgroundColor: 'DodgerBlue'}}>remove</button></div>
    </div> 
  )
}
    

export default Blog