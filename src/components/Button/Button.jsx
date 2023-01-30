const Button = ({ text, clickHandlrer }) => {
  return (
    <button type="button" onClick={clickHandlrer}>
      {text}
    </button>
  );
};

export default Button;
