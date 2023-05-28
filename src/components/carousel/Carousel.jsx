import { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./Carousel.scss";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  // console.log(carouselContainer.current);
  const { url } = useSelector((state) => state.home); // get url from home reducer
  const navigate = useNavigate();

  const navigation = (direction) => {}; // direction = left or right

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")} />
        {loading ? (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        ) : (
          <div className="carouselItems">
            {data?.map((items) => {
              const posterUrl = items.poster_path ? `${url.poster}${items.poster_path}` : PosterFallback; // if poster_path is null, use PosterFallback

              return (
                // id from api in network tab
                <div key={items.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={items.vote_average.toFixed(1)} />
                    <Genres data={items.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{items.title || items.name}</span>
                    <span className="date">{dayjs(items.release_date).format("D MMM YYYY")}</span>
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
