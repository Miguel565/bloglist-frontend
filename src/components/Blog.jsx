import { useState } from 'react'

export const Blog = ({ blog, handleLikes, onDelete }) => {
    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible(!visible)
    }

    return (
        <li className='blog'>
            {blog.title} <button onClick={handleVisible}>{visible ? 'hide' : 'view'}</button>
            {blog.author}
            {visible &&
                <div className='togglableContent'>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></p>
                    <p>{blog.user.name}</p>
                    {
                        blog.user.username === window.localStorage.getItem('loggedBlogUser') &&
                        <form onSubmit={() => onDelete(blog.id)}>
                            <button type='submit'>remove</button>
                        </form>
                    }
                </div>
            }
        </li>
    )
}

const Blogs = ({ blogs, handleLikes, onDelete }) => {
    return (
        <div>
            <ul>
                {
                    blogs?.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            onDelete={onDelete}
                            handleLikes={handleLikes}
                        />
                    )
                }
            </ul>
        </div>
    )
}

export default Blogs