import React from 'react';
import clsx from 'clsx';

import { AddButton } from '../../ui/AddButton';
import { DeleteButton } from '../../ui/DeleteButton';

import styles from './OptionStep.module.scss';

type Props = {
  options: any;
  onChangeOption: any;
  onAddOption: any;
  onRemoveOption: any;
};

type ItemProps = {
  className: string;
  value: string;
  onChange: any;
  onRemove: any;
};

const OptionItem = (props: ItemProps) => {
  const { value, onChange, onRemove, className } = props;
  const inputClassname = clsx(styles.input, className);

  return (
    <label className={styles.inputLabel}>
      <input
        value={value}
        className={inputClassname}
        onChange={onChange}
        type="text"
        placeholder="Опишите опцию"
      />
      <DeleteButton handleClick={onRemove} text="" />
    </label>
  );
};

export const OptionStep = (props: Props) => {
  const { options, onAddOption, onChangeOption, onRemoveOption } = props;

  const groupedOptions = options.reduce(
    (result, item, index) => {
      const key = item.isEnabled ? 'include' : 'exclude';

      result[key] = result[key].concat([
        {
          title: item.title,
          isEnabled: item.isEnabled,
          index,
        },
      ]);

      return result;
    },
    {
      include: [],
      exclude: [],
    }
  );

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>
          Что включено в стоимость аренды?
        </legend>
        {/*@TODO что здесь лучше использовать для key? index не очень, а если испть-ть title, то баг ввода текста в инпут*/}
        {groupedOptions['include'].map((o) => (
          <OptionItem
            className={'enabled-option'}
            value={o.title}
            onChange={onChangeOption(o.index)}
            onRemove={onRemoveOption(o.index)}
            key={o.index}
          />
        ))}
        <AddButton
          handleClick={onAddOption(true)}
          text="Добавить опцию"
          customTextStyle={styles.addRuleButton}
          id="add-enabled-option-btn"
        />
      </fieldset>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>
          Что оплачивается дополнительно?
        </legend>
        {groupedOptions['exclude'].map((o) => (
          <OptionItem
            className={'disabled-option'}
            value={o.title}
            onChange={onChangeOption(o.index)}
            onRemove={onRemoveOption(o.index)}
            key={o.index}
          />
        ))}
        <AddButton
          handleClick={onAddOption(false)}
          text="Добавить опцию"
          customTextStyle={styles.addRuleButton}
          id="add-disabled-option-btn"
        />
      </fieldset>
    </article>
  );
};
