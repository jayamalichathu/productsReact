import React, {useCallback, useContext} from 'react';
import {ALL, CATEGORIES} from "../selectors/ProductSelector";
import {CategoryList} from "./CategoryList";
import {getMessageString} from "../selectors/LocaleMessageSelector";
import {LanguageContext} from "../locale/LanguageContext";

export function CategoryFilterer({onSelectCategory}) {
    const categories = [ALL].concat(CATEGORIES.map(category => category));
    const handleOnSelectCategory = useCallback((category) => {
      onSelectCategory(category);
    }, [onSelectCategory]);

    return (
        <div className="CategoryFilterer">
            <label>{getMessageString(useContext(LanguageContext),"categories")} </label>
            <CategoryList items={categories} onChangeItem={handleOnSelectCategory}/>
        </div>
    )
}
