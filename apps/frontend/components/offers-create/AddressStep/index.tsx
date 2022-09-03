import React from 'react';
import { useField } from 'react-final-form-hooks';

import { useAddress } from '../../../hooks/address.hook';

import {
  cityOptions,
  defaultCityOption,
  defaultPropertyTypeOption,
  propertyTypeOptions,
} from '../../ui/constants';
import { DropdownSelect } from '../../ui/DropdownSelect';
import styles from './AddressStep.module.scss';

type Props = {
  form: any;
};

export const AddressStep = (props: Props) => {
  const { form } = props;

  const [city, house, street, flat] = useAddress(form);

  const propertyType = useField('meta.propertyType', form);

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Город</legend>
        <DropdownSelect
          options={cityOptions}
          defaultValue={defaultCityOption}
          handleChange={() => city.input.onChange}
          customStyle={styles.citySelect}
        />
      </fieldset>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Улица</legend>
        <input
          type="text"
          value={street.input.value}
          onChange={street.input.onChange}
          className={styles.streetInput}
          placeholder="Введите улицу"
        />
      </fieldset>

      <div className={styles.twoFieldsets}>
        <fieldset className={styles.fieldsGroup}>
          <legend className={styles.fieldTitle}>Дом</legend>
          <input
            type="text"
            value={house.input.value}
            onChange={house.input.onChange}
            className={styles.streetInput}
            placeholder="Введите номер"
          />
        </fieldset>
        <fieldset className={styles.fieldsGroup}>
          <legend className={styles.fieldTitle}>Квартира</legend>
          <input
            type="text"
            value={flat.input.value}
            onChange={flat.input.onChange}
            className={styles.streetInput}
            placeholder="Введите номер"
          />
        </fieldset>
      </div>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Тип жилья</legend>
        <DropdownSelect
          options={propertyTypeOptions}
          defaultValue={defaultPropertyTypeOption}
          handleChange={() => propertyType.input.onChange}
          customStyle={styles.citySelect}
        />
      </fieldset>
    </article>
  );
};
