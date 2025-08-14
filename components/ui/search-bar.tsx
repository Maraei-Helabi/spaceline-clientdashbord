import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from './input';

type SearchBarProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const { value, className, placeholder, disabled } = props;
  const [inputVal, setInputVal] = useState(value ?? '');
  const t = useTranslations('common');

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== inputVal) props.onChange?.(inputVal);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputVal]);

  useEffect(() => {
    setInputVal(value || '');
  }, [value]);

  return (
    <Input
      className={className}
      placeholder={placeholder ?? `${t('search')}...`}
      value={inputVal}
      disabled={disabled}
      onChange={onSearchChange}
    />
  );
};

export { SearchBar };
