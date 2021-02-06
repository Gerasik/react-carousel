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
  ${({ disablePrev }) =>
    disablePrev
      ? "cursor: auto;&:hover{background: white}&::after {color: #eee;}"
      : ""};
`;

const CarouselNextSlide = styled(CarouselNavigationButton)`
  order: 2;
  &:hover {
    background: linear-gradient(to left, #b7b7b7, white);
  }
  &::after {
    transform: translateY(50%) rotate(-135deg);
    color: ${({ disableNext }) => (disableNext ? "#eee" : "black")};
  }
  ${({ disablePrev }) =>
    disablePrev
      ? "cursor: auto;&:hover{background: white}&::after {color: #eee;}"
      : ""};
`;

const Dots = styled.ul`
  list-style: none;
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80%;
  margin: 0 10%;
  padding: 0;
  display: flex;
  justify-content: center;
`;
const Dot = styled.li`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 10px;
  background: ${({ active }) => (active ? "black" : "#ddd")};
  transition: all 0.5s;
  &:hover {
    background: black;
  }
`;

export default ({
  handleClickPrev,
  handleClickNext,
  height,
  disablePrev,
  disableNext,
  setCurrentItem,
  arr,
  currentItem,
}) => {
  return (
    <>
      <CarouselPrevSlide
        onClick={handleClickPrev}
        height={height}
        disablePrev={disablePrev}
      />
      <CarouselNextSlide
        onClick={handleClickNext}
        height={height}
        disableNext={disableNext}
      />
      <Dots>
        {arr.map((item) => (
          <Dot
            key={item.id}
            onClick={() => setCurrentItem(item.id)}
            active={item.id == currentItem}
          />
        ))}
      </Dots>
    </>
  );
};
