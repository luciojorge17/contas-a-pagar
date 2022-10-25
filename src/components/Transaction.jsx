import { database } from "../services/firebase";
import { ref, remove, update } from "firebase/database";
import { formatMoney } from "../utils";
import { IoTrash } from "react-icons/io5";

import "../styles/transaction.css";

export function Transaction({ transaction }) {

    async function handleUpdateTransaction(e, transactionId) {
        const paid = e.target.checked;
        update(ref(database, `/transactions/${transactionId}`), {
            paid
        });
    }

    async function handleDeleteTransaction(transactionId) {
        if (window.confirm("Deseja mesmo excluir a despesa?")) {
            remove(ref(database, `/transactions/${transactionId}`));
        }
    }

    return (
        <div className={`transaction${transaction.paid ? " paid" : ""}`}>
            <div>
                <input
                    type="checkbox"
                    id={`trn-${transaction.id}`}
                    onChange={e => handleUpdateTransaction(e, transaction.id)}
                    defaultChecked={transaction.paid}
                />
                <label htmlFor={`trn-${transaction.id}`}>
                    {transaction.description}
                </label>
            </div>
            <div>
                <b>{formatMoney(transaction.amount)}</b>
                <button onClick={e => handleDeleteTransaction(transaction.id)}>
                    <span>
                        <IoTrash />
                    </span>
                </button>
            </div>
        </div>
    )

}