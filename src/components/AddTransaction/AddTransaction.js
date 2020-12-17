import { useDispatch, useSelector } from 'react-redux';
import { Btn, Modal } from '../UI';
import {
  addIncome,
  toggleAddTransactionModal,
} from '../../store/actions/settingsActions';
import { useState } from 'react';

const AddTransaction = () => {
  const isAddTransactionOpen = useSelector(
    (state) => state.settings.modals.isAddTransactionOpen
  );
  const [type, setType] = useState('icome');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(12);
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  return (
    <Modal show={isAddTransactionOpen}>
      <div className='modal__title'>
        <h2>Add Transaction</h2>
        <span onClick={() => dispatch(toggleAddTransactionModal())}>X</span>
      </div>

      <form className='modal__info'>
        <div className='modal__info--setting'>
          <label>Type</label>
          <select
            defaultValue='income'
            onChange={(e) => setType(e.target.value)}
          >
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>
        </div>

        <div className='modal__info--setting'>
          <label>Transaction</label>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>Description</label>
          <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>Amount</label>
          <input
            type='number'
            placeholder='$$'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>Date</label>
          <input
            type='date'
            placeholder='Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className='modal__ingo--btn'>
          <Btn text='Add' symbol='✓' clicked={() => dispatch(addIncome())} />
        </div>
      </form>
    </Modal>
  );
};

export default AddTransaction;
