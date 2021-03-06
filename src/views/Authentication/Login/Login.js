import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn, Spinner } from '../../../components/UI';
import { english, spanish } from '../../../languages';
import '../Auth.scss';
import { Eye, Hide } from '../../../assets/icons';
import { login, demoLogin } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const language = useSelector((state) => state.settings.language);
  const authError = useSelector((state) => state.auth.authError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  if (auth.uid) history.push('/');

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.authentication });
    } else if (language === 'spanish') {
      setContent({ ...spanish.authentication });
    }
  }, [language]);

  const handleDemo = () => {
    setEmail('test@test.com');
    setPassword('123456');
    dispatch(demoLogin());
    if (auth.uid) {
      setIsLoading(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    if (auth.uid) {
      setIsLoading(true);
    }
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className='authForm__input last'>
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
        <Btn text='Demo' symbol={<Eye />} clicked={handleDemo} />
      </div>

      {authError && <p className='authForm__err'>{authError}</p>}
      {isLoading && <Spinner />}
    </form>
  );
};

export default Login;
