import {useField} from "react-final-form-hooks";

export const useAddress = (form) =>
{
  return ['city', 'house', 'street', 'flat', 'cadastralNumber']
    .map(key => useField(`address.${key}`, form))
}
