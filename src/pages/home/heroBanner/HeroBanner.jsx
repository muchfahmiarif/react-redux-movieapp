import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  const searchQueryHandler = (e) => {
    // 13 adalah kode untuk tombol enter
    if (e.keyCode === 13 && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div>
      <div className="heroBanner">
        <div className="wrapper">
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
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
