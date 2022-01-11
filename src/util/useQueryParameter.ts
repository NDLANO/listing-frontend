import { History, Location } from 'history';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

const setQueryParameter = <T extends object>(state: T, history: History) => {
  const params = qs.stringify(state, { arrayFormat: 'bracket' });
  const search = `${params.length > 0 ? `?${params}` : ''}`;
  history.push({ search });
};

const getQueryParameter = <T extends object>(
  initialValue: T,
  location: Location,
) =>
  Object.assign(
    initialValue,
    qs.parse(location.search, { arrayFormat: 'bracket' }),
  );

const useQueryParameter = <T extends object>(
  initialValue: T,
): [T, (newValue: T) => void] => {
  const history = useHistory();

  const [value, setValue] = useState<T>(
    getQueryParameter(initialValue, history.location) || initialValue,
  );
  const onSetValue = (newValue: T) => {
    setValue(newValue);
    setQueryParameter(newValue, history);
  };
  return [value, onSetValue];
};

export default useQueryParameter;
