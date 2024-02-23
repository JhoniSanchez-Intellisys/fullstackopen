const Blog = ({ blog }) => (
  <div>
    
    <h3 style={{"display": "inline"}}>{blog.title}</h3> - -{blog.author}-{blog.User}-{blog.url}-{blog.userId}
  </div>  
)

export default Blog