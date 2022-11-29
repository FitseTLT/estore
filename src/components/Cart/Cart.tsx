import "./Cart.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    addToCart,
    Cart as CartType,
    deleteCart,
} from "../../store/features/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const addProductToCart = (cart: CartType, type: "INC" | "DEC") => {
        dispatch(
            addToCart({
                name: cart?.name,
                id: cart?.id,
                price: cart?.price,
                amount: type === "INC" ? 1 : -1,
                img: cart?.img,
            })
        );
    };

    const deleteItem = (id: number) => {
        dispatch(deleteCart(id));
    };

    return (
        <>
            <div className="row m-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((cart) => {
                            const { price, amount, img, id } = cart;
                            return (
                                <tr key={id}>
                                    <td>
                                        <img
                                            src={img}
                                            alt=""
                                            className="product-img"
                                        />
                                    </td>
                                    <td>{price}</td>
                                    <td>
                                        <div className="amount">
                                            <button
                                                onClick={() =>
                                                    amount > 1 &&
                                                    addProductToCart(
                                                        cart,
                                                        "DEC"
                                                    )
                                                }
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={amount}
                                                readOnly
                                            />
                                            <button
                                                onClick={() =>
                                                    addProductToCart(
                                                        cart,
                                                        "INC"
                                                    )
                                                }
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {(price * amount).toFixed(2)}
                                        <button
                                            className="delete"
                                            onClick={() => deleteItem(id)}
                                        >
                                            <i className="fa fa-close"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="row d-flex align-items-center justify-content-between px-5">
                <Link className="btn-success btn" to="/">
                    Continue Shopping
                </Link>
                <div className="cart-total rounded">
                    <p>Cart Total</p>
                    <div className="total-container">
                        <p>
                            Total: $
                            {cart.reduce(
                                (prev, cart) => prev + cart.amount * cart.price,
                                0
                            )}
                        </p>
                        <button className="btn">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
}
