import {cleanup, fireEvent, render, screen} from "@testing-library/react";

import '@testing-library/jest-dom';
import {Button} from "../Button";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe("Button Component", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} value="Create" disabled={true} />);
    const button = screen.getByDisplayValue("Create");

    test("Button Rendering", () => {
        expect(button).toBeInTheDocument();
    })

    it("calls onClick function when clicked", () => {
        const mockOnClick = jest.fn();
        render(<Button onClick={mockOnClick} value="Click me" />);
        const button = screen.getByDisplayValue("Click me");

        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("Button Disabled", () => {
        expect(button).toBeDisabled()
    });

    it("Check button is enabled when disabled is false", () => {
        const mockOnClick = jest.fn();
        render(<Button onClick={mockOnClick} value="Click me"  disabled={false}/>);
        const button = screen.getByDisplayValue("Click me");
        expect(button).toBeEnabled();
    });
})