import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";
import { expect } from "vitest";

test("Renders title", () => {
	const blog = {
		title: 'Renderizando el componente',
		author: 'Porgas D. Ace',
        url: 'http://ejemplo.com',
        likes: 42,
        user: { name: 'Usuario', username: 'usuario' }
	};

	render(<Blog blog={blog} />);

	screen.debug();

	const element = screen.getByText('Renderizando el componente');

	expect(element).toBeDefined();
});

test('Muestra url y likes al hacer clic en el botón de detalles', async () => {
    const blog = {
        title: 'Blog de prueba',
        author: 'Autor',
        url: 'http://ejemplo.com',
        likes: 42,
        user: { name: 'Usuario', username: 'usuario' }
    };

    render(<Blog blog={blog} handleLikes={() => {}} onDelete={() => {}} />);

    // Antes de hacer clic, url y likes no deben estar en el documento
    expect(screen.queryByText('http://ejemplo.com')).toBeNull();
    expect(screen.queryByText(/likes 42/)).toBeNull();

    // Hacer clic en el botón "view"
    const button = screen.getByText('view');
    await userEvent.click(button);

    screen.debug();

    // Ahora url y likes deben estar visibles
    expect(screen.getByText('http://ejemplo.com')).toBeDefined();
    expect(screen.getByText(/likes 42/)).toBeDefined();
});

test('Call handleLikes twice', async () => {
    const blog = {
        title: 'Blog de prueba',
        author: 'Autor',
        url: 'http://ejemplo.com',
        likes: 42,
        user: { name: 'Usuario', username: 'usuario' }
    }

    const mockHandleLikes = vi.fn()

    render(<Blog blog={blog} handleLikes={mockHandleLikes} onDelete={() => {}} />)

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    // Before to do click on button like, likes should be 42
    expect(screen.getByText(/likes 42/)).toBeDefined()

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    // Check if handleLikes was called twice
    expect(mockHandleLikes).toHaveBeenCalledTimes(2)
})

test('Does no render this', () => {
	const blog = {
		title: 'Renderizando el componente',
		author: "Porgas D. Ace",
	};
	render(<Blog blog={blog} />);

	const element = screen.queryByText('No deberia estar');
	expect(element).toBeNull();
})
