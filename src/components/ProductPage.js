import React, {useContext} from 'react';
import {getMessageString} from "../selectors/LocaleMessageSelector";
import {LanguageContext} from "../locale/LanguageContext";
import {ProductList} from "./ProductList";
import {AuthContext} from "../auth/AuthContext";
import Login from "./LoginPage";

export function ProductPage() {
    const languageContext = useContext(LanguageContext);
    const user = useContext(AuthContext);
    if (user) {
        return (
            <div className="ProductPage">
                <div>{getMessageString(languageContext,"welcome")}</div>
                <ProductList/>
            </div>
        );
    }
    else {
        return (<Login/>);
    }
}