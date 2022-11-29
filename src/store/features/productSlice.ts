import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Category from "../../components/Sidebar/Category/Category";

export interface Product {
    id: number;
    name: string;
    img: string;
    price: number;
    categoryid: number;
    rating: number;
    description: string;
}

interface Category {
    id: number;
    name: string;
    childCategories?: Category[];
}

interface ProductsState {
    products: Product[];
    categories: Category[];
    selectedCategory: number;
    selectedSubCategories: number[];
    filteredProducts: number[];
    search: string;
    minPrice: number;
    maxPrice: number;
}

const initialState: ProductsState = {
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: -1,
    selectedSubCategories: [],
    search: "",
    minPrice: 0,
    maxPrice: 150,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        filterProducts: (state, action) => {
            if ("category" in action.payload)
                state.selectedCategory = action.payload.category;
            else if ("subcategories" in action.payload)
                state.selectedSubCategories = action.payload.subcategories;
            else if ("search" in action.payload)
                state.search = action.payload.search;

            if ("minPrice" in action.payload)
                state.minPrice = action.payload.minPrice;
            if ("maxPrice" in action.payload)
                state.maxPrice = action.payload.maxPrice;

            if (state.selectedCategory === -1)
                state.filteredProducts = state.products
                    .filter(
                        (product) =>
                            (state.selectedSubCategories.length === 0 ||
                                state.selectedSubCategories.includes(
                                    product.categoryid
                                )) &&
                            (state.search === "" ||
                                product.name
                                    .toLowerCase()
                                    .includes(state.search.toLowerCase()) ||
                                product.description
                                    .toLowerCase()
                                    .includes(state.search.toLowerCase()))
                    )
                    .map((product) => product.id);
            else
                state.filteredProducts = state.products
                    .filter((product) => {
                        const parentCat = state.categories.find(
                            (category) =>
                                category.childCategories &&
                                category.childCategories.find(
                                    (child) => child.id === product.categoryid
                                )
                        )?.id;

                        return (
                            state.selectedCategory === parentCat &&
                            (state.selectedSubCategories.length === 0 ||
                                state.selectedSubCategories.includes(
                                    product.categoryid
                                )) &&
                            (state.search === "" ||
                                product.name
                                    .toLowerCase()
                                    .includes(state.search.toLowerCase()) ||
                                product.description
                                    .toLowerCase()
                                    .includes(state.search.toLowerCase()))
                        );
                    })
                    .map((product) => product.id);

            state.filteredProducts = state.filteredProducts.filter((id) => {
                const product = state.products.find(
                    (product) => product.id === id
                );
                return (
                    product &&
                    product.price >= state.minPrice &&
                    product.price <= state.maxPrice
                );
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload.map(
                (product: Product) => product.id
            );
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export default productSlice.reducer;
export const { filterProducts } = productSlice.actions;

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
        return fetch("http://localhost:5000/product/api/getproducts")
            .then((res) => res.json())
            .then(({ data }) =>
                data.map(
                    ({
                        id,
                        price,
                        name,
                        img,
                        rating,
                        categoryid,
                        description,
                    }: Product) => ({
                        id,
                        name,
                        img: "http://localhost:5000/" + img,
                        price,
                        rating,
                        categoryid,
                        description,
                    })
                )
            );
    }
);

export const fetchCategories = createAsyncThunk(
    "product/fetchCategories",
    () => {
        return fetch("http://localhost:5000/product/api/getcategories")
            .then((res) => res.json())
            .then(({ data }) => {
                const categories: Category[] = [];

                const fetchedCategories = data;

                fetchedCategories.forEach(
                    ({
                        id,
                        name,
                        parentcategoryid,
                    }: {
                        id: number;
                        name: string;
                        parentcategoryid: number | null;
                    }) => {
                        if (parentcategoryid === null) {
                            categories.push({ id, name, childCategories: [] });
                        }
                    }
                );
                fetchedCategories.forEach(
                    ({
                        id,
                        name,
                        parentcategoryid,
                    }: {
                        id: number;
                        name: string;
                        parentcategoryid: number | null;
                    }) => {
                        if (parentcategoryid !== null) {
                            const parentCategory = categories.find(
                                (cat: Category) => cat.id === parentcategoryid
                            );

                            parentCategory?.childCategories?.push({ id, name });
                        }
                    }
                );
                return categories;
            });
    }
);
