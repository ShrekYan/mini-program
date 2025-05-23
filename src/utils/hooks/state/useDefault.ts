import {useState} from 'react';

const useDefault = <TStateType>(
  defaultValue: TStateType,
  initialValue: TStateType | (() => TStateType)
) => {
  const [value, setValue] = useState<TStateType | undefined | null>(initialValue);

  if (value === undefined || value === null) {
    return [defaultValue, setValue];
  }

  return [value, setValue];
};

export default useDefault;
