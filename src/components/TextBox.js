import React, {useCallback, useEffect, useState} from 'react';

export function TextBox({type,value, onChange, disabled}) {

    const [textValue, onChangeValue] = useState(value);
    useEffect(() => {
        if (value) {
            onChangeValue(value);
        }
    }, [value, onChangeValue]);

    const onChangeCallback = useCallback((event) => {
        onChange(event.target.value);
        onChangeValue(event.target.value);
    },[onChange, onChangeValue]);

    return (
        <input
            type={type ? type: "text"}
            placeholder="Enter value"
            value={textValue}
            onChange={onChangeCallback}
            disabled={disabled}/>
    )
}