import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getById, update, remove, createComment } from '../services/blogs'
import { useNotification } from '../hooks/useNotification'
import { Container, Card, Button, Form } from 'react-bootstrap'

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
        <Container className='col-md-5 mx-auto py-4'>
            <Card>
                <Card.Header as='h2'><strong>{blog.title}</strong></Card.Header>
                <Card.Body>
                    <Card.Link href={blog.url}>View blog</Card.Link>
                    <Card.Text>
                        likes {blog.likes} <Button variant='primary' onClick={() => handleLikes(blog)}>like</Button>
                    </Card.Text>
                    <Card.Text>created by: {blog.user.name}</Card.Text>
                    {
                        blog.user.username === window.localStorage.getItem('userData') &&
                        <Form onSubmit={() => handleDelete(blog.id)}>
                            <Form.Group className='mb-3'>
                                <Button variant='danger' type='submit'>remove</Button>
                            </Form.Group>
                        </Form>
                    }
                    <Card.Title as='h3'>Comments</Card.Title>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control type='text'
                                name='comment'
                                value={comment}
                                onChange={({ target }) => setComment(target.value)}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>send</Button>
                    </Form>
                    {blog.comments
                        ? blog.comments.map(comment =>
                            <li key={comment.id}>{comment.content}</li>
                        ) : <p>No comments yet</p>
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Blog