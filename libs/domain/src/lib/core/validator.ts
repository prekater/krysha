export class Validator {

  static validateAgainstSchema(schema: Record<string, boolean>) {

    return Object.entries(schema)
      .filter(([_, value]) => {
        return !value;
      })
      .reduce((accum, [key, value]) => {
        return {...accum, [key]: 'incorrect field'}
      }, {})

  }
}
