import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

// Docs : https://gist.github.com/ShariqAnsari88/09dbadfd81c41b399a30f6eb9f1f9548

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    // contoh tidak menggunanakan async await
    await fetchDataFromApi("/configuration").then((res) => {
      // docs : https://developer.themoviedb.org/docs/image-basics
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + res.images.backdrop_sizes[3], //
        poster: res.images.secure_base_url + res.images.poster_sizes[3],
        profile: res.images.secure_base_url + res.images.profile_sizes[3],
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoint = ["tv", "movie"];
    let allGenres = {};
    endPoint.forEach((mediaType) => {
      promises.push(fetchDataFromApi(`/genre/${mediaType}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data); // for testing show genres
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    // console.log(allGenres); // for testing show all genres

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
