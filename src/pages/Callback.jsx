import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code');

      if (!code) {
        console.error('Authorization code not found');
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
            code,
            redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
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

        navigate('/');
      } catch (err) {
        console.error('Token request failed:', err);
      }
    };

    fetchToken();
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default Callback;
