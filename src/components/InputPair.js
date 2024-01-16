import React from 'react';
export const InputPair = (props) => (
    <div className="InputPair" onMouseMove={props.onMouseMove} onMouseLeave={props.onMouseLeave}>
        <label>{props.label}</label>
        {props.children}
    </div>
);