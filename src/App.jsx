import { useState } from "react";
import { AuthContextProvider } from "./contexts/AuthContext";
import Router from "./router";

function App() {

    const [isGlobalLoaderActive, setIsGlobalLoaderActive] = useState(true);

    setTimeout(() => {
        setIsGlobalLoaderActive(false);
    }, 2500);

    return (
        <AuthContextProvider>
            {isGlobalLoaderActive &&
                <div className="global-loader">
                    <div className="loader"></div>
                </div>
            }
            <Router />
        </AuthContextProvider>
    );
}

export default App;
