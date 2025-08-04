import { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
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
            <li>
                <div>
                    {blog.title} 
                    <button onClick={() => handleVisible()} > { textLabel } </button>
                </div>
                <div style={hide} >
                    Author: {blog.author}
                    Url: {blog.url}
                    Likes: {blog.likes}
                    <button onClick={() => handleLikes(blog)} >like</button>
                </div>
            </li>
        </div>
    )
}

const Blogs = ({ blogs, handleLikes }) => {
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
                {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />)}
            </ul>
        </div>
    )
}

export default Blogs