import { TransactionsGroup } from "./TransactionsGroup";

import "../styles/transactionsList.css";

export function TransactionsList({ groups, transactions }) {
    return (
        <div className="transactions-list">
            {groups.map(group => (
                <TransactionsGroup
                    key={group}
                    group={group}
                    transactions={transactions.filter(t => t.due_date.includes(group))}
                />
            ))}
        </div>
    )
}