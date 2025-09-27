import { useRef } from 'react'
import { useField } from '../hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/blogs'
import { setNotification } from '../context/NotificationContext'

const BlogForm = () => {
	const queryClient = useQueryClient()
	const blogFormRef = useRef()

	const { reset: resetTitle, ...title } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetUrl, ...url } = useField('text')

	const createBlog = useMutation({
		mutationFn: create,
		retry: 3,
		retryDealy: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000),
		onSuccess: (newBlog) => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
			setNotification({
				type: 'info',
				message: `Blog ${newBlog.title} created`
			}, 4000)
		},
		onError: (error) => {
			console.error('Failed to create blog');

			const errorMessage = error.response?.data?.message
                || error.message
                || 'Failed successfully to create new blog'
			
			setNotification({
				type: 'error',
				message: errorMessage
			}, 3000)
		}
	})

	const addBlog = (event) => {
		blogFormRef.current.toggleVisibility()
		event.preventDefault()
		createBlog.mutate({
			title: title.value,
			author: author.value,
			url: url.value
		})
		handleReset()
	}

	const handleReset = () => {
		resetTitle()
		resetAuthor()
		resetUrl()
	}

	return (
		<div className="form">
			<form onSubmit={addBlog}>
				<div>
					<label>
						Title:
						<input {...title} placeholder='Write title here' />
					</label>
				</div>
				<div>
					<label>
						Author:
						<input {...author} placeholder='Write author here' />
					</label>
				</div>
				<div>
					<label>
						Url:
						<input {...url} placeholder='Example: www.example.com' />
					</label>
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	)
}

export default BlogForm