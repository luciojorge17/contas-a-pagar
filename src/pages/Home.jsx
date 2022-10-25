import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { equalTo, query, ref, onValue, orderByChild } from "firebase/database";

import { addMonthsInADate, getCurrentMonth, updateSelectedMonth } from "../utils";

import './../styles/home.css';

import { UserInfo } from "../components/UserInfo";
import { NoTransactions } from "../components/NoTransactions";
import { ButtonAddTransaction } from "../components/ButtonAddTransaction";
import { ChangeMonth } from "../components/ChangeMonth";
import { Summary } from "../components/Summary";
import { Loader } from "../components/Loader";
import { TransactionsList } from "../components/TransactionList";
import { CustomToastContainer } from "../components/CustomToastContainer";
import { TransactionForm } from "../components/TransactionForm";

export default function Home() {

    const { user } = useAuth();

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [groups, setGroups] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function getTransactions() {

        setIsLoading(true);

        const filteredTransactions = query(ref(database, "/transactions"), orderByChild("creator_id"), equalTo(user?.id))
        onValue(filteredTransactions, (snapshot) => {
            const data = snapshot.val() || [];
            let transactions = [];
            Object.entries(data).map(([key, transaction]) => {
                if (transaction.due_date.includes(selectedMonth)) {
                    transactions.push({
                        id: key,
                        ...transaction
                    });
                }
                return transaction;
            });

            transactions.sort((a, b) => {
                if (a.due_date < b.due_date) {
                    return -1;
                } else if (a.due_date > b.due_date) {
                    return 1;
                } else {
                    return 0;
                }
            })

            const days = [...new Set(transactions.map(t => t.due_date))];

            setGroups(days);
            setTransactions(transactions);
            setIsLoading(false);
        });
    }

    async function handleChangeSelectedMonth(number) {
        const calculatedMonth = updateSelectedMonth(selectedMonth, number);
        setSelectedMonth(calculatedMonth);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        getTransactions();
    }, [selectedMonth])

    return (
        <>
            <CustomToastContainer />
            <div className="home">
                {!isFormOpen &&
                    <ButtonAddTransaction onClick={e => setIsFormOpen(true)} />
                }

                <UserInfo />

                <ChangeMonth selectedMonth={selectedMonth} functionToChange={handleChangeSelectedMonth} />

                {
                    isLoading ?
                        <Loader />
                        :
                        transactions.length > 0 ?
                            <>
                                <Summary transactions={transactions} />
                                <TransactionsList
                                    groups={groups}
                                    transactions={transactions}
                                />
                            </>
                            :
                            <NoTransactions />
                }

            </div>
            {isFormOpen &&
                <TransactionForm closeForm={() => setIsFormOpen(false)} />
            }
        </>
    )
}