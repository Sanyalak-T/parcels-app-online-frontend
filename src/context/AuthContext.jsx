import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //store user information
    const [loading, setLoading] = useState(true); //track loading state
    const navigate = useNavigate();

    // fetch the user's profile on app load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/auth/profile");
                setUser(response.data.user); //restore user state
            } catch (err) {
                console.error("Not authenticated", err);
                setUser(null); //clear user state if not authenticated
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const login = (userData) => {
        setUser(userData); //save user info in the context
        navigate("/home"); //redirect to notes page after login
    }

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/"); //redireact to login page
        } catch(err) {
            console.error("Login failed.", err)
        }
    }

    if (loading) {
        return <div>Loading...</div> //show loading indicator while restoring session
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);