import { useAuth } from "../hooks/useAuth";
import GoogleLogo from "../images/google-logo.svg";
import Image from "../images/login.svg";

import "../styles/login.css";

export default function Login() {

    const { signInWithGoogle } = useAuth();

    async function handleLogin() {
        await signInWithGoogle();
    }

    return (
        <div className="login">
            <img className="login-background" src={Image} alt="Imagem de boas vindas" />
            <h1>Controle de contas a pagar pessoal</h1>
            <button onClick={handleLogin}>
                <img src={GoogleLogo} alt="Google Logo" />
                Entrar com Google
            </button>
        </div>
    )
}