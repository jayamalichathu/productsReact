import React, {useContext} from 'react';
import {getMessageString} from "../selectors/LocaleMessageSelector";
import {LanguageContext} from "../locale/LanguageContext";
import {ProductList} from "./ProductList";

export function ProductPage() {
    return (
        <div className="ProductPage">
            <div>{getMessageString(useContext(LanguageContext),"welcome")}</div>
            <ProductList/>
        </div>
    );

}