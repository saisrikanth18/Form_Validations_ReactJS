import React, { useEffect, useState } from "react";
import {
    Navigate,
    useNavigate,
} from "react-router-dom";
import './signinup.css';

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (email && password) {
            setIsLoggedIn(true);
        }
    }, []);

    if (isLoggedIn) {
        navigate("/home");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [formType, setFormType] = useState("login");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === "login") {
            // Send the user's credentials to the server for authentication
            // If the authentication is successful, the server will return a token
            // Store the token in local storage
            localStorage.setItem("token", "abc123");
            setIsLoggedIn(true);
        } else {
            // Save the user's credentials to the local storage
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            // Navigate to the login page
            setFormType("login");
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{formType === "login" ? "Login" : "Sign Up"}</h2>
            <div className="form-group">
                <label>
                    Email:
                    <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={formType === "signup"}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Password:
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
            </div>
            {formType === "signup" && (
                <>
                    <div className="form-group">
                        <label>
                            Confirm Password:
                            <input
                                className="form-control"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Mobile Number:
                            <input
                                className="form-control"
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Birthday:
                            <input
                                className="form-control"
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </>
            )}
            <div className="form-group">
                <button className="btn btn-primary" type="submit">
                    {formType === "login" ? "Login" : "Sign Up"}
                </button>
                {formType === "login" && (
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => setFormType("signup")}
                    >
                        Sign Up
                    </button>
                )}
            </div>
        </form>
    );
}
export { Auth };

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the user's credentials from the local storage
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        // Navigate back to the login page
        navigate("/login");
    }

    return (
        <>
            <div>
                Hello
            </div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    )
};
export { Home };

const Change = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (email && password) {
            setIsLoggedIn(true);
        }
    }, []); // Empty dependency array is important here, to run this effect only once

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        setIsLoggedIn(false);
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    } else {
        return (
            <>
                <Navigate to="/home" />
                <button onClick={handleLogout}>Logout</button>
            </>
        )
    }
}
export { Change };
