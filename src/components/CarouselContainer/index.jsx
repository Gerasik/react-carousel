import React, { useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  order: 1;
  display: flex;
  // overflow: hidden;
  width: 80%;
  transition: ${({ transition }) =>
    transition ? "transform 0.3s ease-out" : "none"};
  transform: translateX(
    ${(props) => {
      console.log("props", props);
      return props.containerWidth;
    }}px
  );
`;
// const CarouselContainer = styled.div`
//   transition: transform 0.5s ease;
//   white-space: nowrap;
//   clear: both;
//   overflow: hidden;
//   width: max-content;
//   margin: 0;
//   position: relative;
//   transition: ${({ transition }) =>
//     transition ? "transform 0.3s ease-out" : "none"};
//   transform: translateX(${({ containerWidth }) => containerWidth}px);
// `;

export default ({
  containerWidth,
  transition,
  children,
  eventFunction,
  currentItem,
}) => {
  console.log(currentItem);
  const refContainer = useRef(null);
  return (
    <CarouselContainer
      ref={refContainer}
      containerWidth={
        refContainer.current
          ? -refContainer.current.offsetWidth * currentItem
          : 0
      }
      transition={transition}
      onMouseUp={eventFunction}
      onMouseDown={eventFunction}
      onMouseLeave={eventFunction}
      onMouseOver={eventFunction}
      onDragLeave={eventFunction}
    >
      {children}
    </CarouselContainer>
  );
};
