import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./Carousel.scss";

const Carousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  // console.log(carouselContainer.current);
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (direction) => {};

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")} />
        {loading ? (
          <span>Loading...</span>
        ) : (
          <div className="carouselItems">
            {data?.map((item) => {
              const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback; // if poster_path is null, use PosterFallback

              return (
                // id from api in network tab
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
