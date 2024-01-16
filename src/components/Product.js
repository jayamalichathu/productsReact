import React, {useCallback, useEffect, useState} from 'react';
import {PRODUCT_ATTRIBUTES} from "../selectors/ProductSelector";

const TDElement = ({header, product}) => {
    const value = product[header.key];
    let classname = "";
    let component;
    if (header.key === "isSpecial" || header.key === "canBeExpired") {
        component =
                <input
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    defaultChecked={product[header.key]}
                    disabled={true}
                />
    }
    else {
        classname = "ProductElement";
        component = value;
    }

    return (
        <td className={classname}>
            <div>
                {component}
            </div>
        </td>
    )


}
export const Product=  ({product,selectedProduct, onSelect}) => {
    const[selected, onSelectProduct] = useState(selectedProduct ? selectedProduct.name === product.name : false);

    useEffect(() => {
        onSelectProduct(selectedProduct ? selectedProduct.name === product.name : false);
    }, [onSelectProduct, selectedProduct, product]);

    const className = "Product" + (product.isSpecial ? " Highlight" : "") + (selected ? " Selected" : "");

    const onSelectProductCallBack = useCallback(() => {
        onSelectProduct(true)
        onSelect(product)
    }, [onSelect,product]);

    const productElements = PRODUCT_ATTRIBUTES
        .map(header => {
            const key = header.key + " td";
            return <TDElement key={key} product={product} header={header}/>;
        });

    return (
        <tr key={product.name} className={className} onClick={onSelectProductCallBack}>
            {productElements}
        </tr>)
}
