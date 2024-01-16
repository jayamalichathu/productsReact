import React from "react";

export default function Checkbox({value, onChange}){
    return (
        <input
            type="checkbox"
            value={value}
            onChange={onChange}/>
    )
}
