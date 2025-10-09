import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getById, update, remove, createComment } from '../services/blogs'
import { useNotification } from '../hooks/useNotification'

const Blog = () => {
    const queryClient = useQueryClient()
    const { setNotification } = useNotification()
    const { id } = useParams()

    const [comment, setComment] = useState('')

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

    const addComment = useMutation({
        mutationFn: createComment,
        retry: 3,
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000),
        onSuccess: () => {
            queryClient.invalidateQueries(['blog', id])
        },
        onError: (error) => {
            console.error('Add comment failed:', error);

            const errorMessage = getErrorMessage(error)

            setNotification({
                type: 'error',
                message: errorMessage
            }, 4000)
        }
    })

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => getById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
            if (error.response?.status === 404) {
                return false
            }
            return failureCount < 3
        },
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000)
    })

    if (isLoading) {
        return <div><span>Loading...</span></div>
    }

    if (error) {
        return <div><span>Blog service not available</span></div>
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

    const handleComment = (event) => {
        event.preventDefault()
        addComment.mutate({
            blogId: blog.id,
            newComment: comment
        })
        setComment('')
    }

    return (
        <div>
            <h2><strong>{blog.title}</strong></h2>
            <div>
                <p>
                    <a href={blog.url}>View blog</a>
                </p>
                <p data-testid="likes" >
                    likes {blog.likes} <button data-testid="like-button" onClick={() => handleLikes(blog)}>like</button>
                </p>
                <p>created by: {blog.user.name}</p>
                {
                    blog.user.username === window.localStorage.getItem('userData') &&
                    <form onSubmit={() => handleDelete(blog.id)}>
                        <button>remove</button>
                    </form>
                }
            </div>
            <div>
                <h3>Comments</h3>
                <div>
                    <form onSubmit={handleComment}>
                        <div>
                            <label>
                                Comment
                                <input type='text'
                                name='comment'
                                value={comment}
                                onChange={({ target }) => setComment(target.value)}
                                />
                            </label>
                        </div>
                        <button>add comment</button>
                    </form>
                </div>
                <ul>
                    {blog.comments
                        ? blog.comments.map(comment =>
                            <li key={comment.id}>{comment.content}</li>
                        ) : <p>No comments yet</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Blog