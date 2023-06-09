import "./Details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";

const Details = () => {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={data?.crew} />
    </div>
  );
};

export default Details;
