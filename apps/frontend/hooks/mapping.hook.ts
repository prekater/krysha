export enum MappingType {
  CURRENCY = 'currency',
  PERIOD = 'period',
}

export enum PluralType {
  SINGLE = 'SINGLE',
  PLURAL = 'PLURAL',
}

export function useMapping(mappingType: MappingType, value) {

  const map: Record<MappingType, Record<string, any>> = {

    [MappingType.CURRENCY]: {
      USD: '$',
      RUB: '₽',
      EUR: '€',
    },
    [MappingType.PERIOD]: {
      'months': {
        [PluralType.PLURAL]: 'мес.',
        [PluralType.SINGLE]: 'месяц',
      },
      'days': {
        [PluralType.PLURAL]: 'дн.',
        [PluralType.SINGLE]: 'день',
      },
      'years': {
        [PluralType.PLURAL]: 'лет',
        [PluralType.SINGLE]: 'год',
      }
    }
  }

  return map[mappingType][value]


}
