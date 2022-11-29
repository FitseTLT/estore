import Category from "./Category/Category";
import Filter from "./Filter/Filter";
import "./Sidebar.scss";

export default function Sidebar() {
    return (
        <div className="col-3 sidebar">
            <Category />
            <Filter />
        </div>
    );
}
