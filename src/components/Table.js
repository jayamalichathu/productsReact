import React from 'react';
export default function Table({tableHeaders, tableData}) {
    return (
        <table>
            <tbody>
            <tr key="header">
                {tableHeaders}
            </tr>
            {tableData}
            </tbody>
        </table>
    )
}