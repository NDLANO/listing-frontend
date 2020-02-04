import { useState, useCallback } from 'react';
import qs from 'query-string';

const setQueryString = (state) => {
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${qs.stringify(state, {arrayFormat: 'bracket'})}`;
  window.history.pushState({ path: url }, '', url);
}

const getQueryString = (initialValue) =>
  Object.assign(initialValue, qs.parse(window.location.search, {arrayFormat: 'bracket'}));

const useQueryString = (initialValue) => {
  const [value, setValue] = useState(getQueryString(initialValue) || initialValue);
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryString(newValue);
    }
  );
  return [value, onSetValue];
}

export default useQueryString;


