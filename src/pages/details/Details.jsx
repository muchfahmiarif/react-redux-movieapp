import "./Details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  return <div>Details</div>;
};

export default Details;
