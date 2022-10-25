import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "../styles/customToastContainer.css";

export function CustomToastContainer() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}