import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditTransactionModal } from '../../store/actions/settingsActions';
import { editExpense, editIncome } from '../../store/actions/financeActions';
import { Modal, Btn } from '../UI';
import { english, spanish } from '../../languages';

const EditTransaction = ({ item }) => {
  const edit = useSelector((state) => state.settings.modals.editTransaction);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.editTransaction });
    } else if (language === 'spanish') {
      setContent({ ...spanish.editTransaction });
    }
    // eslint-disable-next-line
  }, [language]);

  const addTransaction = (e) => {
    e.preventDefault();

    const editedItem = {
      id: item.id,
      type: item.type,
      name,
      description,
      amount,
      date,
    };

    if (item?.type === 'income') {
      dispatch(editIncome(editedItem));
    } else if (item?.type === 'expense') {
      dispatch(editExpense(editedItem));
    }

    setName('');
    setDescription('');
    setAmount('');
    setDate('');

    setTimeout(() => {
      dispatch(toggleEditTransactionModal());
    }, 300);
  };

  return (
    <Modal show={edit.isOpen}>
      <div className='modal__title'>
        <h2>
          {content?.title}: {item?.name}
        </h2>
        <span onClick={() => dispatch(toggleEditTransactionModal())}>x</span>
      </div>
      <form className='modal__info' onSubmit={addTransaction}>
        <div className='modal__info--setting'>
          <label>{content?.name}</label>
          <input
            type='text'
            placeholder={item?.name}
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content?.description}</label>
          <input
            type='text'
            placeholder={item?.description}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content?.amount}</label>
          <input
            type='number'
            placeholder={item?.amount}
            onChange={(e) => setAmount(+e.target.value)}
            value={amount}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content?.date}</label>
          <input
            type='date'
            placeholder={item?.date}
            onChange={(e) => setDate(e.target.value)}
            value={date}
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

export default EditTransaction;
