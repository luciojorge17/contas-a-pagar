import { IoAddOutline } from "react-icons/io5";

import "../styles/buttonAddTransaction.css";

export function ButtonAddTransaction({ ...rest }) {
    return (
        <button className="add-transaction" {...rest}>
            <span>
                <IoAddOutline />
            </span>
            Despesa
        </button>
    )
}