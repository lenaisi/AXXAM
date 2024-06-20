import axios from 'axios';
import cookie from 'js-cookie';
export const logout = () => async dispatch => {
    try {
        await axios.get('http://localhost:5000/api/v1/auth/logout', { withCredentials: true });
        cookie.remove('jwt', { expires: 1 });
        dispatch({ type: LOGOUT });
        console.log('Déconnexion réussie');
        window.location = '/';
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};