import "./App.css";
import MainContainer from "./components/MainContainer/MainContainer";
import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";

function App() {
    return (
        <div className="container-fluid">
            <Navigation />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="row m-0">
                            <Sidebar />
                            <MainContainer />
                        </div>
                    }
                />
                <Route path="product/:id" element={<Product />} />
                <Route path="cart" element={<Cart />} />
            </Routes>
        </div>
    );
}

export default App;
