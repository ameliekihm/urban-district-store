import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      const userData = parseJwt(idToken);
      setUser(userData);
    }
  }, []);

  const login = () => {
    const domain =
      'https://us-east-16o6di1fuy.auth.us-east-1.amazoncognito.com';
    const clientId = '108fhmcck04sg5bnmq16a4t88o';
    const redirectUri = 'http://localhost:3000/';
    const responseType = 'code';

    const loginUrl = `${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    const logoutUrl = `https://us-east-16o6di1fuy.auth.us-east-1.amazoncognito.com/logout?client_id=108fhmcck04sg5bnmq16a4t88o&logout_uri=http://localhost:3000/`;
    window.location.href = logoutUrl;
  };

  return (
    <AuthContext.Provider value={{ user, uid: user?.sub, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}
