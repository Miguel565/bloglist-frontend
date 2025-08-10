import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";

test("Renders title", () => {
	const blog = {
		title: 'Renderizando el componente para pruebas',
		author: 'Porgas D. Ace',
	};

	render(<Blog blog={blog} />);

	screen.debug();

	const element = screen.getByText('Renderizando el componente para pruebas');

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

    // Ahora url y likes deben estar visibles
    expect(screen.getByText('http://ejemplo.com')).toBeDefined();
    expect(screen.getByText(/likes 42/)).toBeDefined();
});

test('Does no render this', () => {
	const blog = {
		title: 'Renderizando el componente para pruebas',
		author: "Porgas D. Ace",
	};
	render(<Blog blog={blog} />);

	const element = screen.queryByText('No deberia estar');
	expect(element).toBeNull();
})
