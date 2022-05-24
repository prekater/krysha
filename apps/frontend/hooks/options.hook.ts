import {useState} from "react";

export const useOptions = () =>  {

  const [options, setOptions] = useState<{ title: string; isEnabled: true }[]>([])

  const onChangeOption =  (i) => (event) => {
    const tmp = [...options]
    tmp[i] = {
      title: event.target.value,
      isEnabled: true
    }
    setOptions(tmp)
  }
  const onAddOption = () => {
    setOptions(options.concat({title: '', isEnabled: true}))
  }

  return {
    options,
    onChangeOption,
    onAddOption
  }
}
