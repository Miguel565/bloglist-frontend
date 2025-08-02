const Blog = ({ blog }) => {
    <div>
        {blog.title} {blog.author} {blog.url} {blog.user}
    </div>
}

const Blogs = ({ blogs }) => {
    if (!blogs || blogs.length === 0) {
        return (
            <div>
                <p>No blogs yet</p>
            </div>
        )
    }
    return (
        <div>
            <ul>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </ul>
        </div>
    )
}

export default Blogs