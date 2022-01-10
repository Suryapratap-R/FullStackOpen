const _ = require('lodash');

const mostBlogs = (blogList) => {
  const authors = _.map(blogList, 'author')
  const noBlog = _.mapValues( _.groupBy(authors), (o)=>o.length)

  const maxBlogs = Object.entries(noBlog)
    .reduce((prev, cur) => prev[1] > cur[1] ? prev : cur, [])

  return maxBlogs.length === 0
    ? {}
    : {
      author: maxBlogs[0],
      blogs: maxBlogs[1]
    }
}

const mostLikes = (blogList) => {
  const groupAuthor = _.groupBy(blogList, 'author')
  const authorLikes = _.mapValues(groupAuthor, (o) => o.reduce((prev, cur) => {
      return prev + cur.likes;
  }, 0)
  )
  const mostLiked = Object.entries(authorLikes).reduce((prev, cur) => {
    return prev[1] > cur[1] ? prev : cur;
  }, 0)
  return mostLiked === 0
    ? {}
    : {
    author: mostLiked[0],
    likes: mostLiked[1]
  }
}

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
  favorateBlog,
  mostBlogs,
  mostLikes
}