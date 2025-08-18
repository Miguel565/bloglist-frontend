import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = (event) => {
		event.preventDefault()
		handleLogin(username, password)
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

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm