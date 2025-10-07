import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthUser } from '../hooks/useAuthUser'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { getAll } from '../services/blogs'

const BlogList = () => {
    const blogFormRef = useRef()

    const { authUser } = useAuthUser()

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
        <div>
            <h2>Blogs List</h2>
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
                        <li key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default BlogList