import React from "react";

interface IButtonProps {
  text?: string;
  materialIcon?: string;
  customStyles?: { [key: string]: string };
  onclick?: () => void;
}

const Button = ({
  text,
  onclick,
  materialIcon,
  customStyles,
}: IButtonProps): JSX.Element => {
  const classes: string[] = [];

  const handleOnClick = (): void => {
    if (onclick) {
      onclick();
    }
  };

  const renderButtonContent = (): string => {
    if (materialIcon) {
      return materialIcon;
    }

    if (text) {
      return text;
    }

    return "Ok";
  };

  if (materialIcon) {
    classes.push("material-icons");
  }

  return (
    <button
      style={customStyles}
      className="button"
      type="button"
      onClick={handleOnClick}
    >
      <span className={classes.join(" ")}>{renderButtonContent()}</span>
    </button>
  );
};

export default Button;

Button.defaultProps = {
  text: "Ok",
  onclick: undefined,
  materialIcon: undefined,
  customStyles: undefined,
};
