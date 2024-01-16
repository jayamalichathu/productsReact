import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import {CategoryFilterer} from '../CategoryFilterer';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe('CategoryFilterer Component', () => {
    it('renders with the provided categories', () => {
        const onSelectCategoryMock = jest.fn();
        render(
            <CategoryFilterer onSelectCategory={onSelectCategoryMock} />
        );

        const labelElement = screen.getByText('Categories:');
        const categoryListElement = screen.getByDisplayValue('All');
        expect(labelElement).toBeInTheDocument();
        expect(categoryListElement).toBeInTheDocument();
    });

    it('onSelectCategory should be called when a category is selected', () => {
        const onSelectCategoryMock = jest.fn();
        render(
            <CategoryFilterer onSelectCategory={onSelectCategoryMock} />
        );

        const categoryListElement = screen.getByDisplayValue('All');
        fireEvent.change(categoryListElement, { target: { value: 'meat' } });

        expect(onSelectCategoryMock).toHaveBeenCalledWith('meat');
    });
});