import React, {useState, useCallback} from 'react';

export function CategoryList({items, onChangeItem}) {
    const [selectedCategory, onChange] = useState(items[0]);

    const onChangeCategory = useCallback((event) => {
        onChange(event.target.value);
        onChangeItem(event.target.value);
    },[onChange, onChangeItem]);

    const options = items.map(item => <option key={item} value={item}>{item}</option>)

    return (
        <select onChange={onChangeCategory} value={selectedCategory}>
            {options}
        </select>

    );
}