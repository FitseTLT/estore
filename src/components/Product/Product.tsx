import "./Product.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState, useRef } from "react";
import { Product as ProductInterface } from "../../store/features/productSlice";
import { addToCart } from "../../store/features/cartSlice";

export default function Product() {
    const { id } = useParams();
    const { products } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (id !== undefined)
            setProduct(products.find((product) => product.id === +id) || null);
    }, []);

    const addProductToCart = () => {
        if (amountRef.current)
            dispatch(
                addToCart({
                    name: product?.name,
                    id: product?.id,
                    price: product?.price,
                    amount: +amountRef.current.value,
                    img: product?.img,
                })
            );
    };

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="product-img-container">
                    <img src={product?.img} alt={product?.name} />
                </div>
                <div className="product-detail">
                    <h1 className="product-name">{product?.name}</h1>
                    <div>
                        {[...new Array(product?.rating)].map((_, i) => (
                            <i key={i} className="fa fa-star"></i>
                        ))}
                    </div>
                    <p className="price">$ {product?.price}</p>
                    <p>{product?.description}</p>
                    <div className="add-to-cart">
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            ref={amountRef}
                        />
                        <button onClick={addProductToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
