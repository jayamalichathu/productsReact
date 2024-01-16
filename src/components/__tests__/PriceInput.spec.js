import {cleanup, fireEvent, render, screen} from "@testing-library/react";

import '@testing-library/jest-dom';
import PriceInput from "../PriceInput";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe('PriceInput Component', () => {
    it('should be rendered with the provided price and currency symbol', () => {
        render(
            <PriceInput price="£100.00" onChange={() => {}} />
        );

        const inputElement = screen.getByPlaceholderText("Enter value");
        const currencySymbolElement = screen.getByText('£');
        expect(inputElement.value).toBe('100');
        expect(currencySymbolElement).toBeInTheDocument();
    });

    it('calls onChange with the formatted price when input changes', () => {
        const onChangeMock = jest.fn();
        render(<PriceInput onChange={onChangeMock} />);

        const inputElement = screen.getByPlaceholderText("Enter value");

        fireEvent.change(inputElement, { target: { value: '150.25' } });

        expect(onChangeMock).toHaveBeenCalledWith('£150.25');
    });

});
