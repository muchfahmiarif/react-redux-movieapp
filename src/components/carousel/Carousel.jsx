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

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigate("left")} />
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigate("right")} />
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
