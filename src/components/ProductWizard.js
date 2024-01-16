import React, {useCallback, useContext, useEffect, useState} from 'react';

import {CategoryList} from "./CategoryList";
import {CATEGORIES} from "../selectors/ProductSelector";
import {InputPair} from "./InputPair";
import {TextBox} from "./TextBox";
import {Button} from "./Button";
import Checkbox from "./Checkbox";
import {getMessageString} from "../selectors/LocaleMessageSelector";
import {LanguageContext} from "../locale/LanguageContext";
import PriceInput from "./PriceInput";

export function ProductWizard({onFinish, product}) {
    const localeContext = useContext(LanguageContext);
    const [name, onChange] = useState(product ? product.name : "");
    const onNameChangeCallback = useCallback((value) => {
        onChange(value);

    },[onChange]);

    const [category, onCategoryChange] = useState(product ? product.category : CATEGORIES[0]);
    const onCategoryChangeCallback = useCallback((selectedCategory) => {
        onCategoryChange(selectedCategory);

    },[onCategoryChange]);


    const [description, onDescriptionChange] = useState(product ? product.description :"");
    const onDescriptionChangeCallback = useCallback((value) => {
        onDescriptionChange(value);

    },[onDescriptionChange]);

    const [price, onPriceChange] = useState(product ? product.price :"");
    const onPriceChangeCallback = useCallback((value) => {
        onPriceChange(value);
    },[onPriceChange]);

    const [canBeExpired, onExpiredChanged] = useState(product ? product.canBeExpired :"");
    const onExpiredChangedCallback = useCallback((event) => {
        const isExpired = event.target.checked
        onExpiredChanged(isExpired);
    },[onExpiredChanged]);

    const [expiredDate, onExpiredDateChanged] = useState(product ? product.expiredDate : null);
    const onExpiredDateChangedCallback = useCallback((value) => {
        onExpiredDateChanged(value);
    },[onExpiredDateChanged]);

    const formatDefaultDate = () => {
        const date = new Date();
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });
        return year + "-" + month + "-" + day;
    }

    useEffect(() => {
        if (!expiredDate && canBeExpired) {
            onExpiredDateChanged(formatDefaultDate());
        }

        else if (!canBeExpired && !expiredDate ){
            onExpiredDateChanged("");
        }

    }, [expiredDate, canBeExpired, onExpiredDateChanged]);

    const [isSpecial, onSpecialChange] = useState(product ? product.isSpecial : false);
    const onSpecialChangeCallback = useCallback((event) => {
        onSpecialChange(event.target.checked);
    },[onSpecialChange]);

    const onClickProductButton = useCallback(() => {
        const product = {
            name,
            category,
            price,
            description,
            canBeExpired,
            expiredDate,
            isSpecial
        };
        onFinish(product);
    }, [onFinish,
        name,
        category,
        price,
        description,
        canBeExpired,
        expiredDate,
        isSpecial]);

    const title = product ? getMessageString(localeContext,"editTitle"): getMessageString(localeContext,"createTitle");

    return (
        <div className="ProductWizard">
            <div>{title}</div>
            <div>
                <InputPair label={getMessageString(localeContext,"productName")}>
                    <TextBox
                        value={name}
                        onChange={onNameChangeCallback}
                        disabled={!!product}
                        />
                </InputPair>

                <InputPair label={getMessageString(localeContext, "category")}>
                    <CategoryList items={CATEGORIES}  selected = {category} onChangeItem={onCategoryChangeCallback}/>
                </InputPair>

                <InputPair label={getMessageString(localeContext,"description")}>
                    <TextBox value={description} onChange={onDescriptionChangeCallback}/>
                </InputPair>

                <InputPair label={getMessageString(localeContext,"price")}>
                    <div>
                        <PriceInput price={price} onChange={onPriceChangeCallback}/>
                    </div>
                </InputPair>

                <InputPair label={getMessageString(localeContext,"canBeExpired")}>
                    <Checkbox checked={canBeExpired} onChange={onExpiredChangedCallback}/>
                </InputPair>
                {
                    canBeExpired
                    &&
                    <InputPair label={getMessageString(localeContext,"expiredDate")}>
                        <TextBox type ="date" value={expiredDate} onChange={onExpiredDateChangedCallback}/>
                    </InputPair>
                }

                <InputPair label={getMessageString(localeContext,"isSpecial")}>
                    <Checkbox checked={isSpecial} onChange={onSpecialChangeCallback}/>
                </InputPair>

            </div>
            <div>
                <Button value={product ? getMessageString(localeContext,"edit"): getMessageString(localeContext,"createProduct")}
                        onClick={onClickProductButton}
                        disabled={!name}/>
            </div>

        </div>
    )
}
