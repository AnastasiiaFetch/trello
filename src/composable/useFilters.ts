import { useEffect, useState } from 'react';

const useFilters = <T extends object>(initialData: T[], filterKey: keyof T) => {
  const [data, setData] = useState<T[]>(initialData);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (inputValue.trim() === '') {
      setData(initialData);
    } else {
      const filteredData = initialData.filter(entity =>
        String(entity[filterKey]).toLowerCase().includes(inputValue.toLowerCase())
      );
      setData(filteredData);
    }
  }, [inputValue, initialData, filterKey]);

  return {
    entities: data,
    inputValue,
    setInputValue,
  };
};

export default useFilters;
