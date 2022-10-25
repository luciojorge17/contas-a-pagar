import "../styles/noTransactions.css";

import HappyImage from "../images/happy.svg";

export function NoTransactions() {
    return (
        <div className="no-transactions">
            <img src={HappyImage} alt="Pessoas felizes" />
            <span>Não há contas a pagar neste mês!</span>
        </div>
    )
}