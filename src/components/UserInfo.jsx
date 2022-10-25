import { useAuth } from "../hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

import "../styles/userInfo.css";

export function UserInfo() {
    const { user, signOutGoogle } = useAuth();

    return (
        <div className="user-info">
            <div>
                <img src={user?.avatar} alt={user.name} />
                <b>{user?.name}</b>
            </div>
            <button onClick={signOutGoogle}>
                <IoLogOutOutline />
            </button>
        </div>
    )
}