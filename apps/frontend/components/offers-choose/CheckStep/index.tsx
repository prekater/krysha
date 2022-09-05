import React from 'react';
import clsx from 'clsx';

import styles from './CheckStep.module.scss';
import {DurationAndPrice} from "../../common/preview/DurationAndPrice";
import {TerminationRules} from "../../common/preview/TerminationRules";
import {Options} from "../../common/preview/Options";
import {Payment} from "../../common/preview/Payment";
import Address from "../../common/preview/Address";
import CadastralNumber from "../../common/preview/CadastralNumber";


export const CheckStep = ({term, options, payments, address, employer, setEmployer, landlord, setLandlord}) => {


  return (
    <article className={styles.root}>
      <div className={styles.fieldsBlock}>
        <DurationAndPrice
          periodFrom={term.periodFrom}
          periodTo={term.periodTo}
          price={term.price}
          priceUnit={term.priceUnit}
          periodUnit={term.periodUnit}
        />
        <TerminationRules
          terminationRules={term.terminationRules.map(({props}) => props)}
          priceUnit={term.priceUnit}
          periodUnit={term.periodUnit}
        />
        <Options options={options}/>
        <Payment data={payments}/>
        <Address address={address}/>
        <label className={styles.priceLabel}>
          <input
            value={employer.email}
            onChange={(e) => setEmployer(prev => ({
              ...prev,
              email: e.target.value
            }))}
            className={styles.periodInput}
            name="employer-email"
            type="email"
            placeholder="Email Арендатора"
          />
        </label>
        <label className={styles.priceLabel}>
          <input
            value={landlord.email}
            onChange={(e) => setLandlord(prev => ({
              ...prev,
              email: e.target.value
            }))}
            className={styles.periodInput}
            name="landlord-email"
            type="email"
            placeholder="Email Арендодателя"
          />
        </label>
        <label className={styles.priceLabel}>
          <input
            value={employer.fullname}
            onChange={(e) => setEmployer(prev => ({
              ...prev,
              fullname: e.target.value
            }))}
            className={styles.periodInput}
            name="employer-fullname"
            placeholder="ФИО Арендатора"
          />
        </label>
        <label className={styles.priceLabel}>
          <input
            value={landlord.fullname}
            onChange={(e) => setLandlord(prev => ({
              ...prev,
              fullname: e.target.value
            }))}
            className={styles.periodInput}
            name="landlord-fullname"
            placeholder="ФИО Арендодателя"
          />
        </label>

      </div>
    </article>
  );
};
