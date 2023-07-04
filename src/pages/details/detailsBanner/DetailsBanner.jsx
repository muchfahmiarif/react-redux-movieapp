/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../playIcon/PlayIcon";

const DetailsBanner = ({ video, crew }) => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((genre) => genre.id);

  const director = crew?.find((member) => member.job === "Director");
  const writer = crew?.filter((member) => member.job === "Screenplay" || member.job === "Writer" || member.job === "Story");

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div>
                <div className="backdrop-img">
                  <Img src={`${url.backdrop}${data?.backdrop_path}`} alt={data.title} />
                </div>
                <div className="opacity-layer"></div>
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data.poster_path ? (
                        <Img src={`${url.poster}${data.poster_path}`} alt={data.title} />
                      ) : (
                        <img src={PosterFallback} alt={data.title} />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">{`${data.title || data.name} (${dayjs(data.release_date).format("YYYY")})`}</div>
                      <div className="subtitle">{data.tagline && <span className="tagline">{data.tagline}</span>}</div>
                      <Genres data={_genres} />
                      <div className="row">
                        <CircleRating rating={data?.vote_average} />
                        <div className="playbtn" onClick={() => {}}>
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>
                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{`${data.overview}`}</div>
                      </div>
                      <div className="info">
                        {data.status && (
                          <div className="infoItem">
                            <div className="text bold">Status: {` `}</div>
                            <div className="text">{`${data.status}`}</div>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="infoItem">
                            <div className="text bold">Release Date</div>
                            <div className="text">{dayjs(data.release_date).format("DD MMM YYYY")}</div>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="infoItem">
                            <div className="text bold">Runtime</div>
                            <div className="text">{toHoursAndMinutes(data.runtime)}</div>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Director:{` `}</span>
                          <span className="text">
                            {director.map((data, index) => (
                              <span key={index}>{data.name}</span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </ContentWrapper>
              </div>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
