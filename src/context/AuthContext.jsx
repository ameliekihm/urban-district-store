import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      const userData = parseJwt(idToken);
      checkAdmin(userData);
    }
  }, []);

  const checkAdmin = async (userData) => {
    try {
      const snapshot = await get(ref(db, 'admins'));
      const admins = snapshot.exists() ? snapshot.val() : {};
      const isAdmin = Object.values(admins).includes(userData.email);
      setUser({ ...userData, isAdmin });
    } catch {
      setUser(userData);
    }
  };

  const login = () => {
    const domain = process.env.REACT_APP_COGNITO_DOMAIN;
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_COGNITO_SIGNIN_REDIRECT_URI;
    const responseType = 'code';
    const scope = encodeURIComponent('openid email profile');
    const loginUrl = `${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&identity_provider=Google&prompt=select_account`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    const domain = process.env.REACT_APP_COGNITO_DOMAIN;
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;

    const logoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      process.env.REACT_APP_COGNITO_SIGNOUT_REDIRECT_URI
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
    return JSON.parse(window.atob(base64));
  } catch {
    return null;
  }
}
