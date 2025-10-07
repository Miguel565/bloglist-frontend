import { useParams } from 'react-router-dom'
import { getUserById } from '../services/users'
import { useQuery } from '@tanstack/react-query'

const User = () => {
    const { id } = useParams()

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
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
        return <div>
            <span>Users service not available </span>
        </div>
    }

    return (
        <div>
            <h2><strong>{user.name}</strong></h2>
            <h3>blogs added</h3>
            <div>
                <ul>
                    {user.blogs?.map(blog =>
                        <li key={blog.id}>{blog.title}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default User