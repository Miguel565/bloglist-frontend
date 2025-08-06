import { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
    const [visible, setVisible] = useState(false)

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
        <li style={blogStyle} className='blog'>
            {blog.title} <button onClick={handleVisible}>{visible ? 'hide' : 'view'}</button>
            {visible &&
                <div className='togglableContent'>
                    <p> {blog.author} </p>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></p>
                    <p>{blog.user.name}</p>
                </div>
            }
        </li>
    )
}

const Blogs = ({ blogs, handleLikes }) => {
    if (!blogs || blogs === undefined || blogs.length === 0) {
        return (
            <div>
                <p>No blogs yet</p>
            </div>
        )
    }
    return (
        <div>
            <ul>
                {
                    blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleLikes={handleLikes}
                        />
                    )
                }
            </ul>
        </div>
    )
}

export default Blogs