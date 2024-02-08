/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Footer, FooterText, EditorName } from "@ndla/ui";

const StyledFooterWrapper = styled.div`
  margin-top: 52px;
`;

const FooterWrapper = () => {
  const { t, i18n } = useTranslation();

  const privacyLinks = [
    { label: t("footer.privacyLink"), url: "https://ndla.no/article/personvernerklaering" },
    { label: t("footer.cookiesLink"), url: "https://ndla.no/article/erklaering-for-informasjonskapsler" },
    {
      label: t("footer.availabilityLink"),
      url: "https://uustatus.no/nn/erklaringer/publisert/6a767f5d-1355-4067-8492-0af396c20b4d",
    },
  ];

  return (
    <StyledFooterWrapper>
      <Footer lang={i18n.language} privacyLinks={privacyLinks}>
        <FooterText>
          <EditorName title={t("footer.editorInChief")} name="Sigurd Trageton" />
          {t("footer.info")}
        </FooterText>
      </Footer>
    </StyledFooterWrapper>
  );
};

export default FooterWrapper;
