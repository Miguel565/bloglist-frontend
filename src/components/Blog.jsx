import { useState } from 'react'

const Blog = ({ blog, handleLikes, onDelete }) => {
    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible(!visible)
    }

    return (
        <li className='blog'>
            <p>{blog.title} <button onClick={handleVisible}>{visible ? 'hide' : 'view'}</button></p>
            <p>{blog.author}</p>
            {visible &&
                <div className='togglableContent'>
                    <p>{blog.url}</p>
                    <p data-testid="likes" >likes {blog.likes} <button data-testid="like-button" onClick={() => handleLikes(blog)}>like</button></p>
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

export default Blog
