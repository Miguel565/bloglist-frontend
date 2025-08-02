import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const onSubmit = (event) => {
		event.preventDefault()
		createBlog(title, author, url)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<label>
						Title:
						<input
							type="text"
							name="title"
							value={title}
							placeholder="Write title here"
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						Author:
						<input
							type="text"
							name="author"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						Url:
						<input
							type="text"
							name="url"
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</label>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm