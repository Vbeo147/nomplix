import { useMultipleTvQuery } from "../hook/useMultipleQuery";
import { H } from "../components/HomeStyled";
import {
  makeImagePath,
  offset,
  BoxVariants,
  infoVariants,
  rowVarients,
} from "../utils";
import { useState, useEffect } from "react";
import { useScroll, AnimatePresence } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import { IGetTvResult } from "../api";

function Tv() {
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
    { isLoading: loadingToday, data: todayData },
    { isLoading: loadingAir, data: airData },
    { isLoading: loadingPopular, data: popularData },
    { isLoading: loadingTopRated, data: topRatedData },
  ] = useMultipleTvQuery();
  const Loading =
    loadingAir && loadingToday && loadingPopular && loadingTopRated;
  const dataArr = [todayData, airData, popularData, topRatedData];
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/tv");
  const bigMovieMatch = useMatch("/tv/:tvId/:key");
  const { scrollY } = useScroll();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number, key: number) => {
    navigate(`/tv/${tvId}/${key}`);
  };
  const onSliderClick = (data: IGetTvResult, mode: string, key: number) => {
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
      setRandom(Math.floor(Math.random() * todayData?.data.results.length));
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
              todayData?.data.results[random]?.backdrop_path || ""
            )}
          >
            <H.Title>{todayData?.data.results[random]?.name}</H.Title>
            <H.Overview>{todayData?.data.results[random]?.overview}</H.Overview>
          </H.Banner>
          {dataArr.map((data, key) => (
            <div key={key}>
              <H.Slider>
                <H.Option>
                  {key === 0 && "Today"}
                  {key === 1 && "on Air"}
                  {key === 2 && "Popular"}
                  {key === 3 && "top Rated"}
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
                      .map((tv: any) => (
                        <H.Box
                          layoutId={String(tv.id) + String(key)}
                          variants={BoxVariants}
                          transition={{ type: "tween" }}
                          key={tv.id}
                          bgImg={makeImagePath(tv.backdrop_path, "w500")}
                          initial="normal"
                          whileHover="hover"
                          onClick={() => {
                            onBoxClicked(tv.id, key);
                            setCurrentData(tv);
                          }}
                        >
                          <H.Info variants={infoVariants}>
                            <h4>{tv.name}</h4>
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
                    String(bigMovieMatch?.params.tvId) +
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
                      <H.BigTitle>{currentData.name}</H.BigTitle>
                      <H.BigOverview>
                        {currentData?.overview
                          ? currentData.overview
                          : "정보를 받아오지 못했습니다"}
                      </H.BigOverview>
                      <H.Span>⭐ {currentData.vote_count}</H.Span>
                      <H.Span>방영일 : {currentData.release_date}</H.Span>
                      <H.Link
                        href={`https://www.google.com/search?q=${currentData.name}`}
                        target="_blank"
                      >
                        Tv 구글에서 검색하기
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

export default Tv;
