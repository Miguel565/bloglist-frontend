import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthUser } from '../hooks/useAuthUser'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { getAll } from '../services/blogs'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const BlogList = () => {
    const blogFormRef = useRef()

    const { authUser, checkUserStatus } = useAuthUser()

    useEffect(() => {
        checkUserStatus()
    }, [])

    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000)
    })

    if (isLoading) {
        return <div><span>Loading...</span></div>
    }

    if (error) {
        return <div><span>Blogs service not available due to problems in server</span></div>
    }

    return (
        <Container className='py-4'>
            <Card>
                <Card.Header as='h2'><strong>Blogs List</strong></Card.Header>
                <Card.Body>
                    {
                        <div>
                            {authUser &&
                                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                                    <BlogForm />
                                </Togglable>}
                        </div>
                    }
                    <ul>
                        {
                            blogs.map((blog) =>
                                <li className='blog' key={blog.id}>
                                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default BlogList