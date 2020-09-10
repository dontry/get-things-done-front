import { useCallback, useState } from 'react';

export function useValueChange<T>(initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = useCallback(
    (_value: T) => {
      setValue(_value);
    },
    [setValue]
  );

  return [value, handleValueChange];
}
