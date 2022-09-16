export const createStepTitles = {
  1: 'Условия аренды',
  2: 'Опции',
  3: 'Условия платежей',
  4: 'Адрес и тип жилья',
  5: 'Проверка данных',
};

export const createStepDescriptions = {
  1: 'Укажите оптимальные условия аренды. Мы внесём данные в договор.',
  2: 'Добавьте нужные опции, чтобы сделать договор более гибким.',
  3: 'Выберите удобные для Вас условия платежей.',
  4: 'Укажите необходимую информацию о Вашей квартире.',
  5: 'Проверьте правильность введённых данных.',
};

export const chooseStepTitles = {
  1: 'Выбор условий',
  2: 'Условия залога',
  3: 'Даты аренды',
  4: 'Условия платежей',
  5: 'Проверка данных',
};

export const chooseStepDescriptions = {
  1: 'Выберите подходящие для вас условия аренды. Мы внесём данные в договор.',
  2: 'Выберите удобные для Вас условия залога.',
  3: 'Выберите удобные для Вас даты аренды.',
  4: 'Выберите удобные для Вас условия платежей.',
  5: 'Проверьте правильность введённых данных.',
};

export const periodOptions = [
  { value: 'days', label: 'Дней' },
  { value: 'months', label: 'Месяцев' },
  { value: 'years', label: 'Лет' },
];

export const defaultPeriodOption = periodOptions[0].value;

export const currencyOptions = [
  { value: 'RUB', label: 'Руб.' },
  { value: 'EUR', label: 'Евро' },
  { value: 'USD', label: '$' },
];

export const defaultCurrencyOption = currencyOptions[0].value;

export const cityOptions = [
  { value: '', label: 'Выберите город' },
  { value: 'Moscow', label: 'Москва' },
  { value: 'StPetersburg', label: 'Санкт-Петербург' },
];

export const defaultCityOption = cityOptions[0].value;

export const propertyTypeOptions = [
  { value: '', label: 'Выберите тип жилья' },
  { value: 'ONE_ROOM', label: 'Однокомнатная' },
  { value: 'TWO_ROOM', label: 'Двухкомнатная' },
  { value: 'THREE_ROOM', label: 'Трехкомнатная' },
  { value: 'FOUR_ROOM', label: 'Четырехкомнатная' },
  { value: 'FIVE_ROOM', label: 'Пятикомнатная' },
  { value: 'STUDIO', label: 'Студия' },
];

export const defaultPropertyTypeOption = propertyTypeOptions[0].value;

export const monthsOptions = [
  { value: '1', label: '1' },
  { value: '3', label: '3' },
  { value: '5', label: '5' },
];

export const defaultMonthsOption = monthsOptions[0].value;
