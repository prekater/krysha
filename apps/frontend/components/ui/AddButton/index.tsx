import React from 'react';
import clsx from 'clsx';

import styles from './AddButton.module.scss';

interface IProps {
  handleClick: () => void;
  text: string;
  customTextStyle: string;
  id?: string;
}

export const AddButton = ({
  handleClick,
  text,
  customTextStyle,
  id,
}: IProps) => {
  const buttonClassName = clsx(styles.root, customTextStyle);

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleClick}
      id={id}
    >
      <div className={styles.root_icon}>
        <img src="/images/plus.svg" alt="add rule" />
      </div>
      {text}
    </button>
  );
};
