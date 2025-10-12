import { useParams } from 'react-router-dom'
import { getUserById } from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { Container, Card } from 'react-bootstrap'

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
        <Container className='col-md-5 mx-auto py-4'>
            <Card>
                <Card.Header as='h3'><strong>{user.name}</strong></Card.Header>
                <Card.Body>
                    <Card.Title>blogs added</Card.Title>
                    <dvi>
                        <ul>
                            {user.blogs?.map(blog =>
                                <li key={blog.id}>{blog.title}</li>
                            )}
                        </ul>
                    </dvi>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default User