import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { english, spanish } from '../../languages';
import { toggleLock } from '../../store/actions/lockActions';
import { toggleLockAccountModal } from '../../store/actions/settingsActions';
import { Modal, Btn } from '../UI';
import './LockAccount.scss';

const LockAccount = () => {
  const isLockAccountOpen = useSelector(
    (state) => state.settings.modals.isLockAccountOpen
  );
  const dispatch = useDispatch();
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const profile = useSelector((state) => state.firebase.profile);
  const [code, setCode] = useState([]);

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.lockAccount });
    } else if (language === 'spanish') {
      setContent({ ...spanish.lockAccount });
    }
  }, [language]);

  const submitHandler = (e) => {
    e.preventDefault();
    const codeInString = code.toString();
    const stringCodeNoCommas = codeInString.replace(/,/g, '');
    if (stringCodeNoCommas === profile.pin) {
      dispatch(toggleLock(!profile.isAccountLocked));
    }
    setCode([]);
    dispatch(toggleLockAccountModal());
  };

  return (
    <Modal show={isLockAccountOpen}>
      <div className='modal__title'>
        <p>
          Enter your Pin to block the accont{' '}
          <small style={{ color: 'red', fontWeight: 'bold', padding: '2rem' }}>
            Pin incorrecto
          </small>
        </p>

        <span onClick={() => dispatch(toggleLockAccountModal())}>X</span>
      </div>

      <form className='modal__info' onSubmit={submitHandler}>
        <div className='modal__info--setting'>
          <div className='numbers'>
            <div className='row'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='1'
              >
                1
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='2'
              >
                2
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='3'
              >
                3
              </button>
            </div>
            <div className='row'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='4'
              >
                4
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='5'
              >
                5
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='6'
              >
                6
              </button>
            </div>
            <div className='row'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='7'
              >
                7
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='8'
              >
                8
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='9'
              >
                9
              </button>
            </div>
            <div className='row'>
              <span>&nbsp;&nbsp;</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let value = +e.target.value;
                  setCode([...code, value]);
                }}
                className='number'
                value='0'
              >
                0
              </button>
              <span>&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
        <div className='modal__info--btn'>
          {' '}
          <Btn text='Enter' symbol='✓' />
        </div>
      </form>
    </Modal>
  );
};

export default LockAccount;
