const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPost) =>
    blogPost.length === 0
        ? 0
        : blogPost.reduce((sum, blog) => sum + blog.likes, 0)

const favorateBlog = (blogList) => blogList.find(blog => blog.likes === Math.max(...blogList.map((val) => val.likes)))
 


module.exports = {
  totalLikes,
  dummy,
  favorateBlog
}