import { IGetMoviesResult, IMovies } from "../api";
import { AnimatePresence, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useMultipleMovieQuery } from "../hook/useMultipleQuery";
import { H } from "../components/HomeStyled";
import { BoxVariants, offset, infoVariants, rowVarients } from "../utils";

function Home() {
  const [index, setIndex] = useState<any>({ 0: 0, 1: 0, 2: 0, 3: 0 });
  const [leaving, setLeaving] = useState(false);
  const [SliderOptions, SetSliderOptions] = useState<{
    windowWidth: number;
    Back: boolean;
  }>({
    windowWidth: 0,
    Back: false,
  });
  const [currentData, setCurrentData] = useState<any>({});
  const [random, setRandom] = useState(0);
  const [
    { isLoading: loadingNow, data: nowData },
    { isLoading: loadingPopular, data: popularData },
    { isLoading: loadingTopRated, data: topRatedData },
    { isLoading: loadingUpComing, data: upComingData },
  ] = useMultipleMovieQuery();
  const Loading =
    loadingNow && loadingPopular && loadingTopRated && loadingUpComing;
  const dataArr = [nowData, popularData, topRatedData, upComingData];
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");
  const bigMovieMatch = useMatch("/movie/:movieId/:key");
  const { scrollY } = useScroll();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number, key: number) => {
    navigate(`/movie/${movieId}/${key}`);
  };
  const onSliderClick = (data: IGetMoviesResult, mode: string, key: number) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (mode === "right") {
        setIndex((prev: any) => {
          return { ...prev, [key]: prev[key] === maxIndex ? 0 : prev[key] + 1 };
        });
        SetSliderOptions((prev) => {
          return { ...prev, Back: false };
        });
      } else if (mode === "left") {
        setIndex((prev: any) => {
          return { ...prev, [key]: prev[key] === 0 ? maxIndex : prev[key] - 1 };
        });
        SetSliderOptions((prev) => {
          return { ...prev, Back: true };
        });
      }
    }
  };
  useEffect(() => {
    SetSliderOptions((prev) => {
      return { ...prev, windowWidth: window.outerWidth };
    });
  }, [window.outerWidth]);
  useEffect(() => {
    if (!Loading) {
      setRandom(Math.floor(Math.random() * nowData?.data.results.length));
    }
  }, [Loading]);
  return (
    <H.Wrapper>
      {Loading ? (
        <H.Loader>Loading...</H.Loader>
      ) : (
        <>
          <H.Banner
            bgPhoto={makeImagePath(
              nowData?.data.results[random]?.backdrop_path || ""
            )}
          >
            <H.Title>{nowData?.data.results[random]?.title}</H.Title>
            <H.Overview>{nowData?.data.results[random]?.overview}</H.Overview>
          </H.Banner>
          {dataArr.map((data, key) => (
            <div key={key}>
              <H.Slider>
                <H.Option>
                  {key === 0 && "Now Playing"}
                  {key === 1 && "Popular"}
                  {key === 2 && "top Rated"}
                  {key === 3 && "upComing"}
                </H.Option>
                <H.SliderBtn
                  onClick={() => onSliderClick(data as any, "left", key)}
                  style={{ opacity: 0, left: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {"<"}
                </H.SliderBtn>
                <H.SliderBtn
                  onClick={() => onSliderClick(data as any, "right", key)}
                  style={{ opacity: 0, right: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {">"}
                </H.SliderBtn>
                <AnimatePresence
                  initial={false}
                  onExitComplete={toggleLeaving}
                  custom={SliderOptions}
                >
                  <H.Row
                    custom={SliderOptions}
                    variants={rowVarients}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index[key]}
                  >
                    {data?.data.results
                      .slice(1)
                      .slice(offset * index[key], offset * index[key] + offset)
                      .map((movie: any) => (
                        <H.Box
                          layoutId={String(movie.id) + String(key)}
                          variants={BoxVariants}
                          transition={{ type: "tween" }}
                          key={movie.id}
                          bgImg={makeImagePath(movie.backdrop_path, "w500")}
                          initial="normal"
                          whileHover="hover"
                          onClick={() => {
                            onBoxClicked(movie.id, key);
                            setCurrentData(movie);
                          }}
                        >
                          <H.Info variants={infoVariants}>
                            <h4>{movie.title}</h4>
                          </H.Info>
                        </H.Box>
                      ))}
                  </H.Row>
                </AnimatePresence>
              </H.Slider>
            </div>
          ))}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <H.Overlay exit={{ opacity: 0 }} onClick={onOverlayClick} />
                <H.BigMovie
                  layoutId={
                    String(bigMovieMatch?.params.movieId) +
                    String(bigMovieMatch.params.key)
                  }
                  style={{
                    top: scrollY.get() + 100,
                  }}
                >
                  {!Boolean(Object.keys(currentData).length === 0) && (
                    <>
                      <H.BigCover
                        style={{
                          backgroundImage: `url(${makeImagePath(
                            currentData.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <H.BigTitle>{currentData.title}</H.BigTitle>
                      <H.BigOverview>
                        {currentData?.overview
                          ? currentData.overview
                          : "정보를 받아오지 못했습니다"}
                      </H.BigOverview>
                      <H.Span>⭐ {currentData.vote_count}</H.Span>
                      <H.Span>방영일 : {currentData.release_date}</H.Span>
                      <H.Link
                        href={`https://www.google.com/search?q=${currentData.title}`}
                        target="_blank"
                      >
                        영화 구글에서 검색하기
                      </H.Link>
                    </>
                  )}
                </H.BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </H.Wrapper>
  );
}

export default Home;
