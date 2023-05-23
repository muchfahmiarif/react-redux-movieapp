import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endPoint}`); // docs : https://developer.themoviedb.org/reference/trending-all

  const onTabChange = (tab) => {
    setEndPoint(tab.toLowerCase());
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs onTabChange={onTabChange} data={["Day", "Week"]} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
