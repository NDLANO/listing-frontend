/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getValidLocale, isValidLocale } from "../i18n";

test("i18n getLocaleObject()", () => {
  expect(getValidLocale("en")).toBe("en");
  expect(getValidLocale("nb")).toBe("nb");
  // Defaults to nb if locale not found
  expect(getValidLocale("ru")).toBe("nb");
});

test("i18n isValidLocale()", () => {
  expect(isValidLocale("nb")).toBe(true);
  expect(isValidLocale("nn")).toBe(true);
  expect(isValidLocale("en")).toBe(true);
  expect(isValidLocale("aa")).toBe(false);
  expect(isValidLocale("ub")).toBe(false);
});
