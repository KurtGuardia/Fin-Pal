import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn, Spinner } from '../../../components/UI';
import { english, spanish } from '../../../languages';
import '../Auth.scss';
import { Eye, Hide } from '../../../assets/icons';
import { re } from '../../../shared/utility';
import { signup } from '../../../store/actions/authActions';

const SignUp = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const language = useSelector((state) => state.settings.language);
  const authError = useSelector((state) => state.auth.authError);
  const dispatch = useDispatch();
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    pin: '',
  });

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.authentication });
    } else if (language === 'spanish') {
      setContent({ ...spanish.authentication });
    }
  }, [language]);

  useEffect(() => {
    setIsLoading(false);
  }, [authError]);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(signup(user));

    if (!auth.uid) {
      setIsLoading(true);
    }

    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      pin: '',
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const checkValidation = useCallback(() => {
    const { firstName, lastName, email, password, password2, pin } = user;
    if (
      firstName.length >= 3 &&
      lastName.length >= 3 &&
      email &&
      password.length >= 6 &&
      password === password2 &&
      pin.length >= 4
    ) {
      setErrorMsg(null);
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [user]);

  useEffect(() => {
    checkValidation();
  }, [checkValidation]);

  return (
    <form
      className='authForm'
      onSubmit={handlesubmit}
      autoComplete='off'
      onKeyPress={(e) => {
        if (e.which === 13) {
          e.preventDefault();
        }
      }}
    >
      <div className='authForm__input'>
        <label>{content.name}</label>
        <input
          type='text'
          placeholder={content?.name}
          id='firstName'
          name='firstName'
          autoComplete='off'
          className={user.firstName.length !== 3 ? 'error' : ''}
          onChange={(e) => {
            checkValidation();
            handleChange(e);
            if (e.target.value.length < 3) {
              setErrorMsg(content?.errorMsg?.firstName);
            } else {
              setErrorMsg(null);
            }
          }}
          value={user.firstName}
          required
        />
      </div>
      <div className='authForm__input'>
        <label>{content.lastName}</label>
        <input
          type='text'
          name='lastName'
          autoComplete='off'
          id='lastName'
          required
          placeholder={content.lastName}
          className={user.lastName.length !== 3 ? 'error' : ''}
          onChange={(e) => {
            checkValidation();
            handleChange(e);
            if (e.target.value.length < 3) {
              setErrorMsg(content?.errorMsg?.lastName);
            } else {
              setErrorMsg(null);
            }
          }}
          value={user.lastName}
        />
      </div>
      <div className='authForm__input'>
        <label>{content.email}</label>
        <input
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          required
          className={!re.test(user.email) ? 'error' : ''}
          onChange={(e) => {
            checkValidation();
            handleChange(e);
            if (!re.test(e.target.value.trim())) {
              setErrorMsg(content?.errorMsg?.email);
            } else {
              setErrorMsg(null);
            }
          }}
          value={user.email}
          placeholder={content.email}
        />
      </div>
      <div className='authForm__input'>
        <label>{content.password}</label>
        <input
          type={isHidePassword ? 'password' : 'text'}
          autoComplete='off'
          name='password'
          id='password'
          required
          placeholder={content.password}
          className={user.password.length < 6 ? 'error' : ''}
          onChange={(e) => {
            checkValidation();
            handleChange(e);
            if (e.target.value.length < 6) {
              setErrorMsg(content?.errorMsg.password);
            } else {
              setErrorMsg(null);
            }
          }}
          value={user.password}
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
      <div className='authForm__input'>
        <label>{content.repeatPassword}</label>
        <input
          type={isHidePassword ? 'password' : 'text'}
          autoComplete='off'
          required
          name='password2'
          id='password2'
          placeholder={content.repeatPassword}
          className={user.password2 !== user.password ? 'error' : ''}
          onChange={(e) => {
            checkValidation();
            handleChange(e);
            if (e.target.value !== user.password) {
              setErrorMsg(content?.errorMsg.password2);
            } else {
              setErrorMsg(null);
            }
          }}
          value={user.pasword2}
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
      <div className='authForm__input'>
        <label>{content.pin}</label>
        <input
          type='number'
          name='pin'
          id='pin'
          autoComplete='off'
          required
          className={user.pin.length !== 4 ? 'error' : ''}
          onChange={(e) => {
            checkValidation();
            handleChange(e);
            if (e.target.value.length < 4) {
              setErrorMsg(content?.errorMsg.pin);
            } else {
              setErrorMsg(null);
            }
          }}
          placeholder={content.pin}
          value={user.pin}
        />
      </div>
      <div className='authForm__btn'>
        <Btn text={content.signup} symbol='✓' disabled={!isFormValid} />
      </div>

      {isLoading && <Spinner />}
      {errorMsg && <p className='authForm__err'>{errorMsg}</p>}
      {authError && <p className='authForm__err'>{authError}</p>}
    </form>
  );
};

export default SignUp;
