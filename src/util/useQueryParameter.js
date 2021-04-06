import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

const setQueryParameter = (state, history) => {
  const params = qs.stringify(state, { arrayFormat: 'bracket' });
  const search = `${params.length > 0 ? `?${params}` : ''}`;
  history.push({ search });
};

const getQueryParameter = (initialValue, location) =>
  Object.assign(
    initialValue,
    qs.parse(location.search, { arrayFormat: 'bracket' }),
  );

const useQueryParameter = initialValue => {
  const history = useHistory();

  const [value, setValue] = useState(
    getQueryParameter(initialValue, history.location) || initialValue,
  );
  const onSetValue = newValue => {
    setValue(newValue);
    setQueryParameter(newValue, history);
  };
  return [value, onSetValue];
};

export default useQueryParameter;
