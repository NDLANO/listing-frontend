/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useContext } from 'react';
import Footer from '../../components/Footer';
import RedirectContext from '../../components/RedirectContext';

export default function NotFound() {
  const redirectContext = useContext(RedirectContext);
  if (redirectContext) {
    redirectContext.status = 404;
  }
  return (
    <div>
      <h2>404 - The page cannot be found</h2>
      <Footer />
    </div>
  );
}
