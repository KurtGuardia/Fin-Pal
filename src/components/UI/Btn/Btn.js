import './Btn.scss';

const Btn = ({ text, symbol, clicked, disabled }) => {
  return (
    <button className='btn' onClick={clicked} disabled={disabled}>
      <span>{symbol}</span> {text}
    </button>
  );
};

export default Btn;
