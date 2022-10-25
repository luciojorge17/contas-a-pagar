import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { getHeaderTitle } from "../utils";

import "../styles/changeMonth.css";

export function ChangeMonth({ selectedMonth, functionToChange }) {
    return (
        <header className="change-month">
            <button onClick={() => functionToChange(-1)}>
                <IoArrowBack />
            </button>
            <span>
                {getHeaderTitle(selectedMonth)}
            </span>
            <button onClick={() => functionToChange(1)}>
                <IoArrowForward />
            </button>
        </header>
    )
}