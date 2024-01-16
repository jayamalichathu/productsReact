import React, {useCallback, useContext, useState} from "react";
import {TextBox} from "./TextBox";
import {LanguageContext} from "../locale/LanguageContext";

export default function PriceInput({price, onChange}){

    const localeContext = useContext(LanguageContext);

    const getAmount = (amount) => {
        try {
            return parseFloat(amount.replace(/[^0-9.]/g, ''));
        }
        catch (error) {
            console.error('Error parsing price:', error);
        }
    };
    const [amount, onChangeValue] = useState(price ? getAmount(price) : 0);

    const getCurrency = (price) => {
        try {
            // Use a regular expression to match the currency symbol
            const matches = price.match(/^[^\d]+/);

            // Extract the currency symbol from the matches
            return matches ? matches[0] : '';

        } catch (error) {
            console.error('Error getting currency symbol:', error);
        }
    };
    const [currencySymbol] = useState(price ? getCurrency(price) : '£');

    const formatPrice = useCallback((amount) => {
        try {
            // Format the currency using the user's locale
            const formatter = new Intl.NumberFormat(localeContext, {
                style: 'currency',
                currency: 'GBP',
            });

            return formatter.format(amount);
        } catch (error) {
            console.error('Error formatting currency:', error);
        }
    }, [localeContext])

    const onPriceChangeCallback = useCallback((value) => {
        onChangeValue(value);
        onChange(formatPrice(value));
    },[formatPrice, onChange]);
    return (
        <div className="PriceInput">
            <TextBox type="number" value={amount} onChange={onPriceChangeCallback}/>
            <span>{currencySymbol}</span>
        </div>
    )
}
