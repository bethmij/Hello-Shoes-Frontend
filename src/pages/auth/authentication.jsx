
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const isAuthenticated = async () => {
    // localStorage.removeItem('accessToken');
    const token = localStorage.getItem('accessToken');
    if (!token || isTokenExpired(token)) {
        await performAuthenticatedRequest();
    }

    return !!localStorage.getItem('accessToken');
}

export const isAdmin = () => {
    const role = localStorage.getItem('role')
    return role === "ADMIN"
}

function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}
async function performAuthenticatedRequest() {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const data = { email, password };
    if (!token || isTokenExpired(token)) {
        try {
            const response = await axios.post(
                "http://localhost:8080/app/user/signin",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.token);
                console.log(
                    "User Re-Authenticated Successfully " + response.data.token
                );
            }
        } catch (error) {
            console.log("Error during re-authentication",error)
        }
    }
}
