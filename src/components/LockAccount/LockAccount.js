import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLockAccountModal } from '../../store/actions/settingsActions';
import { Modal, Btn } from '../UI';
import './LockAccount.scss';

const LockAccount = () => {
  const isLockAccountOpen = useSelector(
    (state) => state.settings.modals.isLockAccountOpen
  );
  const dispatch = useDispatch();

  return (
    <Modal show={isLockAccountOpen}>
      <div className='modal__title'>
        <p>
          Enter your Pin to block the accont{' '}
          <small style={{ color: 'red', fontWeight: 'bold' }}>
            Pin incorrecto
          </small>
        </p>

        <span onClick={() => dispatch(toggleLockAccountModal())}>X</span>
      </div>

      <form className='modal__info'>
        <div className='modal__info--setting'>
          <div className='numbers'>
            <div className='row'>
              <button onClick={(e) => e.preventDefault()} className='number'>
                1
              </button>
              <button onClick={(e) => e.preventDefault()} className='number'>
                2
              </button>
              <button onClick={(e) => e.preventDefault()} className='number'>
                3
              </button>
            </div>
            <div className='row'>
              <button onClick={(e) => e.preventDefault()} className='number'>
                4
              </button>
              <button onClick={(e) => e.preventDefault()} className='number'>
                5
              </button>
              <button onClick={(e) => e.preventDefault()} className='number'>
                6
              </button>
            </div>
            <div className='row'>
              <button onClick={(e) => e.preventDefault()} className='number'>
                7
              </button>
              <button onClick={(e) => e.preventDefault()} className='number'>
                8
              </button>
              <button onClick={(e) => e.preventDefault()} className='number'>
                9
              </button>
            </div>
            <div className='row'>
              <span>&nbsp;&nbsp;</span>
              <button onClick={(e) => e.preventDefault()} className='number'>
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
