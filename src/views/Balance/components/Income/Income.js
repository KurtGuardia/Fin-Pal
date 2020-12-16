import React, { useState } from 'react';
import './Income.scss';
import { TrashCan, Edit } from '../../../../assets/icons';

const Income = () => {
  const [openNote, setOpenNote] = useState(false);

  const toggleNote = () => {
    setOpenNote(!openNote);
  };

  return (
    <li className='income' onClick={toggleNote}>
      <div className='income__face'>
        <div className='income__face--name'>Transaccion</div>
        <div className='income__face--amount'>$ 69.69</div>
        <div className='income__face--icons'>
          <Edit />
          <TrashCan />
        </div>
      </div>
      <div className={openNote ? 'income__data show' : 'income__data'}>
        <div className='income__data--note'>Bla bla bla bla</div>
        <div className='income__data--date'>16 / 12 / 20</div>
      </div>
    </li>
  );
};

export default Income;
