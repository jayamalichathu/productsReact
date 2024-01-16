import reducer, {addProduct, editProduct, deleteProduct, getInitialProducts} from '../productSlice';

const  initialState = {
    allProductList: getInitialProducts()
}
test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        initialState
    )
});

test('new product should be added to the list when called  addProduct', () => {
    const newProduct = {
        description: "Ans",
        canBeExpired : true,
        expiredDate: "2024-10-10",
        name: "Product Test",
        category: "vegetable",
        isSpecial: true,
        price: "200$",
    }

    expect(reducer(initialState, addProduct(newProduct))).toEqual(
        { allProductList: initialState.allProductList.concat(newProduct)}
    )
});

test('product should be deleted from the list when called deleteProduct', () => {
    const deletedProduct = {
        description: "Ans",
        canBeExpired : true,
        expiredDate: "2024-10-10",
        name: "Product 1",
        category: "vegetable",
        isSpecial: true,
        price: "200$",
    }

    expect(reducer(initialState, deleteProduct(deletedProduct))).toEqual(
        { allProductList: initialState.allProductList.filter(product => product.name !== deletedProduct.name)}
    )
});

test('product should be edited from the list when called editProduct', () => {
    const editedProduct = {
        description: "This is a new product",
        canBeExpired : true,
        expiredDate: "2024-10-10",
        name: "Product 1",
        category: "vegetable",
        isSpecial: true,
        price: "200$",
    }

    expect(reducer(initialState, editProduct(editedProduct))).toEqual(
        { allProductList: initialState.allProductList
                .map(product => product.name === editedProduct.name ? {...editedProduct} : product)}
    )
});