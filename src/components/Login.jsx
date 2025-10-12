import { useState } from 'react'
import { useAuthUser } from '../hooks/useAuthUser'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap'

const LoginForm = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { authUser, userLogin } = useAuthUser()

	const handleLogin = (event) => {
		event.preventDefault()
		userLogin({
			username: username,
			password: password
		})
		setUsername('')
		setPassword('')
		if (authUser) {
			navigate('/')
		}
	}

	return (
		<Container className='col-md-4 mx-auto py-4'>
			<Card style={{ width: '30rem' }}>
				<Card.Header as='h2'>Log into application</Card.Header>
				<Card.Body>
					<Form onSubmit={handleLogin}>
						<Form.Group className='mb-3'>
							<Form.Label>Username</Form.Label>
							<Form.Control type='text' name='username'
								value={username}
								required
								onChange={({ target }) => setUsername(target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' name='password'
								value={password}
								required
								onChange={({ target }) => setPassword(target.value)}
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>Sign in</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	)
}

LoginForm.displayName = 'LoginForm'

export default LoginForm