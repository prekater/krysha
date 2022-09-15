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
import clsx from 'clsx';

type Props = {
  form: any;
};

export const AddressStep = (props: Props) => {
  const { form } = props;

  const [city, house, street, flat, cadastralNumber] = useAddress(form);

  const propertyType = useField('meta.propertyType', form);

  const cadastralFieldClassName = clsx(
    styles.fieldsGroup,
    styles.fieldsGroup__cadastral
  );

  return (
    <article className={styles.root}>
      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Город</legend>
        {/*<DropdownSelect*/}
        {/*  name={'city'}*/}
        {/*  options={cityOptions}*/}
        {/*  defaultValue={defaultCityOption}*/}
        {/*  handleChange={() => city.input.onChange}*/}
        {/*  customStyle={styles.citySelect}*/}
        {/*/>*/}
        <input
          id={'city'}
          type="text"
          value={city.input.value}
          onChange={city.input.onChange}
          className={styles.streetInput}
          placeholder="Введите город"
        />
      </fieldset>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Улица</legend>
        <input
          id={'street'}
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
            id={'house'}
            type="text"
            value={house.input.value}
            onChange={house.input.onChange}
            className={styles.streetInput}
            placeholder="Введите дом"
          />
        </fieldset>
        <fieldset className={styles.fieldsGroup}>
          <legend className={styles.fieldTitle}>Квартира</legend>
          <input
            id={'flat'}
            type="text"
            value={flat.input.value}
            onChange={flat.input.onChange}
            className={styles.streetInput}
            placeholder="Введите номер квартиры"
          />
        </fieldset>
        <fieldset className={cadastralFieldClassName}>
          <legend className={styles.fieldTitle}>Кадастровый номер</legend>
          <input
            id={'cadastralNumber'}
            type="text"
            value={cadastralNumber.input.value}
            onChange={cadastralNumber.input.onChange}
            className={styles.streetInput}
            placeholder="Введите кадастровый номер"
          />
        </fieldset>
      </div>

      <fieldset className={styles.fieldsGroup}>
        <legend className={styles.fieldTitle}>Тип жилья</legend>
        <DropdownSelect
          name={'propertyType'}
          options={propertyTypeOptions}
          defaultValue={propertyType.input.value}
          handleChange={(e) => {
            propertyType.input.onChange(e);
          }}
          customStyle={styles.citySelect}
        />
      </fieldset>
    </article>
  );
};
