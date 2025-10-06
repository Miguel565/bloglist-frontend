import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getUsers } from '../services/users'

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

    console.log('User: ', users)

    return (
        <div>
            <h2><strom>Users</strom></h2>
            <table>
                <tr>
                    <th>Users</th>
                    <th>blogs created</th>
                </tr>
                {
                    users.map((user) =>
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default UserList