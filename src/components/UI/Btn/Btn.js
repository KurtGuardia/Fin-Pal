import './Btn.scss';

const Btn = ({ text, symbol, clicked }) => {
  return (
    <button className='btn' onClick={clicked}>
      <span>{symbol}</span> {text}
    </button>
  );
};

export default Btn;
