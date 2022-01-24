import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const viewDetails = { display: isVisible ? null : 'none' }
  
  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div style={{border: '1px solid', borderRadius: '2px', margin: '8px', padding: '8px'}}>
      {blog.title} <button onClick={toggleVisible}>{ !isVisible ? 'show': 'hide'}</button>
      <div style={viewDetails}>{blog.url}</div>
      <div style={viewDetails}>{blog.likes}</div>
      <div style={viewDetails}>{blog.author}</div>
    </div> 
  )
}
    

export default Blog