import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 200vh;
`;

const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 46px;
  margin-bottom: 25px;
`;

const Overview = styled.p`
  font-size: 16px;
  width: 40%;
  letter-spacing: 1px;
  word-spacing: 1px;
  line-height: 120%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
  padding: 0 20px;
`;

const Box = styled(motion.div)<{ bgImg: string }>`
  background-color: white;
  height: 150px;
  color: black;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
    color: white;
  }
`;

const rowVarients = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - 10 },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    y: -70,
    scale: 1.6,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

const offset = 6;

function Home() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const navigate = useNavigate();
  const MoviesMatch = useMatch("/movies/:movieId");
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.data.results[0].backdrop_path || "")}
          >
            <Title>{data?.data.results[0].title}</Title>
            <Overview>{data?.data.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVarients}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.data.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      variants={BoxVariants}
                      transition={{ type: "tween" }}
                      key={movie.id}
                      bgImg={makeImagePath(movie.backdrop_path, "w500")}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {MoviesMatch ? (
              <motion.div
                layoutId={MoviesMatch?.params.movieId}
                style={{
                  position: "absolute",
                  width: "40vw",
                  height: "80vh",
                  backgroundColor: "red",
                  top: 50,
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}
              ></motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
