import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditDebtModal } from '../../store/actions/settingsActions';
import { editDebt } from '../../store/actions/financeActions';
import { Modal, Btn } from '../UI';
import { english, spanish } from '../../languages';

const EditDebt = ({ item }) => {
  const edit = useSelector((state) => state.settings.modals.editDebt);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.editDebts });
    } else if (language === 'spanish') {
      setContent({ ...spanish.editDebts });
    }
    // eslint-disable-next-line
  }, [language]);

  const editCurDebt = (e) => {
    e.preventDefault();

    const editedItem = {
      id: item.id,
      type: item.type,
      name,
      description,
      amount,
      dueDate,
    };

    dispatch(editDebt(editedItem));

    setName('');
    setDescription('');
    setAmount('');
    setDueDate('');

    setTimeout(() => {
      dispatch(toggleEditDebtModal());
    }, 300);
  };

  return (
    <Modal show={edit.isOpen}>
      <div className='modal__title'>
        <h2>
          {content?.title}: {item?.name}
        </h2>
        <span onClick={() => dispatch(toggleEditDebtModal())}>x</span>
      </div>
      <form className='modal__info' onSubmit={editCurDebt}>
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

        <div className='modal__info--setting date'>
          <label>{content?.date}</label>
          <input
            type='date'
            placeholder={item?.dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
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

export default EditDebt;
