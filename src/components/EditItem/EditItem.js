import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditItemModal } from '../../store/actions/settingsActions';
import { editItem } from '../../store/actions/financeActions';
import { Modal, Btn } from '../UI';
import { english, spanish } from '../../languages';

const EditDebt = ({ item }) => {
  const edit = useSelector((state) => state.settings.modals.editItem);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.editItem });
    } else if (language === 'spanish') {
      setContent({ ...spanish.editItem });
    }
    // eslint-disable-next-line
  }, [language]);

  const editCurItem = (e) => {
    e.preventDefault();

    const editedItem = {
      id: item.id,
      type: item.type,
      name,
      description,
      totalCost,
      quantity,
      dueDate,
    };

    dispatch(editItem(editedItem));

    setName('');
    setDescription('');
    setQuantity('');
    setTotalCost('');
    setDueDate('');

    setTimeout(() => {
      dispatch(toggleEditItemModal());
    }, 300);
  };

  return (
    <Modal show={edit.isOpen}>
      <div className='modal__title'>
        <h2>
          {content?.title}: {item?.name}
        </h2>
        <span onClick={() => dispatch(toggleEditItemModal())}>x</span>
      </div>
      <form className='modal__info' onSubmit={editCurItem}>
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
          <label>{content?.quantity}</label>
          <input
            type='number'
            placeholder={item?.quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            value={quantity}
            required
          />
        </div>

        <div className='modal__info--setting'>
          <label>{content?.totalCost}</label>
          <input
            type='number'
            placeholder={item?.totalCost}
            onChange={(e) => setTotalCost(+e.target.value)}
            value={totalCost}
            required
          />
        </div>

        <div className='modal__info--setting'>
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
