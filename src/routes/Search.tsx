import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { IGetMovieResult, IGetMoviesResult, SearchTv, getMovie } from "../api";
import { S } from "../components/SearchStyled";
import { H } from "../components/HomeStyled";
import { makeImagePath } from "../utils";
import { AnimatePresence, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { keywordAtom } from "../atom";

function Search() {
  const [currentData, setCurrentData] = useState<IGetMovieResult | any>({});
  const [key, setKey] = useRecoilState(keywordAtom);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch("/search/movie/:id");
  const bigTvMatch = useMatch("/search/tv/:id");
  const { data: movieData, isLoading: movieLoading } =
    useQuery<IGetMoviesResult>(["movie", "search"], () =>
      getMovie(keyword as string)
    );
  const { data: tvData, isLoading: tvLoading } = useQuery(
    ["tv", "search"],
    () => SearchTv(keyword as string)
  );
  const onOverlayClick = () => navigate(`/search?keyword=${key}`);
  const onMovieClick = (data: IGetMovieResult, id: number) => {
    setCurrentData(data);
    navigate(`/search/movie/${id}`);
  };
  const onTvClick = (data: any, id: number) => {
    setCurrentData(data);
    navigate(`/search/tv/${id}`);
  };
  const Loading = movieLoading && tvLoading;
  useEffect(() => {
    setKey(keyword as string);
  }, []);
  return (
    <S.Wrapper>
      {Loading ? (
        <H.Loader>Loading...</H.Loader>
      ) : (
        <>
          <S.Container>
            <S.Main>Movie</S.Main>
            {movieData?.data.results.map((data, index) => (
              <S.Item
                key={index}
                onClick={() => onMovieClick(data as any, data.id)}
                layoutId={String(data.id)}
              >
                <S.Image
                  bgImage={makeImagePath(data.backdrop_path, "w500")}
                ></S.Image>
                <S.Title>{data.title}</S.Title>
              </S.Item>
            ))}
          </S.Container>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <H.Overlay exit={{ opacity: 0 }} onClick={onOverlayClick} />
                <H.BigMovie
                  layoutId={String(bigMovieMatch?.params.id)}
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
          <S.Container>
            <S.Main>Tv</S.Main>
            {tvData?.data.results.map((data: any, index: number) => (
              <S.Item
                key={index}
                onClick={() => onTvClick(data as any, data.id)}
                layoutId={String(data.id)}
              >
                <S.Image
                  bgImage={makeImagePath(data.backdrop_path, "w500")}
                ></S.Image>
                <S.Title>{data.name}</S.Title>
              </S.Item>
            ))}
          </S.Container>
          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <H.Overlay exit={{ opacity: 0 }} onClick={onOverlayClick} />
                <H.BigMovie
                  layoutId={String(bigTvMatch?.params.id)}
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
    </S.Wrapper>
  );
}

export default Search;
