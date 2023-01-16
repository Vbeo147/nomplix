import styled from "styled-components";
import { motion } from "framer-motion";

export const S = {
  Wrapper: styled.div`
    padding-top: 160px;
  `,
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 20px;
    position: relative;
    margin-bottom: 100px;
  `,
  Main: styled.div`
    position: absolute;
    top: -40px;
    left: 40px;
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
  `,
  Item: styled(motion.div)`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 2px solid ${(props) => props.theme.black.lighter};
    border-radius: 10px;
    cursor: pointer;
  `,
  Image: styled.div<{ bgImage: string }>`
    width: 100%;
    height: 70%;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center center;
    margin-bottom: 20px;
  `,
  Title: styled.div`
    font-size: 16px;
    text-align: center;
  `,
};
