import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Router() {


    const { user } = useAuth();

    return (
        user?.id ? <Home /> : <Login />
    )
}