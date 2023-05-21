import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

const Trending = () => {
  const onTabChange = (tab, index) => {};

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs onTabChange={onTabChange} data={["Day", "Week"]} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
