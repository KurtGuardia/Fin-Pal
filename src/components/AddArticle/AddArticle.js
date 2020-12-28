import { useDispatch, useSelector } from 'react-redux';
import { Btn, Modal } from '../UI';
import { addArticle } from '../../store/actions/financeActions';
import { useEffect, useState } from 'react';
import { english, spanish } from '../../languages';
import { v4 as uuidv4 } from 'uuid';
import { toggleAddArticleModal } from '../../store/actions/settingsActions';

const AddArticle = () => {
  const isAddArticleOpen = useSelector(
    (state) => state.settings.modals.isAddArticleOpen
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
      setContent({ ...english.addArticle });
    } else if (language === 'spanish') {
      setContent({ ...spanish.addArticle });
    }
  }, [language]);

  const addCurArticle = (e) => {
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

    dispatch(addArticle(item));

    setName('');
    setDescription('');
    setTotalCost('');
    setQuantity('');

    setTimeout(() => {
      dispatch(toggleAddArticleModal());
    }, 300);
  };

  return (
    <Modal show={isAddArticleOpen}>
      <div className='modal__title'>
        <h2>{content.title}</h2>
        <span onClick={() => dispatch(isAddArticleOpen())}>X</span>
      </div>

      <form className='modal__info' onSubmit={addCurArticle}>
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

        <div className='modal__info--setting'>
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

export default AddArticle;
