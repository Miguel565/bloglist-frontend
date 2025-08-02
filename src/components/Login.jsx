import { useState } from 'react'

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
			<form onSubmit={onSubmit}>
				<div>
					<label>
						Username:
						<input type="text"
							name="username"
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

export default LoginForm