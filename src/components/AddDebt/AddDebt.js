import { useDispatch, useSelector } from 'react-redux';
import { Btn, Modal } from '../UI';
import { toggleAddDebtModal } from '../../store/actions/settingsActions';
import { addDebt } from '../../store/actions/financeActions';
import { useEffect, useState } from 'react';
import { english, spanish } from '../../languages';
import { v4 as uuidv4 } from 'uuid';

const AddDebt = () => {
  const isAddDebtOpen = useSelector(
    (state) => state.settings.modals.isAddDebtOpen
  );
  const language = useSelector((state) => state.settings.language);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.addDebts });
    } else if (language === 'spanish') {
      setContent({ ...spanish.addDebts });
    }
  }, [language]);

  const addCurDebt = (e) => {
    e.preventDefault();

    const item = {
      type: 'debt',
      name,
      description,
      amount,
      dueDate,
      id: uuidv4(),
    };

    dispatch(addDebt(item));

    setName('');
    setDescription('');
    setAmount('');

    setTimeout(() => {
      dispatch(toggleAddDebtModal());
    }, 300);
  };

  return (
    <Modal show={isAddDebtOpen}>
      <div className='modal__title'>
        <h2>{content.title}</h2>
        <span onClick={() => dispatch(toggleAddDebtModal())}>X</span>
      </div>

      <form className='modal__info' onSubmit={addCurDebt}>
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--btn'>
          <Btn text={content.btnText} symbol='✓' />
        </div>
      </form>
    </Modal>
  );
};

export default AddDebt;
