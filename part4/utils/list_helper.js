const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPost) =>
    blogPost.length === 0
        ? 0
        : blogPost.reduce((sum, blog) => sum + blog.likes, 0)



module.exports = {
    totalLikes,
    dummy
}