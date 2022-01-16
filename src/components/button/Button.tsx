import React from "react";

interface IButtonProps {
  text: string;
  onclick?: () => void;
}

const Button = ({ text, onclick }: IButtonProps): JSX.Element => {
  const handleOnClick = (): void => {
    if (onclick) {
      onclick();
    }
  };

  return (
    <button className="button" type="button" onClick={handleOnClick}>
      {text}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  onclick: undefined,
};
