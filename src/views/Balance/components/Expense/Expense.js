import React, { useState } from 'react';
import './Expense.scss';
import { TrashCan, Edit } from '../../../../assets/icons';

const Expense = () => {
  const [openNote, setOpenNote] = useState(false);

  const toggleNote = () => {
    setOpenNote(!openNote);
  };

  return (
    <li className='expense' onClick={toggleNote}>
      <div className='expense__face'>
        <div className='expense__face--name'>Transaccion</div>
        <div className='expense__face--amount'>$ 69.69</div>
        <div className='expense__face--icons'>
          <Edit />
          <TrashCan />
        </div>
      </div>
      <div className={openNote ? 'expense__data show' : 'expense__data'}>
        <div className='expense__data--note'>Bla bla bla bla</div>
        <div className='expense__data--date'>16 / 12 / 20</div>
      </div>
    </li>
  );
};

export default Expense;
