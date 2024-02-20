const Blog = require('../models/modelblog')

const initialBlogs = [
    {
        title: "async/await simplifies making async calls",
        author: "Jhoni",
        url: "http...../////////",
        likes: 200,
      }, 
      {
        title: "async/await simplifies making async calls",
        author: "Jhoni",
        url: "http...../////////",
        likes: 200,
      }
    ]
    

const nonExistingId = async () => {
  const blog = new Blog({
    title: "async/await simplifies making async calls",
    author: "Jhoni",
    url: "http...../////////",
    likes: 200,
  })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogInDB = async () => {
  const blogs = await Blog.find({})
    return blogs.map(el => el.toJSON())

}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDB, usersInDb
}