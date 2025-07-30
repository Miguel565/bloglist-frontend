const Blog = ({ blog }) => {
    <div>
        {blog.title} {blog.author} {blog.url} {blog.user}
    </div>
}

const Blogs = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    );
}

export default Blogs