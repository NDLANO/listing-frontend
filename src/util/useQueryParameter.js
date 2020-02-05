import { useState, useCallback } from 'react';
import qs from 'query-string';

const setQueryParameter = (state) => {
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${qs.stringify(state, {arrayFormat: 'bracket'})}`;
  window.history.pushState({ path: url }, '', url);
}

const getQueryParameter = (initialValue) =>
  Object.assign(initialValue, qs.parse(window.location.search, {arrayFormat: 'bracket'}));

const useQueryParameter = (initialValue) => {
  const [value, setValue] = useState(getQueryParameter(initialValue) || initialValue);
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryParameter(newValue);
    }
  );
  return [value, onSetValue];
}

export default useQueryParameter;


