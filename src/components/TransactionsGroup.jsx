import { getDayOfWeekDescription, getMonthDescription } from "../utils";
import { Transaction } from "./Transaction";

import "../styles/transactionsGroup.css";

export function TransactionsGroup({ group, transactions }) {
    return (
        <div key={group} className="transactions-group">
            <h3>
                {getDayOfWeekDescription(group)}, {parseInt(group.split("-")[2])} de {getMonthDescription(group.split("-")[1]).toLowerCase()}
            </h3>
            {transactions.map(transaction => (
                <Transaction key={transaction.id} transaction={transaction} />
            ))}
        </div>
    )
}