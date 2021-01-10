import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../assets/images';
import './User.scss';
import { Btn } from '../../components/UI';
import { logout } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import { english, spanish } from '../../languages';

const User = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const profile = useSelector((state) => state.firebase.profile);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const { firstName, lastName, email, password } = profile;
  const dispatch = useDispatch();
  const history = useHistory();

  if (!auth.uid) history.push('/auth');

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.user });
    } else if (language === 'spanish') {
      setContent({ ...spanish.user });
    }
  }, [language]);

  return (
    <div className='user'>
      <div className={isDarkMode ? 'user-container dark' : 'user-container'}>
        <div className='user-container__keys'>
          <p>{content.firstName}:</p>
          <p>{content.lastName}:</p>
          <p>Email:</p>
          <p>{content.password}:</p>
          <p>Pin:</p>
        </div>
        <div className='user-container__values'>
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{email}</p>
          <p className='password'>{'*'.repeat(password?.length)}</p>
          <p># # # #</p>
        </div>
        <div className='user-container__icon'>
          <Profile />
        </div>
        <div className='logOutBtn'>
          <Btn
            text={content.logOut}
            symbol='✓'
            clicked={() => dispatch(logout())}
          />
        </div>
      </div>
      <p>{content.contact}: kurtguardia@gmail.com</p>
      <small>{content.copyright}</small>
    </div>
  );
};

export default User;
