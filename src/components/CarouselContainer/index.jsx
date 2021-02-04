import React from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  order: 1;
  display: flex;
  overflow: hidden;
  width: 80%;
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

export default ({ containerWidth, transition, children, eventFunction }) => {
  return (
    <CarouselContainer
      containerWidth={containerWidth}
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
