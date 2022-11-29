import "./MainContainer.scss";
import { useEffect } from "react";
import { fetchProducts, Product } from "../../store/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addToCart } from "../../store/features/cartSlice";
import { Link } from "react-router-dom";

export default function MainContainer() {
    const dispatch = useAppDispatch();
    const { products, filteredProducts } = useAppSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const addProductToCart = (product: Product) => {
        dispatch(
            addToCart({
                name: product?.name,
                id: product?.id,
                price: product?.price,
                amount: 1,
                img: product?.img,
            })
        );
    };

    if (filteredProducts.length === 0)
        return <h2 className="no-results text-sm m-5">No Results</h2>;

    return (
        <div className="col-9">
            <div className="card-container d-flex flex-wrap">
                {products
                    .filter((product) => filteredProducts.includes(product.id))
                    .map((product) => (
                        <div
                            className="card text-center border-0 shadow-lg rounded"
                            key={product.id}
                        >
                            <div className="card-body">
                                <div className="img-container">
                                    <div className="links">
                                        <a
                                            href={product.img}
                                            className="link img-link"
                                            onClick={() =>
                                                addProductToCart(product)
                                            }
                                        >
                                            <i className="fa fa-arrows-alt" />
                                        </a>
                                        <span
                                            className="link add-to-cart"
                                            onClick={() =>
                                                addProductToCart(product)
                                            }
                                        >
                                            <i className="fa fa-shopping-cart" />
                                        </span>
                                    </div>
                                    <img
                                        src={product.img}
                                        className="card-img-top rounded"
                                    />
                                </div>
                                <Link
                                    to={`product/${product.id}`}
                                    key={product.id}
                                >
                                    {product.name}
                                </Link>
                                <div>
                                    {[...new Array(product.rating)].map(
                                        (_, i) => (
                                            <i
                                                key={i}
                                                className="fa fa-star"
                                            ></i>
                                        )
                                    )}
                                </div>
                                <p>$ {product.price}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
