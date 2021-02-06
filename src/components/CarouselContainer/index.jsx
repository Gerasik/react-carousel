import React, { useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  order: 1;
  display: flex;
  width: 80%;
  transition: ${({ transition }) =>
    transition ? "transform 0.3s ease-out" : "none"};
  transform: translateX(
    ${(props) => {
      return props.containerWidth;
    }}px
  );
  position: relative;
`;

export default ({ transition, children, currentItem, multiple }) => {
  const refContainer = useRef(null);
  return (
    <CarouselContainer
      ref={refContainer}
      containerWidth={
        refContainer.current
          ? multiple
            ? (-refContainer.current.offsetWidth * (currentItem - 1) * 30) / 100
            : -refContainer.current.offsetWidth * currentItem
          : 0
      }
      transition={transition}
    >
      {children}
    </CarouselContainer>
  );
};
