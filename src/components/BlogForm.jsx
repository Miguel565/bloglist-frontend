import { useField } from '../hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/blogs'
import { useNotification } from '../hooks/useNotification'
import { Container, Card, Form, Button } from 'react-bootstrap'

const BlogForm = () => {
	const queryClient = useQueryClient()

	const { setNotification } = useNotification()

	const { reset: resetTitle, ...title } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetUrl, ...url } = useField('text')

	const createBlog = useMutation({
		mutationFn: create,
		retry: 3,
		retryDelay: attemptIndex => Math.min(100 * 2 ** attemptIndex, 30000),
		onSuccess: (newBlog) => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
			setNotification({
				type: 'info',
				message: `Blog ${newBlog.title} created`
			})
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
		<Container>
			<Card>
				<Card.Header as='h3'>New Blog</Card.Header>
				<Card.Body>
					<Form onSubmit={addBlog}>
						<Form.Group className='mb-3'>
							<Form.Label>
								Title:
								<Form.Control {...title} placeholder='Write title here' />
							</Form.Label>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>
								Author:
								<Form.Control {...author} placeholder='Write author here' />
							</Form.Label>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>
								Url:
								<Form.Control {...url} placeholder='Example: www.example.com' />
							</Form.Label>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Button variant='primary' type='submit'>create</Button>
							<Button variant='secundary' className='mb-2' onClick={handleReset}>reset</Button>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default BlogForm