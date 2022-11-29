import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { filterProducts } from "../../store/features/productSlice";
import "./Navigation.scss";
import { Link } from "react-router-dom";

export default function Navigation() {
    const timeout = useRef<number | null>(null);
    const dispatch = useAppDispatch();
    const searchRef = useRef<HTMLInputElement>(null);
    const {
        product: { categories },
        cart,
    } = useAppSelector((state) => state);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterProducts({ category: +e.target.value }));
    };

    const handleSearch = () => {
        if (searchRef.current)
            dispatch(filterProducts({ search: searchRef.current.value }));
    };

    const handleSearchInput = () => {
        timeout.current = window.setTimeout(() => {
            if (searchRef.current)
                dispatch(filterProducts({ search: searchRef.current.value }));
        }, 1000);
    };

    return (
        <div className="navigation">
            <div className="row py-1">
                <div className="col-lg-2 col-2 px-3 py-2">
                    <a className="navbar-brand header-logo" href="#">
                        eStore
                    </a>
                </div>
                <div className="col-lg-6 col-10">
                    <form
                        className="form-inline d-flex w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <select
                            className="btn btn-success"
                            onChange={handleChange}
                            defaultValue="-1"
                        >
                            <option value="-1">All</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="form-control flex-grow-1 search-input"
                            ref={searchRef}
                            onChange={handleSearchInput}
                        />
                        <button
                            className="btn btn-success my-2"
                            onClick={handleSearch}
                            type="button"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-lg-4 col d-flex align-items-center justify-content-center">
                    <div className="sign-in mx-4">
                        <a href="#">Sign in</a>
                        <a href="#">Sign up</a>
                    </div>
                    <Link to="cart" className="cart">
                        <i className="fa fa-shopping-cart" />
                        <div className="cart-bg">
                            <span className="cart-amount">{cart.length}</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle Navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    Men
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    Women
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    Kids
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
