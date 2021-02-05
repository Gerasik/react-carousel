import React from "react";
import styled from "styled-components";

const CarouselNavigationButton = styled.button`
  width: 10%;
  cursor: pointer;
  background: white;
  border: none;
  z-index: 2;
  position: relative;
  &::after {
    content: "∟";
    position: absolute;
    width: 100%;
    height: 10px;
    font-size: 3em;
    font-weight: bold;
    left: 0;
    top: 50%;
    @media (max-width: 768px) {
      font-size: 1.5em;
    }
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

const CarouselPrevSlide = styled(CarouselNavigationButton)`
  order: 0;
  &:hover {
    background: linear-gradient(to right, #b7b7b7, white);
  }
  &::after {
    transform: translateY(-50%) rotate(45deg);
  }
`;

const CarouselNextSlide = styled(CarouselNavigationButton)`
  order: 2;
  &:hover {
    background: linear-gradient(to left, #b7b7b7, white);
  }
  &::after {
    transform: translateY(50%) rotate(-135deg);
  }
`;

export default ({ handleClickPrev, handleClickNext, height }) => {
  return (
    <>
      <CarouselPrevSlide onClick={handleClickPrev} height={height} />
      <CarouselNextSlide onClick={handleClickNext} height={height} />
    </>
  );
};
