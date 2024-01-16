
export const EMPTY_ARRAY = [];
export const CATEGORIES = [
    "vegetable", "meat", "furniture"
];

export const ALL = "All";

export const PRODUCT_ATTRIBUTES = [
    {key: "name", label: "Name"},
    {key: "category", label: "Category"},
    {key: "description", label: "Description"},
    {key: "price", label: "Price"},
    {key: "canBeExpired", label: "Can Be Expired"},
    {key: "expiredDate", label: "Expiry Date"},
    {key: "isSpecial", label: "Is Special"},
  ];

export function selectProducts(state, category) {
    const allProducts = state.products.allProductList;
    return  allProducts?
        ALL === category ?allProducts : allProducts.filter((product) => product.category === category)
        : EMPTY_ARRAY;
}
