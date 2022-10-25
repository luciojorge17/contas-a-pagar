import { useState } from "react";
import { database } from "../services/firebase";
import { ref, set, push } from "firebase/database";
import { useAuth } from "../hooks/useAuth";
import ReactInputMask from "react-input-mask";
import { toast } from 'react-toastify';
import { addMonthsInADate, convertDateToUsaFormat, convertMoneyToFloat, currencyMask, getDatetime } from "../utils";
import { IoClose } from "react-icons/io5";

import "../styles/transactionForm.css";

export function TransactionForm({ closeForm }) {

    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [repeat, setRepeat] = useState(false);
    const [installments, setInstallments] = useState('');

    const [isDisabledButton, setIsDisabledButton] = useState(false);

    const { user } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        const amountConverted = convertMoneyToFloat(amount);

        if (amountConverted <= 0) {
            return alert("Informe o valor da despesa!");
        }

        if (dueDate.length < 10) {
            return alert("Informe uma data dentro do padrão!");
        }

        setIsDisabledButton(true);

        if (repeat) {
            const firstDate = convertDateToUsaFormat(dueDate);

            for (let i = 0; i < installments; i++) {
                const calculatedDueDate = i > 0 ? addMonthsInADate(firstDate, i) : firstDate;

                await set(push(ref(database, `transactions/`)), {
                    creator_id: user?.id,
                    description: `${description} Pr. ${i + 1}/${installments}`,
                    amount: amountConverted,
                    paid: false,
                    due_date: calculatedDueDate,
                    created_at: getDatetime()
                });
            }

        } else {
            await set(push(ref(database, `transactions/`)), {
                creator_id: user?.id,
                description: description,
                amount: amountConverted,
                paid: false,
                due_date: convertDateToUsaFormat(dueDate),
                created_at: getDatetime()
            });
        }

        setDueDate('');
        setDescription('');
        setAmount('');

        setIsDisabledButton(true);

        closeForm();

        if (repeat) {
            toast.success('Despesas adicionadas!');
        } else {
            toast.success('Despesa adicionada!');
        }

    }

    return (
        <>
            <div className="overlay" onClick={closeForm}></div>
            <form className="transaction-form" onSubmit={handleSubmit}>

                <h2>
                    Adicionar despesa
                    <button className="close-button" type="button" onClick={closeForm}>
                        <span>
                            <IoClose />
                        </span>
                    </button>
                </h2>

                <div className="group-checkbox">
                    <input type="checkbox" id="repeat" defaultChecked={repeat} onChange={e => setRepeat(e.target.checked)} />
                    <label htmlFor="repeat">Repetir</label>
                </div>
                {repeat &&
                    <div className="group">
                        <label htmlFor="installments">Por quantos meses?</label>
                        <input type="number" id="installments" value={installments} onChange={e => setInstallments(e.target.value)} inputMode="decimal" required />
                    </div>
                }
                <div className="group">
                    <label htmlFor="due-date">{repeat ? `Primeiro vencimento` : `Data de vencimento`}</label>
                    <ReactInputMask
                        mask="99/99/9999"
                        maskChar={null}
                        id="due-date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)} required autoComplete="off"
                        inputMode="decimal"
                        placeholder="dd/mm/aaaa"
                    >
                    </ReactInputMask>
                </div>
                <div className="group">
                    <label htmlFor="description">Descrição</label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="amount">Valor (R$)</label>
                    <input
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(currencyMask(e.target.value))} inputMode="decimal"
                        required
                        autoComplete="off"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isDisabledButton}
                >
                    {isDisabledButton ? "Aguarde..." : "Salvar"}
                </button>

            </form>
        </>
    )
}