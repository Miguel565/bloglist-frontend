import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import BlogForm from './BlogForm'

test('Calls onSubmit with correct data into <BlogForm />', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#blog-title')
    const authorInput = container.querySelector('#blog-author')
    const urlInput = container.querySelector('#blog-url')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://testblog.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
})