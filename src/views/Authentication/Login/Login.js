import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn, Spinner } from '../../../components/UI';
import { english, spanish } from '../../../languages';
import '../Auth.scss';
import { Eye, Hide } from '../../../assets/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const language = useSelector((state) => state.settings.language);
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.authentication });
    } else if (language === 'spanish') {
      setContent({ ...spanish.authentication });
    }
  }, [language]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className='authForm' onSubmit={handleSubmit}>
      <div className='authForm__input'>
        <label htmlFor='email'>{content.email}</label>
        <input
          id='email'
          autoComplete='off'
          type='email'
          required
          placeholder='Email'
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className='authForm__input'>
        <label htmlFor='password'>{content.password}</label>
        <input
          type={isHidePassword ? 'password' : 'text'}
          id='password'
          autoComplete='off'
          required
          placeholder={content.password}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {isHidePassword ? (
          <Hide
            className='authForm__input--icon'
            onClick={() => setIsHidePassword(false)}
          />
        ) : (
          <Eye
            className='authForm__input--icon'
            onClick={() => setIsHidePassword(true)}
          />
        )}
      </div>
      <div className='authForm__btn'>
        <Btn text={content.login} symbol='✓' />
      </div>

      {isLoading && <Spinner />}
    </form>
  );
};

export default Login;
