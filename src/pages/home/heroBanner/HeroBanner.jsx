import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home); // from tree state on redux devtools

  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    const background = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(background);
  }, [data]);

  const searchQueryHandler = (e) => {
    // 13 adalah kode untuk tombol enter
    if (e.keyCode === 13 && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">Millions of movies, TV shows and people to discover. Elxplore now.</span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movice or tv show..."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default HeroBanner;
