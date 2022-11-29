import "./Filter.scss";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { filterProducts } from "../../../store/features/productSlice";

export default function Filter() {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(150);
    const dispatch = useAppDispatch();

    const applyFilter = () => {
        dispatch(filterProducts({ minPrice: min, maxPrice: max }));
    };
    const clearFilter = () => {
        dispatch(filterProducts({ minPrice: 0, maxPrice: 150 }));
    };

    return (
        <div className="filter">
            <h2>Shop by Price</h2>
            <h6>
                Price $<span>{min}</span> - $<span>{max}</span>
            </h6>
            <div className="min-max">
                <label>
                    Min:
                    <input
                        min={0}
                        max={150}
                        value={min}
                        type="range"
                        onChange={(e) => setMin(+e.target.value)}
                    />
                </label>
                <label>
                    Max:
                    <input
                        min={min}
                        max={150}
                        value={max}
                        type="range"
                        onChange={(e) => setMax(+e.target.value)}
                    />
                </label>
            </div>
            <div className="filter-buttons w-50">
                <button onClick={applyFilter}>Apply Filter</button>
                <button onClick={clearFilter}>Clear Filter</button>
            </div>
        </div>
    );
}
