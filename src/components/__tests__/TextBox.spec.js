import React from 'react';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import {TextBox} from '../TextBox';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe('TextBox Component', () => {
    it('renders with the provided value', () => {
        render(<TextBox value="test" onChange={() => {}} />);
        const inputElement = screen.getByDisplayValue('test');
        expect(inputElement).toHaveAttribute("value", "test");
    });

    it('type should vary according to the provided type', () => {
        render(<TextBox value={1} type="number" onChange={() => {}} />);
        const inputElement = screen.getByDisplayValue(1);
        expect(inputElement.type).toBe('number');
    });

    it('calls onChange when the input value changes', () => {
        const onChangeMock = jest.fn();
        render(<TextBox value="test" onChange={onChangeMock} />);
        const inputElement = screen.getByPlaceholderText('Enter value');
        const value = 'test2';

        fireEvent.change(inputElement, {
            target: {
                value
            }
        })

        expect(onChangeMock).toBeCalledTimes(1);
        expect(inputElement).toHaveAttribute("value", value);
    });

    it('renders as a text input when no type is provided', () => {
        render(<TextBox value="test" onChange={() => {}} />);
        const inputElement = screen.getByDisplayValue('test');

        expect(inputElement.type).toBe('text');
    });

    it('renders as disabled when disabled prop is true', () => {
        render(<TextBox value="test" onChange={() => {}} disabled />);
        const inputElement = screen.getByDisplayValue('test');

        expect(inputElement).toBeDisabled();
    });

    it('renders as not disabled when disabled prop is false', () => {
        render(<TextBox value="test" onChange={() => {}} disabled={false} />);
        const inputElement = screen.getByDisplayValue('test');

        expect(inputElement).not.toBeDisabled();
    });
});
