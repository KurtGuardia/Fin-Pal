import { useDispatch, useSelector } from 'react-redux';
import { Btn, Modal } from '../UI';
import { addItem } from '../../store/actions/financeActions';
import { useEffect, useState } from 'react';
import { english, spanish } from '../../languages';
import { v4 as uuidv4 } from 'uuid';
import { toggleAddItemModal } from '../../store/actions/settingsActions';

const AddItem = () => {
  const isAddItemOpen = useSelector(
    (state) => state.settings.modals.isAddItemOpen
  );
  const language = useSelector((state) => state.settings.language);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [content, setContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.addItem });
    } else if (language === 'spanish') {
      setContent({ ...spanish.addItem });
    }
  }, [language]);

  const addCurItem = (e) => {
    e.preventDefault();

    const item = {
      type: 'stock',
      name,
      description,
      totalCost,
      quantity,
      dueDate,
      id: uuidv4(),
    };

    dispatch(addItem(item));

    setName('');
    setDescription('');
    setTotalCost('');
    setQuantity('');

    setTimeout(() => {
      dispatch(toggleAddItemModal());
    }, 300);
  };

  return (
    <Modal show={isAddItemOpen}>
      <div className='modal__title'>
        <h2>{content.title}</h2>
        <span onClick={() => dispatch(toggleAddItemModal())}>X</span>
      </div>

      <form className='modal__info' onSubmit={addCurItem}>
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
          <label>{content.quantity}</label>
          <input
            type='number'
            placeholder={content.quantity}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content.totalCost}</label>
          <input
            type='number'
            placeholder='€€'
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            required
          />
        </div>

        <div className='modal__info--setting date'>
          <label>{content.date}</label>
          <input
            type='date'
            placeholder={content.dueDate}
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

export default AddItem;
