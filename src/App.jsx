import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = async () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };

  return <>App</>;
}

export default App;
