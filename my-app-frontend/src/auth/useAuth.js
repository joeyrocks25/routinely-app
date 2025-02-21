import { useContext } from 'react';
import { AuthContext } from './context';
import { getToken, setToken, removeToken } from './storage';

const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);

    const loginUser = async (email, password) => {
        const response = await login(email, password);
        setToken(response.data.token); // Store the token using storage utility
        return response; // Return the response to handle in the component if needed
    };

    const logoutUser = () => {
        logout();
        removeToken(); // Remove the token using storage utility
    };

    return { user, loginUser, logoutUser };
};

export default useAuth;
