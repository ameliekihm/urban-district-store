import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const Callback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    const fetchTokenAndProfile = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (!code) return;

      try {
        const res = await axios.post(
          `${window.env.REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: window.env.REACT_APP_COGNITO_CLIENT_ID,
            code,
            redirect_uri: window.env.REACT_APP_COGNITO_SIGNIN_REDIRECT_URI,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const { id_token, access_token } = res.data;

        localStorage.setItem('id_token', id_token);
        localStorage.setItem('access_token', access_token);

        const userData = parseJwt(id_token);

        setUser({
          ...userData,
          name: userData.name,
          picture: userData.picture,
          email: userData.email,
          groups: userData['cognito:groups'] || [],
          isAdmin: (userData['cognito:groups'] || []).includes('Admins'),
        });

        navigate('/');
      } catch (error) {
        console.error('Token or profile fetch failed:', error);
      }
    };

    fetchTokenAndProfile();
  }, [navigate, setUser]);

  return <p>Logging in...</p>;
};

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch {
    return null;
  }
}

export default Callback;
