import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/blogs'

const BlogList = () => {
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 2
    })

    if (result.isLoading) {
        return <div><spam>Loading...</spam></div>
    }

    if (result.isError) {
        return <div><spam>Blogs service not available due to problems in server</spam></div>
    }

    const blogs = result.data

    return (
        <div>
            <h2>Blogs List</h2>
            <ul>
                {
                    blogs?.map((blog) => {
                        <li className='blog' key={blog.id}>
                            <p>{blog.title} by: {blog.author}</p>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default BlogList