import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../hooks/useNotification'
import { useAuthUser } from '../hooks/useAuthUser'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { getAll, update, remove } from '../services/blogs'

const BlogList = () => {
    const queryClient = useQueryClient()
    const { setNotification } = useNotification()
    const [visible, setVisible] = useState(false)
    const blogFormRef = useRef()

    const { authUser } = useAuthUser()

    const updateLikes = useMutation({
        mutationFn: update,
        retry: 3,
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000),
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        },
        onError: (error) => {
            console.error('Update failed:', error)

            const errorMessage = getErrorMessage(error)

            setNotification({
                type: 'error',
                message: errorMessage
            }, 4000)
        }
    })

    const deleteBlog = useMutation({
        mutationFn: remove,
        retry: 3,
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000),
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
            setNotification({
                type: 'info',
                message: 'Removed blog successfully'
            })
        },
        onError: (error) => {
            console.error('Delete failed:', error);

            const errorMessage = getErrorMessage(error)

            setNotification({
                type: 'error',
                message: errorMessage
            }, 4000)
        }
    })

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000)
    })

    if (result.isLoading) {
        return <div><span>Loading...</span></div>
    }

    if (result.error) {
        return <div><span>Blogs service not available due to problems in server</span></div>
    }

    const blogs = result.data

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleLikes = (blog) => {
        updateLikes.mutate({ ...blog, likes: blog.likes + 1 })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete blog?')) {
            deleteBlog.mutate(id)
        }
    }

    const getErrorMessage = (error) => {
        if (error.response?.data?.message) {
            return error.response.data.message
        } else if (error.message) {
            return error.message
        }
        return 'An unexpected error!'
    }

    return (
        <div>
            <h2>Blogs List</h2>
            {
                <div>
                    authUser &&
                    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                        <BlogForm />
                    </Togglable>
                </div>
            }
            <ul>
                {
                    blogs.map((blog) =>
                        <li key={blog.id}>
                            <p>{blog.title} <button onClick={handleVisible}>{visible ? 'hide' : 'view'}</button></p>
                            <p>{blog.author}</p>
                            {visible &&
                                <div className='togglableContent'>
                                    <p>{blog.url}</p>
                                    <p data-testid="likes" >likes {blog.likes} <button data-testid="like-button" onClick={() => handleLikes(blog)}>like</button></p>
                                    <p>{blog.user.name}</p>
                                    {
                                        blog.user.username === window.localStorage.getItem('userData') &&
                                        <form onSubmit={() => handleDelete(blog.id)}>
                                            <button>remove</button>
                                        </form>
                                    }
                                </div>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default BlogList