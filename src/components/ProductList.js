import React, {useCallback, useContext, useEffect, useState} from 'react';

import { useSelector, useDispatch } from 'react-redux'
import {Product} from "./Product";
import {PRODUCT_ATTRIBUTES, selectProducts} from "../selectors/ProductSelector";
import {CategoryFilterer} from "./CategoryFilterer";

import {editProduct, addProduct, deleteProduct} from '../stores/productSlice'
import {ProductWizard} from "./ProductWizard";
import {Button} from "./Button";
import Table from "./Table";
import * as PropTypes from "prop-types";
import {getMessageString} from "../selectors/LocaleMessageSelector";
import {LanguageContext} from "../locale/LanguageContext";

const Products = ({products}) => {
    const tableHeaders = PRODUCT_ATTRIBUTES.map(header => <th key={header.key}>{header.label}</th>)
    return (
        <div className="Products">
            <Table tableHeaders={tableHeaders}
                   tableData={products}
                   />
        </div>

    );
}
const ActionContainer = ({handleOnClickProductShowButton,
                             handleOnClickProductCreateButton,
                             handleOnClickProductEditButtonCallBack,
                             handleOnClickProductDeleteButtonCallBack,
                             editDisabled,
                             deleteDisabled
                         }) => {
    return (
        <div className="ActionContainer">
            <Button onClick={handleOnClickProductShowButton}
                    value={getMessageString(useContext(LanguageContext),"existingProducts")}
            />
            <Button onClick={handleOnClickProductCreateButton}
                    value={getMessageString(useContext(LanguageContext),"newProduct")}
            />
            <Button onClick={handleOnClickProductEditButtonCallBack}
                    value={getMessageString(useContext(LanguageContext),"editProduct")}
                    disabled={editDisabled}
            />
            <Button onClick={handleOnClickProductDeleteButtonCallBack}
                    value={getMessageString(useContext(LanguageContext),"deleteProduct")}
                    disabled={deleteDisabled}
            />
        </div>
    );
}

function ProductsView(props) {
    return (
        <div className="ProductsView">
            <CategoryFilterer selectedCategory ={props.selectedCategory} onSelectCategory={props.filterProducts}/>
            <Products products={props.products}/>
        </div>
    );
}

ProductsView.propTypes = {children: PropTypes.node};

export function ProductList() {
    const [productCreationModeOn, onClickProductCreation] = useState(false);
    const [productEditModeOn, onClickProductEdition] = useState(false);
    const [selectedCategory, onSelectCategory] = useState("All");
    const [selectedProduct, onSelectProduct] = useState(null);

    const products = useSelector((state) => selectProducts(state, selectedCategory));
    const getData = () => {
        return fetch("http://localhost:3000/api/products")
            .then(data => data.json())
    }

    useEffect( () => {
        getData().then(data => console.log(data))
            .catch(error => console.log(error));
    }, [])

    const dispatch = useDispatch();

    const filterProducts = useCallback((category) => {
        onSelectCategory(category);
    }, [onSelectCategory]);

    const handleOnClickProductCreateButton = useCallback(() => {
        onClickProductCreation(true);
    },[onClickProductCreation]);

    const handleOnClickProductEditButtonCallBack = useCallback(() => {
        onClickProductEdition(true);
    }, [onClickProductEdition]);

    const handleOnClickProductDeleteButtonCallBack = useCallback(() => {
        if (window.confirm("Do you want to delete this product")) {
            dispatch(deleteProduct(selectedProduct));
            onSelectProduct(null);
        }
    }, [dispatch, selectedProduct])

    const handleOnNewProductCreationComplete = useCallback((product) => {
        dispatch(addProduct(product));
        onClickProductCreation(false);
    }, [onClickProductCreation, dispatch]);

    const handleProductEditComplete = useCallback((product) => {
        dispatch(editProduct(product));
        onClickProductEdition(false);
    }, [dispatch]);

    const handleOnClickProductShowButton = useCallback(() => {
        onClickProductEdition(false);
        onClickProductCreation(false);
    }, [onClickProductEdition, onClickProductCreation ])

    const onSelectProductCallBack = useCallback((product) => {
        onSelectProduct(product);
    }, [onSelectProduct]);

    const productComponents = products.map(product =>
        <Product
            key={product.name + "product"}
            product={product}
            onSelect={onSelectProductCallBack}
            selectedProduct={selectedProduct}
        />
    );

    return (
        <div className="ProductList">
            <ActionContainer
                handleOnClickProductShowButton={handleOnClickProductShowButton}
                handleOnClickProductCreateButton={handleOnClickProductCreateButton}
                handleOnClickProductEditButtonCallBack={handleOnClickProductEditButtonCallBack}
                handleOnClickProductDeleteButtonCallBack={handleOnClickProductDeleteButtonCallBack}
                editDisabled={!selectedProduct || productCreationModeOn}
                deleteDisabled={!selectedProduct}
                />
            {
                productCreationModeOn
                &&
                <ProductWizard onFinish={handleOnNewProductCreationComplete} />
            }
            {
                !productCreationModeOn
                &&
                productEditModeOn
                &&
                <ProductWizard onFinish={handleProductEditComplete} product={selectedProduct}/>

            }
            {
                !productCreationModeOn
                &&
                !productEditModeOn
                &&
                <ProductsView
                    selectedCategory={selectedCategory}
                    filterProducts ={filterProducts}
                    products={productComponents}
                />
            }

        </div>
    );
}
