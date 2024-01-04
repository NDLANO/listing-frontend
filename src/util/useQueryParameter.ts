/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import qs from "query-string";
import { useState } from "react";
import { NavigateFunction, useLocation, useNavigate, Location } from "react-router-dom";

const setQueryParameter = <T extends object>(state: T, navigate: NavigateFunction) => {
  const params = qs.stringify(state, { arrayFormat: "bracket" });
  const search = `${params.length > 0 ? `?${params}` : ""}`;
  navigate({ search });
};

const getQueryParameter = <T extends object>(initialValue: T, location: Location) =>
  Object.assign(initialValue, qs.parse(location.search, { arrayFormat: "bracket" }));

const useQueryParameter = <T extends object>(initialValue: T): [T, (newValue: T) => void] => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState<T>(getQueryParameter(initialValue, location) || initialValue);
  const onSetValue = (newValue: T) => {
    setValue(newValue);
    setQueryParameter(newValue, navigate);
  };
  return [value, onSetValue];
};

export default useQueryParameter;
