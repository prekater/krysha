import React from 'react';

import Dropdown from 'react-dropdown';
import clsx from 'clsx';

import 'react-dropdown/style.css';
import styles from './DropdownSelect.module.scss';

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  options: IOption[];
  defaultValue: string;
  handleChange: (e?: any) => void;
  customStyle?: string;
  name: string;
  disabled?: boolean
}

export const DropdownSelect = ({
  options,
  defaultValue,
  handleChange,
  customStyle,
  name,
  disabled = false
}: IProps) => {
  const dropdownWrapperClassName = clsx(styles.root, customStyle);

  return (
    <div className={dropdownWrapperClassName}>
      <Dropdown
        className={name}
        disabled={disabled}
        options={options}
        onChange={e => handleChange(e.value)}
        value={defaultValue}
        controlClassName={styles.dropdownInput}
        menuClassName={styles.dropdownMenu}
        arrowClosed={<span className={styles.dropdownArrow} />}
        arrowOpen={
          <span
            className={clsx(styles.dropdownArrow, [styles.dropdownArrow__open])}
          />
        }
      />
    </div>
  );
};
