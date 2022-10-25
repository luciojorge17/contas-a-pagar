import { formatMoney } from "../utils";

import "../styles/summary.css";

export function Summary({ transactions }) {
    return (
        <div className="summary">
            <div>
                <span>A pagar</span>
                <b>{formatMoney(transactions.filter(t => !t.paid).reduce((total, t) => total += t.amount, 0))}</b>
            </div>
            <div>
                <span>Pago</span>
                <b>{formatMoney(transactions.filter(t => t.paid).reduce((total, t) => total += t.amount, 0))}</b>
            </div>
            <div>
                <span>Total</span>
                <b>{formatMoney(transactions.reduce((total, t) => total += t.amount, 0))}</b>
            </div>
        </div>
    )
}