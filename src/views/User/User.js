import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../assets/images';
import './User.scss';
import { Btn } from '../../components/UI';
import { logout } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const User = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const profile = useSelector((state) => state.firebase.profile);
  const { firstName, lastName, email, password, pin } = profile;
  const dispatch = useDispatch();
  const history = useHistory();

  //   if (auth.uid) history.push('/');
  if (!auth.uid) history.push('/auth');
  console.log(auth);

  return (
    <div className='user'>
      <div className={isDarkMode ? 'user-container dark' : 'user-container'}>
        <div className='user-container__keys'>
          <p>First Name:</p>
          <p>Last Name:</p>
          <p>Email:</p>
          <p>Password:</p>
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
          <Btn text='LogOut' symbol='✓' onClick={() => dispatch(logout())} />
        </div>
      </div>
      <p>Contacto: kurtguardia@gmail.com</p>
    </div>
  );
};

export default User;
