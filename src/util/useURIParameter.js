import { useState, useCallback } from 'react';

const setURIParameter = (param) => {
  const url = `${window.location.protocol}//${window.location.host}/${param}`;
  window.history.pushState({ path: url }, '', url);
}

const useURIParameter = () => {
  const [value, setValue] = useState(window.location.pathname.substring(1));
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setURIParameter(newValue);
    }
  );
  return [value, onSetValue];
}

export default useURIParameter;