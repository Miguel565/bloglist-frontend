import { useState } from 'react'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const hide = visible ? 'none' : 'block'
    const textLabel = visible ? 'hide' : 'view'

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidht: 1,
        marginBottom: 5
    }

    const handleVisible = () => {
        setVisible(!visible)
    }

    return (
        <div style={blogStyle}>
            <li className="blog">
                <div>
                    {blog.title} 
                    <button onClick={() => handleVisible()} > { textLabel } </button>
                </div>
                <div style={hide} >
                    {blog.author} {blog.url} {blog.likes}
                </div>
            </li>
        </div>
    )
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