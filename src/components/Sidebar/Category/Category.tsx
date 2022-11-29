import "./Category.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    fetchCategories,
    filterProducts,
} from "../../../store/features/productSlice";
import { useState } from "react";

export default function Category() {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.product);

    const [subcategories, setSubCategories] = useState<Number[]>([]);
    const handleCategory = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        let categories = [...subcategories];
        if (e.target.checked) categories.push(id);
        else categories = categories.filter((value) => value !== id);

        setSubCategories(categories);
        dispatch(filterProducts({ subcategories: categories }));
    };
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <div className="category">
            <h2>Categories</h2>
            {categories.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    {category.childCategories &&
                        category.childCategories.map((cat) => (
                            <label key={cat.id}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCategory(e, cat.id)}
                                    checked={subcategories.includes(cat.id)}
                                />
                                {cat?.name}
                            </label>
                        ))}
                </div>
            ))}
        </div>
    );
}
