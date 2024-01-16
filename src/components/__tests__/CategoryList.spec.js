import React from 'react';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import { CategoryList } from '../CategoryList';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe('CategoryList Component', () => {
    const items = ['All','vegetables', 'meat', 'furniture'];
    it('renders with the provided items', () => {
        const onChangeItem = jest.fn();
        render(
            <CategoryList items={items} onChangeItem={onChangeItem} />
        );

        const selectElement = screen.getByDisplayValue('All');
        expect(selectElement).toBeInTheDocument();

        items.forEach((item) => {
            expect(selectElement).toHaveTextContent(item);
        });
    });

    it('should correctly set default option', () => {
        const onChangeItem = jest.fn();

        render(
            <CategoryList items={items} onChangeItem={onChangeItem} />
        );

        expect(screen.getByRole('option', { name: 'All' }).selected).toBe(true)
    })

    it('calls onChangeItem when a category is selected', () => {
        const items = ['vegetables', 'meat', 'furniture'];
        const onChangeItemMock = jest.fn();
        render(
            <CategoryList items={items} onChangeItem={onChangeItemMock} />
        );

        const selectElement = screen.getByDisplayValue("vegetables");
        fireEvent.change(selectElement, { target: { value: 'meat' } });

        expect(onChangeItemMock).toHaveBeenCalledWith('meat');
    });

});
