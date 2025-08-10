import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("Renders title", () => {
	const blog = {
		title: "Rendierizando el componente para pruebas",
		author: "Porgas D. Ace",
	};

	render(<Blog blog={blog} />);

	screen.debug();

	const element = screen.getByText("Rendierizando el componente para pruebas");

	expect(element).toBeDefined();
});

test('Does no render this', () => {
	const blog = {
		title: "Rendierizando el componente para pruebas",
		author: "Porgas D. Ace",
	};
	render(<Blog blog={blog} />);

	const element = screen.queryByText('No deberia estar');
	expect(element).toBeNull();
})
