import React from 'react';
import styles from './DeleteButton.module.scss';

interface IProps {
  handleClick: () => void;
  text: string;
}

export const DeleteButton = ({ handleClick, text }: IProps) => {
  return (
    <button className={styles.root} type="button" onClick={handleClick}>
      <img
        src="/images/delete-button.svg"
        alt="add rule"
        className={styles.root_icon}
      />
      {text}
    </button>
  );
};
