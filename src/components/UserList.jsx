import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getUsers } from '../services/users'
import { Container, Table, Card } from 'react-bootstrap'

const UserList = () => {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000)
    })

    if (isLoading) {
        return <div><span>Loading...</span></div>
    }

    if (error) {
        return <div><span>Blogs service not available </span></div>
    }

    return (
        <Container className='py-4'>
            <Card>
                <Card.Header as='h2'><strong>Users</strong></Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Users</th>
                                <th>blogs created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) =>
                                    <tr key={user.id}>
                                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                        <td>{user.blogs.length}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default UserList