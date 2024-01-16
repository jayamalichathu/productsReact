import React from 'react';

export const Button = ({ onClick, value, disabled }) => (
    <input type="button" {...{ onClick, value, disabled }} />
);