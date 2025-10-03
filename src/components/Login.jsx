import { useState } from 'react'
import { useAuthUser } from '../hooks/useAuthUser'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const { userLogin } = useAuthUser()

	const onSubmit = (event) => {
		event.preventDefault()
		userLogin({
			username: username,
			password: password
		})
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={onSubmit} data-testid='form'>
				<div>
					<label>
						Username:
						<input type="text"
							name="username"
							data-testid='username'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						Password:
						<input type="password"
							name="password"
							data-testid='password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</label>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

LoginForm.displayName = 'LoginForm'

export default LoginForm