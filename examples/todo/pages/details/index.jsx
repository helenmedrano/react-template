import React from "react";
import styled from "styled-components";

import t from "i18n";
import colors from "todo/styles/colors";
import NavigationLink from "todo/components/navigationLink";
import GlobeIcon from "todo/assets/icons/globe.svg";

const DetailsContainer = styled.div`
  p {
    margin-top: 10px;
  }
  hr {
    margin: 20px 0;
  }
`;

const Header = styled.h1`
  font-weight: 800;
  font-size: 32px;
  color: ${colors.primary};
`;

const Globe = styled(GlobeIcon)`
  fill: ${colors.secondary};
  width: 200px;
  height: 200px;
  display: block;
`;

const DetailsComponent = () => (
  <DetailsContainer>
    <Header> {t("home.title")} </Header>
    <p> {t("home.seeReadme")} </p>
    <hr />
    <div>
      <Globe />
      {t("home.internationalizedString")}
    </div>
    <p>
      <NavigationLink to="/demo">{t("home.demoAppLink")}</NavigationLink>
    </p>
  </DetailsContainer>
);

export default DetailsComponent;
