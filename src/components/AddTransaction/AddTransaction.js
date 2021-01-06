import { useDispatch, useSelector } from 'react-redux';
import { Btn, Modal } from '../UI';
import { toggleAddTransactionModal } from '../../store/actions/settingsActions';
import { addIncome, addExpense } from '../../store/actions/financeActions';
import { useEffect, useState } from 'react';
import { english, spanish } from '../../languages';
import { v4 as uuidv4 } from 'uuid';

const AddTransaction = () => {
  const isAddTransactionOpen = useSelector(
    (state) => state.settings.modals.isAddTransactionOpen
  );
  const language = useSelector((state) => state.settings.language);
  const [type, setType] = useState('income');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const [content, setContent] = useState({});

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.addTransaction });
    } else if (language === 'spanish') {
      setContent({ ...spanish.addTransaction });
    }
  }, [language]);

  const addTransaction = (e) => {
    e.preventDefault();

    const item = {
      type,
      name,
      description,
      amount,
      date,
      id: uuidv4(),
    };

    if (type === 'income') {
      dispatch(addIncome(item));
    } else if (type === 'expense') {
      dispatch(addExpense(item));
    }

    setName('');
    setDescription('');
    setAmount(0);

    setTimeout(() => {
      dispatch(toggleAddTransactionModal());
    }, 300);
  };

  return (
    <Modal show={isAddTransactionOpen}>
      <div className='modal__title'>
        <h2>{content.title}</h2>
        <span onClick={() => dispatch(toggleAddTransactionModal())}>X</span>
      </div>

      <form className='modal__info' onSubmit={addTransaction}>
        <div className='modal__info--setting'>
          <label>{content.type}</label>
          <select
            defaultValue='income'
            onChange={(e) => setType(e.target.value)}
          >
            <option value='income'>{content.types && content.types[0]}</option>
            <option value='expense'>{content.types && content.types[1]}</option>
          </select>
        </div>

        <div className='modal__info--setting'>
          <label>{content.name}</label>
          <input
            type='text'
            placeholder={content.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content.description}</label>
          <input
            type='text'
            placeholder={content.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content.amount}</label>
          <input
            type='number'
            placeholder='€€'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting date'>
          <label>{content.date}</label>
          <input
            type='date'
            placeholder={content.date}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--btn'>
          <Btn text={content.btn} symbol='✓' />
        </div>
      </form>
    </Modal>
  );
};

export default AddTransaction;
