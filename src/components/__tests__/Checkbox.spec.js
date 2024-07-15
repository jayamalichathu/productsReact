import React from 'react';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import Checkbox from '../Checkbox';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe('Checkbox Component', () => {
    it('renders with the provided value', () => {
        render(<Checkbox value="sample" onChange={() => {}} />);
        const checkbox = screen.getByRole('checkbox', { type: 'checkbox' });
        expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it('calls onChange when checkbox is clicked', () => {
        const onChangeMock = jest.fn();
        render(<Checkbox value="sample" onChange={onChangeMock} />);
        const checkbox = screen.getByRole('checkbox', { type: 'checkbox' });

        fireEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalled();
    });

    it('updates value when checkbox is clicked', () => {
        const onChangeMock = jest.fn();
        render(<Checkbox value="sample" onChange={onChangeMock} />);
        const checkbox = screen.getByRole('checkbox', { type: 'checkbox' });

        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);
    });
});
