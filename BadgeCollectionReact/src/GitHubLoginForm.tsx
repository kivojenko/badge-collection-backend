import { useEffect, useState } from "react";

interface User {
    username: string,
    email: string
}

function GitHubLoginForm() {
    const [userInfo, setUserInfo] = useState<User|undefined>(undefined);

    // This function will handle the OAuth login flow.
    const handleGitHubLogin = () => {
        // Redirect to your Spring Boot backend to initiate the OAuth2 login
        window.location.href = "http://localhost:8080/login/oauth2/github";
    };

    useEffect(() => {
        // Check if the URL contains the user's data after redirect
        const queryParams = new URLSearchParams(window.location.search);
        const username = queryParams.get("username");
        const email = queryParams.get("email");

        if (username && email) {
            setUserInfo({ username, email });
        }
    }, []);

    const displayUserInfo = () => {
        if (userInfo) {
            return (
                <div>
                    <h2>Welcome, {userInfo.username}!</h2>
                    <p>Email: {userInfo.email}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={handleGitHubLogin}>
                        Log in with GitHub
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="login-container">
            <h1>GitHub OAuth Login</h1>
            {displayUserInfo()}
        </div>
    );
}

export default GitHubLoginForm;
