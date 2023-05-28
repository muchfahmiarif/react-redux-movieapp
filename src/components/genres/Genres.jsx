/* eslint-disable react/prop-types */
import "./Genres.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((item) => {
        if (!genres[item]?.name) return null; // if genres[item] is null, return null
        return (
          <span key={item} className="genre">
            {genres[item]?.name}
          </span>
        );
      })}
    </div>
  );
};

export default Genres;
