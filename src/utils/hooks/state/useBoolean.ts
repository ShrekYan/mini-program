import {useState} from 'react'

const useBoolean = (defaultValue: object) => {
  const [value, setValue] = useState<boolean>(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(x => !x);
  return {value, setValue, setTrue, setFalse, toggle};
};

export default useBoolean;
