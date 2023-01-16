import styled from "styled-components";
import { motion } from "framer-motion";

export const H = {
  Wrapper: styled.div``,

  Loader: styled.div`
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Banner: styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.1)),
      url(${(props) => props.bgPhoto});
    background-size: cover;
    user-select: none;
  `,

  Title: styled.h2`
    font-size: 46px;
    margin-bottom: 25px;
  `,

  Overview: styled.p`
    font-size: 16px;
    width: 40%;
    letter-spacing: 1px;
    word-spacing: 1px;
    line-height: 120%;
  `,

  Slider: styled.div`
    position: relative;
    top: -100px;
    background-color: ${(props) => props.theme.black.lighter};
    width: 100%;
    height: 170px;
    padding: 10px;
    display: flex;
    margin-bottom: 80px;
  `,

  SliderBtn: styled(motion.button)`
    position: absolute;
    top: 0;
    height: 100%;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${(props) => props.theme.white.lighter};
    padding: 0 9px;
    font-size: 20px;
    font-weight: bold;
    z-index: 1;
    cursor: pointer;
  `,

  Option: styled.div`
    position: absolute;
    top: -20px;
    left: -10px;
    z-index: 0;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.white.lighter};
    z-index: 2;
    background-color: ${(props) => props.theme.black.lighter};
    border-radius: 10px;
    user-select: none;
  `,

  Row: styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-bottom: 5px;
    position: absolute;
    width: 98.3%;
    height: 100%;
    padding: 0 20px;
  `,

  Box: styled(motion.div)<{ bgImg: string }>`
    background-color: white;
    height: 90%;
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
  `,

  Info: styled(motion.div)`
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
      text-align: center;
      font-size: 16px;
      color: white;
    }
  `,

  Overlay: styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  `,

  BigMovie: styled(motion.div)`
    position: absolute;
    width: 50vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.black.darker};
    z-index: 10;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
  `,

  BigCover: styled.img`
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center center;
  `,

  BigTitle: styled.h3`
    color: ${(props) => props.theme.white.lighter};
    text-align: center;
    margin-top: 20px;
    font-size: 26px;
    font-weight: bold;
  `,

  BigOverview: styled.p`
    margin-top: 20px;
    padding: 20px;
    font-size: 14px;
    line-height: 120%;
    color: ${(props) => props.theme.white.lighter};
    height: 15%;
    overflow-y: auto;
  `,
  Span: styled.span`
    font-size: 16px;
    padding: 10px;
  `,
  Link: styled.a`
    font-size: 24px;
    margin-top: 20px;
    &:hover {
      border-bottom: 1px solid white;
    }
  `,
};
