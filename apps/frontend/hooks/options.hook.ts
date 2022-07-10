import {useState} from "react";

export const useOptions = () =>  {

  const [options, setOptions] = useState<{ title: string; isEnabled: boolean }[]>([])

  const onChangeOption =  (i) => (event) => {
    const tmp = [...options]
    tmp[i].title = event.target.value
    setOptions(tmp)
  }
  const onRemoveOption = i => () => {
    const tmp = [...options]
    tmp.splice(i, 1)
    setOptions(tmp)
  }
  const onAddOption = (isEnabled: boolean) => () => {
    setOptions(options.concat({title: '', isEnabled}))
  }

  return {
    options,
    onChangeOption,
    onAddOption,
    onRemoveOption
  }
}
