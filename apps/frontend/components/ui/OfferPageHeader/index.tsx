import styles from './OfferPageHeader.module.scss';
import clsx from 'clsx';

interface IProps {
  step: number;
}

export const OfferPageHeader = ({ step }: IProps) => {
  const pageHeaderClassName = clsx(styles.root, {
    [styles.root_lastStep]: step === 5,
  });
  const textBlockClassName = clsx(styles.textBlock, {
    [styles.textBlock_lastStep]: step === 5,
  });
  const textWrapperClassName = clsx(styles.textWrapper, {
    [styles.textWrapper_lastStep]: step === 5,
  });
  const pageTitleClassName = clsx(styles.pageTitle, {
    [styles.pageTitle_lastStep]: step === 5,
  });
  const pageTextClassName = clsx(styles.pageText, {
    [styles.pageText_lastStep]: step === 5,
  });
  const heroImageClassName = clsx(styles.heroImage, {
    [styles.heroImage_lastStep]: step === 5,
  });

  const makeTitle = () => (step === 5 ? 'Проверка данных' : 'Составим договор');
  const makeText = () => {
    if (step === 5) {
      return (
        <>
          Пока мы формируем договор, убедитесь в правильности введённых данных
        </>
      );
    } else {
      return (
        <>
          Бесплатный сервис для составления <br />
          грамотного договора аренды для владельцев
          <br /> квартир, риелторов и арендаторов.
        </>
      );
    }
  };

  return (
    <header className={pageHeaderClassName}>
      <div className={textBlockClassName}>
        <article className={textWrapperClassName}>
          <h1 className={pageTitleClassName}>{makeTitle()}</h1>
          <p className={pageTextClassName}>{makeText()}</p>
          <img src="/images/arrow-down.svg" alt="arrow down" />
        </article>
      </div>
      <div className={heroImageClassName} />
    </header>
  );
};
