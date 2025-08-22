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
          'https://us-east-16o6di1fuy.auth.us-east-1.amazoncognito.com/oauth2/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: '108fhmcck04sg5bnmq16a4t88o',
            code,
            redirect_uri: 'http://localhost:3000/',
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
