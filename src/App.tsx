import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId/:key" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:tvId/:key" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/movie/:id" element={<Search />} />
        <Route path="/search/tv/:id" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
