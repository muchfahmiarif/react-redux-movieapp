import "./Details.scss";
import useFetch from "../../hooks/useFetch";

const Details = () => {
  const { data, loading } = useFetch(`/movie/${id}`);

  return <div>Details</div>;
};

export default Details;
