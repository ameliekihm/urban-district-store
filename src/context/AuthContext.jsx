import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem('id_token');
    const accessToken = localStorage.getItem('access_token');

    if (idToken && accessToken) {
      const userData = parseJwt(idToken);

      if (isTokenExpired(idToken)) {
        handleTokenExpired();
      } else {
        fetchUserInfo(accessToken).then((info) => {
          if (info) {
            const mergedUser = {
              ...userData,
              email: info.email,
              name: info.name,
              picture: info.picture,
            };
            checkAdmin(mergedUser);
          } else {
            checkAdmin(userData);
          }
        });
      }
    } else {
      setUser(null);
    }
  }, []);

  const fetchUserInfo = async (accessToken) => {
    try {
      const domain = window.env.REACT_APP_COGNITO_DOMAIN;
      const res = await fetch(`${domain}/oauth2/userInfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const handleTokenExpired = () => {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    alert('Your session has expired. Please log in again.');
    logout();
  };

  const checkAdmin = (userData) => {
    const groups = userData.groups || [];
    const isAdmin = groups.includes('Admins');
    setUser({ ...userData, isAdmin });
  };

  const login = () => {
    const domain = window.env.REACT_APP_COGNITO_DOMAIN;
    const clientId = window.env.REACT_APP_COGNITO_CLIENT_ID;
    const redirectUri = window.env.REACT_APP_COGNITO_SIGNIN_REDIRECT_URI;
    const responseType = 'code';
    const scope = encodeURIComponent('openid email profile');
    const loginUrl = `${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&identity_provider=Google&prompt=select_account`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    const domain = window.env.REACT_APP_COGNITO_DOMAIN;
    const clientId = window.env.REACT_APP_COGNITO_CLIENT_ID;
    const logoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      window.env.REACT_APP_COGNITO_SIGNOUT_REDIRECT_URI
    )}`;

    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    setUser(null);
    window.location.href = logoutUrl;
  };

  return (
    <AuthContext.Provider
      value={{ user, uid: user?.sub, setUser, login, logout }}
    >
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
    const payload = JSON.parse(window.atob(base64));
    return {
      ...payload,
      name: payload.name,
      picture: payload.picture,
      email: payload.email,
      groups: payload['cognito:groups'] || [],

    };
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
