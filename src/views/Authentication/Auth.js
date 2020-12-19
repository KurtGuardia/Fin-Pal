import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './Auth.scss';
import { english, spanish } from '../../languages';

const Auth = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.authentication });
    } else if (language === 'spanish') {
      setContent({ ...spanish.authentication });
    }
  }, [language]);

  return (
    <div className={isDarkMode ? 'auth content dark' : 'auth content'}>
      <div className='auth__container'>
        <div className='auth__container--switch'>
          <button
            className={login ? 'auth-btn left active' : 'auth-btn left'}
            onClick={() => {
              setSignup(false);
              setLogin(true);
            }}
          >
            {content.login}
          </button>

          <button
            className={signup ? 'auth-btn right active' : 'auth-btn right'}
            onClick={() => {
              setSignup(true);
              setLogin(false);
            }}
          >
            {content.signup}
          </button>
        </div>
        {login && <Login />}
        {signup && <SignUp />}
      </div>
    </div>
  );
};

export default Auth;
