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
    const domain = process.env.REACT_APP_COGNITO_DOMAIN;
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_COGNITO_REDIRECT_URI;
    const responseType = 'code';

    const loginUrl = `${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&identity_provider=Google&prompt=select_account`;

    window.location.href = loginUrl;
  };

  const logout = () => {
    const domain = process.env.REACT_APP_COGNITO_DOMAIN;
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;

    const logoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      'http://localhost:3000/'
    )}`;

    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
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
