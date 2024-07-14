import React, {useCallback} from 'react';

function NavLink({link, onSelect}) {
    const onSelectCallback = useCallback((event) => {
        onSelect(link.component)
    }, [onSelect, link.component])
    return (
        <li key={link.page} onClick={onSelectCallback}>{link.page}</li>
    )
}

export function List({listItems, onSelectLink}) {
    const navLinkComponents = listItems.map(link => {
        return <NavLink key={"nav " + link.page} link={link} onSelect={onSelectLink}/>
    })
    return (
        <ul className="List">
            {navLinkComponents}
        </ul>
    )

}