import React, {useCallback, useState} from 'react';
import {ProductPage} from "./ProductPage";
import {List} from "./List";

const IntroductionPage = () => <div className="IntroductionPage"> Welcome to A-Mart Stores. We are a supermarket chain.</div>

const navLinks = [
    {"page": "Home", "component":IntroductionPage },
    {"page": "Products", "component":ProductPage },
]
export function Home() {
    const [selectedComponent, setComponent] = useState(IntroductionPage);
    const onSelectLink = useCallback((comp) => {
        setComponent(comp)
    }, [setComponent]);

    return (
        <div className="Home">
            <div>
                <List listItems={navLinks} onSelectLink={onSelectLink}/>
            </div>
            <div>
                {selectedComponent}
            </div>

        </div>
    );
}